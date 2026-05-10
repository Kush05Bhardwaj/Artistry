"use server";

import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];

async function checkAdmin(): Promise<{ session: any; isAdmin: boolean } | { error: string }> {
  const session = await auth();
  if (!session?.user?.email) {
    return { error: "Unauthorized" };
  }
  if (!ADMIN_EMAILS.includes(session.user.email)) {
    return { error: "Not an admin" };
  }
  return { session, isAdmin: true };
}

// Dashboard Stats
export async function getDashboardStats() {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const [totalUsers, totalDesigns, totalRedesigns] = await Promise.all([
      db.collection("users").countDocuments(),
      db.collection("designs").countDocuments(),
      db.collection("redesigns").countDocuments(),
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [activeUsersToday, newSignupsToday, aiRequestsToday] = await Promise.all([
      db.collection("users").countDocuments({ lastActive: { $gte: today } }),
      db.collection("users").countDocuments({ createdAt: { $gte: today } }),
      db.collection("designs").countDocuments({ createdAt: { $gte: today.toISOString() } }),
    ]);

    const viewsData = await db.collection("analytics").aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]).toArray();

    return {
      totalUsers,
      totalDesigns,
      totalRedesigns,
      totalVisits: viewsData[0]?.totalViews || 0,
      activeUsersToday,
      newSignupsToday,
      aiRequestsToday,
      avgSessionDuration: "3m 42s",
      bounceRate: "34.2%",
    };
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return { error: "Failed to fetch stats" };
  }
}

// Recent Activity
export async function getRecentActivity(limit = 10) {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const recentDesigns = await db.collection("designs")
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return recentDesigns.map(d => ({
      id: d._id.toString(),
      type: "generation",
      userId: d.userEmail,
      userName: d.userEmail?.split("@")[0] || "Unknown",
      description: `Generated design for ${d.roomType || "room"}`,
      severity: "info",
      timestamp: d.createdAt,
    }));
  } catch (err) {
    console.error("Recent activity error:", err);
    return { error: "Failed to fetch activity" };
  }
}

// Notifications
export async function getAdminNotifications() {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const failedDesigns = await db.collection("designs")
      .countDocuments({ status: "failed" });

    const pendingModeration = await db.collection("redesigns")
      .countDocuments({ status: "pending" });

    const notifications = [];

    if (failedDesigns > 0) {
      notifications.push({
        id: "1",
        type: "error",
        title: "Failed Generations",
        message: `${failedDesigns} designs failed recently`,
        timestamp: new Date().toISOString(),
        isRead: false,
      });
    }

    if (pendingModeration > 0) {
      notifications.push({
        id: "2",
        type: "warning",
        title: "Pending Moderation",
        message: `${pendingModeration} redesigns awaiting review`,
        timestamp: new Date().toISOString(),
        isRead: false,
      });
    }

    return notifications;
  } catch (err) {
    console.error("Notifications error:", err);
    return { error: "Failed to fetch notifications" };
  }
}
