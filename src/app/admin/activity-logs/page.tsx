"use client";

import React from "react";
import { AdminHeader } from "@/components/admin/sidebar";
import { mockActivityLogs } from "@/lib/admin/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, LogIn, Palette, ImageIcon, Shield, Trash2, AlertTriangle, User, Activity as ActivityIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const activityIcons: Record<string, React.ReactNode> = {
  login: <LogIn className="h-4 w-4 text-blue-500" />,
  generation: <Palette className="h-4 w-4 text-purple-500" />,
  redesign: <ImageIcon className="h-4 w-4 text-green-500" />,
  moderation: <Shield className="h-4 w-4 text-yellow-500" />,
  delete: <Trash2 className="h-4 w-4 text-red-500" />,
  admin: <User className="h-4 w-4 text-orange-500" />,
  failed: <AlertTriangle className="h-4 w-4 text-red-500" />,
  suspicious: <AlertTriangle className="h-4 w-4 text-destructive" />,
};

export default function ActivityLogsPage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Activity Logs" description="Centralized activity tracking for your platform" />

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search logs..." className="pl-9" />
            </div>
            <select className="h-9 px-3 rounded-md border bg-background text-sm">
              <option value="all">All Types</option>
              <option value="login">Login</option>
              <option value="generation">Generation</option>
              <option value="moderation">Moderation</option>
              <option value="admin">Admin Action</option>
              <option value="failed">Failed</option>
            </select>
            <select className="h-9 px-3 rounded-md border bg-background text-sm">
              <option value="all">All Severity</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Severity</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockActivityLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {activityIcons[log.type] || <ActivityIcon className="h-4 w-4" />}
                      <Badge variant="outline" className="text-xs capitalize">
                        {log.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{log.userName || "System"}</TableCell>
                  <TableCell className="max-w-[400px] truncate">{log.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.severity === "info" ? "default" :
                        log.severity === "warning" ? "secondary" :
                        log.severity === "error" ? "destructive" : "destructive"
                      }
                    >
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
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
