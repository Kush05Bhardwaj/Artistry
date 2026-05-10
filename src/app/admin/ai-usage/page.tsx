"use client";

import React from "react";
import { AdminHeader } from "@/components/admin/sidebar";
import { mockAIUsage } from "@/lib/admin/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatCard } from "@/components/admin/stat-card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Bot, AlertTriangle, Clock, DollarSign, Zap, Activity } from "lucide-react";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];

export default function AIUsagePage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="AI Usage" description="Monitor AI system usage and costs" />

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Requests"
          value={mockAIUsage.totalRequests.toLocaleString()}
          change={12.5}
          trend="up"
          icon={<Bot className="h-6 w-6 text-primary" />}
        />
        <StatCard
          title="Estimated Cost"
          value={`$${mockAIUsage.estimatedCost.toFixed(2)}`}
          change={8.2}
          trend="up"
          icon={<DollarSign className="h-6 w-6 text-primary" />}
        />
        <StatCard
          title="Failed Generations"
          value={mockAIUsage.failedGenerations}
          change={-15.3}
          trend="down"
          icon={<AlertTriangle className="h-6 w-6 text-primary" />}
        />
        <StatCard
          title="Avg Generation Time"
          value={`${mockAIUsage.avgGenerationTime}s`}
          change={-5.1}
          trend="down"
          icon={<Clock className="h-6 w-6 text-primary" />}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Token Consumption</CardTitle>
            <CardDescription>Daily token usage over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockAIUsage.tokenConsumption}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ borderRadius: 8 }} formatter={(value: number) => [`${value.toLocaleString()} tokens`, "Usage"]} />
                <Area type="monotone" dataKey="tokens" stroke="#2563eb" fill="url(#colorTokens)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Usage Distribution</CardTitle>
            <CardDescription>Breakdown by AI model</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockAIUsage.modelUsage}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                  label={({ model, percentage }) => `${model} (${percentage}%)`}
                >
                  {mockAIUsage.modelUsage.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Requests Per Hour</CardTitle>
            <CardDescription>24-hour request distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAIUsage.requestsPerHour}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 8 }} />
                <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Queue Status</CardTitle>
            <CardDescription>Current pending requests</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[200px]">
            <div className="text-6xl font-bold text-primary">{mockAIUsage.queueSize}</div>
            <p className="text-muted-foreground mt-2">requests in queue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
            <CardDescription>Request success vs failure</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[200px]">
            <div className="text-6xl font-bold text-green-500">
              {Math.round((1 - mockAIUsage.failedGenerations / mockAIUsage.totalRequests) * 100)}%
            </div>
            <p className="text-muted-foreground mt-2">success rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
