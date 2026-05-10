"use client";

import React from "react";
import { AdminHeader } from "@/components/admin/sidebar";
import { mockRewards } from "@/lib/admin/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, TrendingDown, Minus, Medal, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const trendIcons: Record<string, React.ReactNode> = {
  up: <TrendingUp className="h-4 w-4 text-green-500" />,
  down: <TrendingDown className="h-4 w-4 text-red-500" />,
  same: <Minus className="h-4 w-4 text-muted-foreground" />,
};

const rankIcons: Record<number, React.ReactNode> = {
  1: <Trophy className="h-6 w-6 text-yellow-500" />,
  2: <Medal className="h-6 w-6 text-gray-400" />,
  3: <Medal className="h-6 w-6 text-amber-600" />,
};

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Rewards & Leaderboard" description="Top creators and engagement metrics" />

      {/* Top 3 */}
      <div className="grid gap-6 md:grid-cols-3">
        {mockRewards.slice(0, 3).map((user, index) => (
          <Card key={user.userId} className={cn("relative overflow-hidden", index === 0 && "border-primary/50")}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500" />
            <CardContent className="pt-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                    <AvatarImage src={user.userAvatar} />
                    <AvatarFallback className="text-2xl">{user.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background flex items-center justify-center">
                    {rankIcons[index + 1]}
                  </div>
                </div>
                <h3 className="mt-4 font-semibold text-lg">{user.userName}</h3>
                <p className="text-3xl font-bold text-primary mt-2">{user.points.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">points</p>
                <div className="flex items-center gap-1 mt-2">
                  {trendIcons[user.trend]}
                  <span className="text-sm text-muted-foreground capitalize">{user.trend}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {user.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Full Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {mockRewards.map((user) => (
              <div key={user.userId} className="flex items-center gap-4 p-4 hover:bg-accent transition-colors">
                <div className="w-8 text-center font-bold text-muted-foreground">#{user.rank}</div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.userAvatar} />
                  <AvatarFallback>{user.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{user.userName}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{user.totalDesigns} designs</span>
                    <span>{user.totalLikes} likes</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.badges.map((badge) => (
                    <Badge key={badge} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {trendIcons[user.trend]}
                  <span className="font-bold text-lg">{user.points.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
