"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "stable";
  icon: React.ReactNode;
  sparklineData?: number[];
  className?: string;
}

export function StatCard({ title, value, change, trend, icon, sparklineData, className }: StatCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-all duration-200 group overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
            <div className="flex items-center gap-2 mt-2">
              {trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
              {trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
              {trend === "stable" && <Minus className="h-4 w-4 text-muted-foreground" />}
              <span
                className={cn(
                  "text-sm font-medium",
                  trend === "up" && "text-green-500",
                  trend === "down" && "text-red-500",
                  trend === "stable" && "text-muted-foreground"
                )}
              >
                {change > 0 ? "+" : ""}
                {change}%
              </span>
              <span className="text-xs text-muted-foreground">vs last period</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
        </div>
        {sparklineData && sparklineData.length > 0 && (
          <div className="mt-4 h-10">
            <Sparklines data={sparklineData} height={40}>
              <SparklinesLine
                color={trend === "up" ? "#22c55e" : trend === "down" ? "#ef4444" : "#6b7280"}
                style={{ fill: "none", strokeWidth: 2 }}
              />
              <SparklinesSpots size={0} />
            </Sparklines>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
