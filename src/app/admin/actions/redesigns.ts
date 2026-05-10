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

// Get All Redesigns
export async function getAllRedesigns(params: {
  status?: string;
} = {}) {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  const { status = "all" } = params;

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const query: any = {};
    if (status !== "all") query.status = status;

    const redesigns = await db.collection("redesigns")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return redesigns.map(r => ({
      id: r._id.toString(),
      userId: r.userEmail,
      userName: r.userEmail?.split("@")[0] || "Unknown",
      userEmail: r.userEmail,
      beforeImage: r.beforeImage,
      afterImage: r.afterImage,
      category: r.category || "general",
      roomType: r.roomType,
      style: r.style,
      suggestions: r.suggestions || [],
      status: r.status || "pending",
      isNSFW: r.isNSFW || false,
      createdAt: r.createdAt,
    }));
  } catch (err) {
    console.error("Get redesigns error:", err);
    return { error: "Failed to fetch redesigns" };
  }
}

// Update Redesign Status
export async function updateRedesignStatus(redesignId: string, status: "approved" | "rejected") {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    await db.collection("redesigns").updateOne(
      { _id: new ObjectId(redesignId) },
      { $set: { status, updatedAt: new Date() } }
    );

    return { success: true };
  } catch (err) {
    console.error("Update redesign error:", err);
    return { error: "Failed to update redesign" };
  }
}
