"use server";

import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];

async function checkAdmin() {
  const session = await auth();
  if (!session?.user?.email) return { error: "Unauthorized" };
  if (!ADMIN_EMAILS.includes(session.user.email)) return { error: "Not an admin" };
  return { session, isAdmin: true };
}

// Get All Feedback
export async function getAllFeedback(params: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  const { page = 1, pageSize = 20, search = "" } = params;

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const query: any = {};
    if (search) {
      query.$or = [
        { suggestions: { $regex: search, $options: "i" } },
      ];
    }

    const [feedback, total] = await Promise.all([
      db.collection("feedback")
        .find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray(),
      db.collection("feedback").countDocuments(query),
    ]);

    return {
      feedback: feedback.map(f => ({
        id: f._id.toString(),
        easeOfUse: f.easeOfUse,
        satisfaction: f.satisfaction,
        visualization: f.visualization,
        wouldUse: f.wouldUse,
        featureImpressed: f.featureImpressed,
        suggestions: f.suggestions,
        createdAt: f.createdAt?.toISOString() || new Date().toISOString(),
        ip: f.ip,
        userAgent: f.userAgent,
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (err) {
    console.error("Get feedback error:", err);
    return { error: "Failed to fetch feedback" };
  }
}

// Get Feedback Stats
export async function getFeedbackStats() {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const [total, recent] = await Promise.all([
      db.collection("feedback").countDocuments(),
      db.collection("feedback").countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }),
    ]);

    // Get satisfaction distribution
    const satisfactionStats = await db.collection("feedback").aggregate([
      { $group: { _id: "$satisfaction", count: { $sum: 1 } } }
    ]).toArray();

    // Get would use distribution
    const wouldUseStats = await db.collection("feedback").aggregate([
      { $group: { _id: "$wouldUse", count: { $sum: 1 } } }
    ]).toArray();

    // Get feature impressed distribution
    const featureStats = await db.collection("feedback").aggregate([
      { $group: { _id: "$featureImpressed", count: { $sum: 1 } } }
    ]).toArray();

    return {
      total,
      recentWeek: recent,
      satisfactionStats: satisfactionStats.map(s => ({ label: s._id, count: s.count })),
      wouldUseStats: wouldUseStats.map(s => ({ label: s._id, count: s.count })),
      featureStats: featureStats.map(s => ({ label: s._id, count: s.count })),
    };
  } catch (err) {
    console.error("Feedback stats error:", err);
    return { error: "Failed to fetch feedback stats" };
  }
}

// Delete Feedback
export async function deleteFeedback(feedbackId: string) {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    await db.collection("feedback").deleteOne({ _id: { $oid: feedbackId } });
    return { success: true };
  } catch (err) {
    console.error("Delete feedback error:", err);
    return { error: "Failed to delete feedback" };
  }
}
