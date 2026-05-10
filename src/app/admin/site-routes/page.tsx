"use client";

import React from "react";
import { AdminHeader } from "@/components/admin/sidebar";
import { mockSiteRoutes } from "@/lib/admin/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Route, Clock, Users, MousePointerClick, TrendingUp, TrendingDown } from "lucide-react";

export default function SiteRoutesPage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Site Routes" description="Track performance metrics for all site pages" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSiteRoutes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSiteRoutes.reduce((acc, r) => acc + r.totalVisits, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Bounce Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockSiteRoutes.reduce((acc, r) => acc + r.bounceRate, 0) / mockSiteRoutes.length)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Time on Page</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 34s</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Route Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Total Visits</TableHead>
                <TableHead>Unique Visitors</TableHead>
                <TableHead>Avg Time</TableHead>
                <TableHead>Bounce Rate</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>Last Visited</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSiteRoutes.map((route) => (
                <TableRow key={route.path}>
                  <TableCell>
                    <div>
                      <p className="font-medium font-mono">{route.path}</p>
                      <p className="text-sm text-muted-foreground">{route.title}</p>
                    </div>
                  </TableCell>
                  <TableCell>{route.totalVisits.toLocaleString()}</TableCell>
                  <TableCell>{route.uniqueVisitors.toLocaleString()}</TableCell>
                  <TableCell className="font-mono">{route.avgTimeSpent}</TableCell>
                  <TableCell>
                    <span className={route.bounceRate > 50 ? "text-red-500" : "text-green-500"}>
                      {route.bounceRate}%
                    </span>
                  </TableCell>
                  <TableCell>{route.conversionRate > 0 ? `${route.conversionRate}%` : "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(route.lastVisited).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
