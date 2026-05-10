"use client";

import React, { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/sidebar";
import { StatCard } from "@/components/admin/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Users, Palette, ImageIcon, Bot, Globe, Clock, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getDashboardStats, getRecentActivity, getAdminNotifications } from "./actions/dashboard";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, activityRes, notifRes] = await Promise.all([
          getDashboardStats(),
          getRecentActivity(6),
          getAdminNotifications(),
        ]);

        if (statsRes.error) setError(statsRes.error);
        else setStats(statsRes);

        if (!activityRes.error) setActivity(activityRes);
        if (!notifRes.error) setNotifications(notifRes);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center flex-col gap-4">
        <p className="text-lg font-medium text-destructive">{error}</p>
      </div>
    );
  }

  const statCards = [
    { title: "Total Users", value: stats?.totalUsers || 0, change: 12.5, trend: "up", icon: <Users className="h-6 w-6 text-primary" /> },
    { title: "Active Today", value: stats?.activeUsersToday || 0, change: 8.2, trend: "up", icon: <Activity className="h-6 w-6 text-primary" /> },
    { title: "Total Designs", value: stats?.totalDesigns || 0, change: 15.3, trend: "up", icon: <Palette className="h-6 w-6 text-primary" /> },
    { title: "Total Redesigns", value: stats?.totalRedesigns || 0, change: 9.8, trend: "up", icon: <ImageIcon className="h-6 w-6 text-primary" /> },
    { title: "Total Visits", value: stats?.totalVisits?.toLocaleString() || "0", change: -2.1, trend: "down", icon: <Globe className="h-6 w-6 text-primary" /> },
    { title: "AI Requests Today", value: stats?.aiRequestsToday || 0, change: 23.4, trend: "up", icon: <Bot className="h-6 w-6 text-primary" /> },
    { title: "Avg Session", value: stats?.avgSessionDuration || "0m", change: 5.2, trend: "up", icon: <Clock className="h-6 w-6 text-primary" /> },
    { title: "Bounce Rate", value: stats?.bounceRate || "0%", change: -1.8, trend: "down", icon: <AlertTriangle className="h-6 w-6 text-primary" /> },
    { title: "New Signups", value: stats?.newSignupsToday || 0, change: 45.2, trend: "up", icon: <TrendingUp className="h-6 w-6 text-primary" /> },
  ];

  return (
    <div className="space-y-6">
      <AdminHeader title="Dashboard" description="Overview of your platform's performance" />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activity.length > 0 ? (
              <div className="space-y-4">
                {activity.map((log: any) => (
                  <div key={log.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full mt-2",
                        log.severity === "info" && "bg-blue-500",
                        log.severity === "warning" && "bg-yellow-500",
                        log.severity === "error" && "bg-red-500",
                        log.severity === "critical" && "bg-destructive"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{log.userName}</span>
                        <Badge variant="outline" className="text-xs">
                          {log.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{log.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No recent activity</p>
            )}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Notifications
              <Badge variant="destructive" className="ml-auto">
                {notifications.filter((n) => !n.isRead).length} new
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification: any) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors",
                      !notification.isRead && "bg-primary/5 border-primary/20"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full mt-2",
                          notification.type === "error" && "bg-destructive",
                          notification.type === "warning" && "bg-yellow-500",
                          notification.type === "info" && "bg-blue-500",
                          notification.type === "success" && "bg-green-500"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No notifications</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
