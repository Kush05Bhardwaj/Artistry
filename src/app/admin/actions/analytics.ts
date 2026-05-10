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

// Traffic Analytics
export async function getTrafficAnalytics(range: "daily" | "weekly" | "monthly" | "yearly" = "daily") {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const days = range === "daily" ? 30 : range === "weekly" ? 90 : range === "monthly" ? 365 : 730;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const analytics = await db.collection("analytics")
      .find({ date: { $gte: startDate.toISOString().split("T")[0] } })
      .sort({ date: 1 })
      .toArray();

    const traffic = analytics.map(a => ({
      date: a.date,
      views: a.views || 0,
      uniqueVisitors: a.uniqueVisitors || 0,
    }));

    const referrals = await db.collection("analytics")
      .aggregate([
        { $group: { _id: "$referrer", visits: { $sum: "$views" } } },
        { $sort: { visits: -1 } },
        { $limit: 10 }
      ])
      .toArray();

    return {
      traffic,
      referrals: referrals.map(r => ({ source: r._id || "Direct", visits: r.visits })),
      totalViews: analytics.reduce((acc, a) => acc + (a.views || 0), 0),
      totalUniqueVisitors: analytics.reduce((acc, a) => acc + (a.uniqueVisitors || 0), 0),
    };
  } catch (err) {
    console.error("Traffic analytics error:", err);
    return { error: "Failed to fetch traffic" };
  }
}

// User Growth
export async function getUserGrowth(range: "daily" | "weekly" | "monthly" = "daily") {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const days = range === "daily" ? 30 : range === "weekly" ? 90 : 365;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const users = await db.collection("users")
      .find({ createdAt: { $gte: startDate.toISOString() } })
      .toArray();

    const grouped: Record<string, { signups: number; activeUsers: number }> = {};
    users.forEach(user => {
      const date = new Date(user.createdAt).toISOString().split("T")[0];
      if (!grouped[date]) grouped[date] = { signups: 0, activeUsers: 0 };
      grouped[date].signups++;
    });

    return Object.entries(grouped).map(([date, data]) => ({
      date,
      signups: data.signups,
      activeUsers: data.activeUsers,
    }));
  } catch (err) {
    console.error("User growth error:", err);
    return { error: "Failed to fetch user growth" };
  }
}

// AI Usage
export async function getAIUsageStats() {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const [totalRequests, totalDesigns, failedDesigns] = await Promise.all([
      db.collection("designs").countDocuments(),
      db.collection("designs").countDocuments(),
      db.collection("designs").countDocuments({ status: "failed" }),
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const requestsToday = await db.collection("designs")
      .countDocuments({ createdAt: { $gte: today.toISOString() } });

    const modelUsage = await db.collection("designs")
      .aggregate([
        { $group: { _id: "$aiModel", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
      .toArray();

    const totalCount = modelUsage.reduce((acc, m) => acc + m.count, 0);
    const enrichedModelUsage = modelUsage.map(m => ({
      model: m._id || "flux-dev",
      count: m.count,
      percentage: Math.round((m.count / totalCount) * 100),
    }));

    return {
      totalRequests,
      totalDesigns,
      failedGenerations: failedDesigns,
      requestsToday,
      modelUsage: enrichedModelUsage,
      estimatedCost: totalRequests * 0.015,
      avgGenerationTime: 12.5,
      queueSize: 0,
    };
  } catch (err) {
    console.error("AI usage error:", err);
    return { error: "Failed to fetch AI usage" };
  }
}

// Device Analytics
export async function getDeviceAnalytics() {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const analytics = await db.collection("analytics")
      .aggregate([
        { $group: { _id: "$device", count: { $sum: "$views" } } },
        { $sort: { count: -1 } }
      ])
      .toArray();

    const total = analytics.reduce((acc, a) => acc + a.count, 0);

    return analytics.map(a => ({
      device: a._id || "Desktop",
      percentage: Math.round((a.count / total) * 100),
    }));
  } catch (err) {
    console.error("Device analytics error:", err);
    return { error: "Failed to fetch device analytics" };
  }
}

// Geographic Analytics
export async function getGeographicAnalytics() {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const geoData = await db.collection("analytics")
      .aggregate([
        { $group: { _id: { country: "$country", city: "$city" }, visitors: { $sum: "$views" } } },
        { $sort: { visitors: -1 } },
        { $limit: 20 }
      ])
      .toArray();

    return geoData.map(g => ({
      country: g._id?.country || "Unknown",
      city: g._id?.city || "Unknown",
      visitors: g.visitors,
    }));
  } catch (err) {
    console.error("Geographic analytics error:", err);
    return { error: "Failed to fetch geographic analytics" };
  }
}

// Browser Analytics
export async function getBrowserAnalytics() {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const browserData = await db.collection("analytics")
      .aggregate([
        { $group: { _id: "$browser", count: { $sum: "$views" } } },
        { $sort: { count: -1 } }
      ])
      .toArray();

    const total = browserData.reduce((acc, b) => acc + b.count, 0);

    return browserData.map(b => ({
      browser: b._id || "Chrome",
      percentage: Math.round((b.count / total) * 100),
    }));
  } catch (err) {
    console.error("Browser analytics error:", err);
    return { error: "Failed to fetch browser analytics" };
  }
}

// Site Routes
export async function getSiteRoutes() {
  const check = await checkAdmin();
  if ("error" in check) return { error: check.error };

  try {
    const client = await clientPromise;
    const db = client.db("artistry");

    const routes = await db.collection("analytics")
      .aggregate([
        {
          $group: {
            _id: "$path",
            totalVisits: { $sum: "$views" },
            uniqueVisitors: { $sum: "$uniqueVisitors" },
            avgTimeSpent: { $avg: "$timeSpent" },
            bounceRate: { $avg: "$bounceRate" },
          }
        },
        { $sort: { totalVisits: -1 } },
        { $limit: 20 }
      ])
      .toArray();

    return routes.map(r => ({
      path: r._id || "/",
      title: r._id === "/" ? "Home" : r._id?.replace("/", "").replace("-", " ").replace(/^\w/, c => c.toUpperCase()) || "Page",
      totalVisits: r.totalVisits || 0,
      uniqueVisitors: r.uniqueVisitors || 0,
      avgTimeSpent: r.avgTimeSpent ? `${Math.round(r.avgTimeSpent / 60)}m ${Math.round(r.avgTimeSpent % 60)}s` : "0m 0s",
      bounceRate: Math.round(r.bounceRate || 0),
      conversionRate: 0,
      lastVisited: new Date().toISOString(),
    }));
  } catch (err) {
    console.error("Site routes error:", err);
    return { error: "Failed to fetch site routes" };
  }
}
