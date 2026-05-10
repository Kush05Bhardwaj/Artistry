"use client";

import React from "react";
import { AdminHeader } from "@/components/admin/sidebar";
import { StatCard } from "@/components/admin/stat-card";
import { getMockStats, mockActivityLogs, mockNotifications } from "@/lib/admin/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Palette, ImageIcon, Bot, Globe, Clock, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  const stats = getMockStats();

  const statCards = [
    { title: "Total Users", ...stats.totalUsers, icon: <Users className="h-6 w-6 text-primary" /> },
    { title: "Active Today", ...stats.activeUsersToday, icon: <Activity className="h-6 w-6 text-primary" /> },
    { title: "Total Designs", ...stats.totalDesigns, icon: <Palette className="h-6 w-6 text-primary" /> },
    { title: "Total Redesigns", ...stats.totalRedesigns, icon: <ImageIcon className="h-6 w-6 text-primary" /> },
    { title: "Total Visits", ...stats.totalVisits, icon: <Globe className="h-6 w-6 text-primary" /> },
    { title: "AI Requests Today", ...stats.aiRequestsToday, icon: <Bot className="h-6 w-6 text-primary" /> },
    { title: "Avg Session", ...stats.avgSessionDuration, icon: <Clock className="h-6 w-6 text-primary" /> },
    { title: "Bounce Rate", ...stats.bounceRate, icon: <AlertTriangle className="h-6 w-6 text-primary" /> },
    { title: "New Signups", ...stats.newSignupsToday, icon: <TrendingUp className="h-6 w-6 text-primary" /> },
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
            <div className="space-y-4">
              {mockActivityLogs.slice(0, 6).map((log) => (
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
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Notifications
              <Badge variant="destructive" className="ml-auto">
                {mockNotifications.filter((n) => !n.isRead).length} new
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockNotifications.slice(0, 5).map((notification) => (
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
