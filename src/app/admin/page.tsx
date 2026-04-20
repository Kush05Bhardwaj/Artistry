
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Users, LayoutDashboard, BarChart3, MousePointerClick } from "lucide-react";
import { getAdminAnalytics } from "./action";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    
    if (!loading && user) {
      getAdminAnalytics().then((res) => {
        if (res.error) setError(res.error);
        else setData(res);
      });
    }
  }, [user, loading, router]);

  if (loading || (!data && !error)) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-destructive">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-10 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Admin Analytics</h1>
      </div>

      {/* KPI Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalUsers || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Designs Generated</CardTitle>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalDesigns || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <MousePointerClick className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalViews || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {/* Views over Time */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Daily page views across the platform</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {data?.viewsByDate?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.viewsByDate} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                  />
                  <Area type="monotone" dataKey="views" stroke="#2563eb" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                No traffic data available.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Designs over Time */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Designs Generated Over Time</CardTitle>
            <CardDescription>Daily activity count for AI generations</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {data?.designsByDate?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.designsByDate} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <RechartsTooltip 
                    cursor={{ fill: '#e5e7eb', opacity: 0.4 }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: '#111827' }}
                  />
                  <Bar dataKey="count" fill="url(#colorCount)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                No design generation data available yet.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Paths */}
        <Card>
          <CardHeader>
            <CardTitle>Top Visited Paths</CardTitle>
            <CardDescription>Most popular pages on the site</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {data?.topPaths?.length > 0 ? data.topPaths.map((p: any, i: number) => (
                <li key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-mono text-sm w-4">{i + 1}.</span>
                    <span className="font-medium text-sm">{p.path}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">{p.views} views</span>
                </li>
              )) : (
                <div className="text-sm text-muted-foreground text-center py-4">No top paths tracked.</div>
              )}
            </ul>
          </CardContent>
        </Card>
        
        {/* Recent users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest signups to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {data?.recentUsers?.length > 0 ? data.recentUsers.map((u: any, i: number) => (
                <li key={i} className="flex flex-col border-b pb-3 last:border-0 last:pb-0">
                  <span className="font-medium text-sm">{u.name || "Anonymous User"}</span>
                  <span className="text-sm text-muted-foreground">{u.email}</span>
                </li>
              )) : (
                <div className="text-sm text-muted-foreground text-center py-4">No recent users found.</div>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}