"use client";

import React, { useEffect, useState } from "react";
import { AdminHeader, AdminSearch } from "@/components/admin/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { getTrafficAnalytics, getUserGrowth, getDeviceAnalytics, getGeographicAnalytics, getBrowserAnalytics } from "../actions/analytics";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function AnalyticsPage() {
  const [traffic, setTraffic] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [geo, setGeo] = useState<any[]>([]);
  const [browsers, setBrowsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const [trafficRes, usersRes, devicesRes, geoRes, browsersRes] = await Promise.all([
          getTrafficAnalytics("daily"),
          getUserGrowth("daily"),
          getDeviceAnalytics(),
          getGeographicAnalytics(),
          getBrowserAnalytics(),
        ]);

        if (trafficRes && typeof trafficRes === 'object' && 'traffic' in trafficRes) setTraffic((trafficRes as any).traffic || []);
        if (usersRes && typeof usersRes === 'object' && !Array.isArray(usersRes) && 'error' in usersRes === false) setUsers(Array.isArray(usersRes) ? usersRes : []);
        if (devicesRes && typeof devicesRes === 'object' && Array.isArray(devicesRes)) setDevices(devicesRes as any[]);
        if (geoRes && typeof geoRes === 'object' && Array.isArray(geoRes)) setGeo(geoRes as any[]);
        if (browsersRes && typeof browsersRes === 'object' && Array.isArray(browsersRes)) setBrowsers(browsersRes as any[]);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader title="Analytics" description="Deep insights into your platform's performance" />

      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full h-auto p-1">
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="designs">Designs</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="geo">Geography</TabsTrigger>
          <TabsTrigger value="browsers">Browsers</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Page Views</CardTitle>
                <CardDescription>Daily page views</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={traffic}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#888" fontSize={12} tickFormatter={(v) => v?.slice(5) || ""} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                    <Area type="monotone" dataKey="views" stroke="#2563eb" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unique Visitors</CardTitle>
                <CardDescription>Daily unique visitors</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={traffic}>
                    <defs>
                      <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#888" fontSize={12} tickFormatter={(v) => v?.slice(5) || ""} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                    <Area type="monotone" dataKey="uniqueVisitors" stroke="#16a34a" fillOpacity={1} fill="url(#colorVisitors)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>New signups over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={users}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#888" fontSize={12} tickFormatter={(v) => v?.slice(5) || ""} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                  <Bar dataKey="signups" fill="#16a34a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="designs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Design Activity</CardTitle>
              <CardDescription>AI generations over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={traffic}>
                  <defs>
                    <linearGradient id="colorGenerations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 8 }} />
                  <Area type="monotone" dataKey="views" stroke="#8b5cf6" fill="url(#colorGenerations)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={devices} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="percentage">
                      {devices.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 8 }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device: any, index: number) => (
                    <div key={device.device}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">{device.device}</span>
                        <span className="text-muted-foreground">{device.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${device.percentage}%`, backgroundColor: COLORS[index % COLORS.length] }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Locations</CardTitle>
              <CardDescription>Visitors by country and city</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geo.map((location: any, index: number) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                      <div>
                        <p className="font-medium">{location.city}</p>
                        <p className="text-sm text-muted-foreground">{location.country}</p>
                      </div>
                    </div>
                    <span className="font-medium">{(location.visitors || 0).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="browsers" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Browser Usage</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={browsers} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="percentage">
                      {browsers.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 8 }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Browser Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {browsers.map((browser: any, index: number) => (
                    <div key={browser.browser}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">{browser.browser}</span>
                        <span className="text-muted-foreground">{browser.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${browser.percentage}%`, backgroundColor: COLORS[index % COLORS.length] }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
