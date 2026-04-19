
"use server";
import { auth } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

// Add specific admin emails here or check roles if you implement them.
const ADMIN_EMAILS = [
  "kush2012bhardwaj@gmail.com",
  "agaur2813@gmail.com"
];

export async function getAdminAnalytics() {
  try {
    const session = await auth();
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return { error: "Unauthorized or not an admin" };
    }

    const client = await clientPromise;
    const db = client.db("artistry");

    const totalUsers = await db.collection("users").countDocuments();
    const totalDesigns = await db.collection("designs").countDocuments();
    
    // Overall views
    const viewsData = await db.collection("analytics").aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]).toArray();
    
    // Top visited paths
    const topPaths = await db.collection("analytics").aggregate([
      { $group: { _id: "$path", totalViews: { $sum: "$views" } } },
      { $sort: { totalViews: -1 } },
      { $limit: 10 }
    ]).toArray();

    // Views by date (Last 30 days roughly)
    const viewsByDate = await db.collection("analytics").aggregate([
      { $group: { _id: "$date", views: { $sum: "$views" } } },
      { $sort: { _id: 1 } },
      { $limit: 30 }
    ]).toArray();

    // Designs by date
    const designsByDate = await db.collection("designs").aggregate([
      { $match: { createdAt: { $exists: true, $type: "date" } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 30 }
    ]).toArray();

    const recentUsers = await db.collection("users")
      .find({})
      .sort({ _id: -1 })
      .limit(5)
      .project({ name: 1, email: 1 })
      .toArray();

    return {
      success: true,
      totalUsers,
      totalDesigns,
      totalViews: viewsData.length > 0 ? viewsData[0].totalViews : 0,
      topPaths: topPaths.map((p) => ({ path: p._id, views: p.totalViews })),
      viewsByDate: viewsByDate.map((v) => ({ date: v._id || 'Unknown', views: v.views })),
      designsByDate: designsByDate.map((d) => ({ date: d._id || 'Unknown', count: d.count })),
      recentUsers: recentUsers.map((u) => ({ name: u.name, email: u.email }))
    };
  } catch (err) {
    console.error("Admin analytics error:", err);
    return { error: "Failed to fetch analytics: " + (err instanceof Error ? err.message : String(err)) };
  }
}
