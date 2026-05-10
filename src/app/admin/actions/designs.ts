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

// Get All Designs
export async function getAllDesigns(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  aiModel?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
} = {}) {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  const { page = 1, pageSize = 20, search = "", status, aiModel, sortBy = "createdAt", sortOrder = "desc" } = params;

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const query: any = {};
    if (search) query.$or = [{ prompt: { $regex: search, $options: "i" } }, { userEmail: { $regex: search, $options: "i" } }];
    if (status) query.status = status;
    if (aiModel) query.aiModel = aiModel;

    const sort: any = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    const [designs, total] = await Promise.all([
      db.collection("designs")
        .find(query)
        .sort(sort)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray(),
      db.collection("designs").countDocuments(query),
    ]);

    const enrichedDesigns = designs.map(d => ({
      id: d._id.toString(),
      userId: d.userEmail,
      userName: d.userEmail?.split("@")[0] || "Unknown",
      userEmail: d.userEmail,
      originalImage: d.originalImage,
      generatedImage: d.generatedImage,
      prompt: d.prompt || "No prompt",
      aiModel: d.aiModel || "flux-dev",
      status: d.status || "completed",
      isFlagged: d.isFlagged || false,
      isFeatured: d.isFeatured || false,
      likes: d.likes || 0,
      downloads: d.downloads || 0,
      tokenCost: d.tokenCost || 0,
      createdAt: d.createdAt,
    }));

    return { designs: enrichedDesigns, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  } catch (err) {
    console.error("Get designs error:", err);
    return { error: "Failed to fetch designs" };
  }
}

// Update Design
export async function updateDesign(designId: string, data: { isFlagged?: boolean; isFeatured?: boolean; status?: string }) {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    await db.collection("designs").updateOne(
      { _id: new ObjectId(designId) },
      { $set: { ...data, updatedAt: new Date() } }
    );

    return { success: true };
  } catch (err) {
    console.error("Update design error:", err);
    return { error: "Failed to update design" };
  }
}

// Delete Design
export async function deleteDesign(designId: string) {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    await db.collection("designs").deleteOne({ _id: new ObjectId(designId) });

    return { success: true };
  } catch (err) {
    console.error("Delete design error:", err);
    return { error: "Failed to delete design" };
  }
}
