"use server";

import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];

async function checkAdmin() {
  const session = await auth();
  if (!session?.user?.email) return { error: "Unauthorized" };
  if (!ADMIN_EMAILS.includes(session.user.email)) return { error: "Not an admin" };
  return { session, isAdmin: true };
}

// Get All Users
export async function getAllUsers(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
} = {}) {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  const { page = 1, pageSize = 10, search = "", status, role, sortBy = "createdAt", sortOrder = "desc" } = params;

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const query: any = {};
    if (search) query.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }];
    if (status) query.status = status;
    if (role) query.role = role;

    const sort: any = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [users, total] = await Promise.all([
      db.collection("users")
        .find(query)
        .sort(sort)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray(),
      db.collection("users").countDocuments(query),
    ]);

    const enrichedUsers = await Promise.all(
      users.map(async (user) => {
        const [designCount, redesignCount] = await Promise.all([
          db.collection("designs").countDocuments({ userEmail: user.email }),
          db.collection("redesigns").countDocuments({ userEmail: user.email }),
        ]);
        return {
          id: user._id.toString(),
          name: user.name || "Unknown",
          email: user.email,
          avatar: user.photoURL || undefined,
          role: user.role || "user",
          status: user.status || "active",
          createdAt: user.createdAt || user._id.getTimestamp().toISOString(),
          lastActive: user.lastActive || user._id.getTimestamp().toISOString(),
          totalDesigns: designCount,
          totalRedesigns: redesignCount,
        };
      })
    );

    return { users: enrichedUsers, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  } catch (err) {
    console.error("Get users error:", err);
    return { error: "Failed to fetch users" };
  }
}

// Update User
export async function updateUser(userId: string, data: { role?: string; status?: string }) {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { ...data, updatedAt: new Date() } }
    );

    return { success: true };
  } catch (err) {
    console.error("Update user error:", err);
    return { error: "Failed to update user" };
  }
}

// Delete User
export async function deleteUser(userId: string) {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    await db.collection("users").deleteOne({ _id: new ObjectId(userId) });

    return { success: true };
  } catch (err) {
    console.error("Delete user error:", err);
    return { error: "Failed to delete user" };
  }
}

// Get Single User
export async function getUserById(userId: string) {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    if (!user) return { error: "User not found" };

    const [designs, redesigns] = await Promise.all([
      db.collection("designs").find({ userEmail: user.email }).toArray(),
      db.collection("redesigns").find({ userEmail: user.email }).toArray(),
    ]);

    return {
      id: user._id.toString(),
      name: user.name || "Unknown",
      email: user.email,
      avatar: user.photoURL || undefined,
      role: user.role || "user",
      status: user.status || "active",
      createdAt: user.createdAt || user._id.getTimestamp().toISOString(),
      lastActive: user.lastActive || user._id.getTimestamp().toISOString(),
      designs,
      redesigns,
    };
  } catch (err) {
    console.error("Get user error:", err);
    return { error: "Failed to fetch user" };
  }
}
