"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/sidebar";
import { mockModerationQueue } from "@/lib/admin/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Check, X, Eye, AlertTriangle, User, Calendar, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ModerationItem } from "@/types/admin";

export default function ModerationPage() {
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null);

  return (
    <div className="space-y-6">
      <AdminHeader title="Moderation Queue" description="Review and moderate flagged content" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockModerationQueue.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-video">
              {item.type === "image" ? (
                <Image src={item.content} alt="Flagged content" fill className="object-cover blur-sm" />
              ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <p className="text-center p-4">{item.content}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg px-4 py-2">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  FLAGGED
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <User className="h-4 w-4" />
                <span>{item.userName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Reason</p>
                <p className="font-medium">{item.reason}</p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">AI Confidence</span>
                <Badge variant={item.aiConfidence > 0.8 ? "destructive" : "secondary"}>
                  {Math.round(item.aiConfidence * 100)}%
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => console.log("Approve", item.id)}>
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive" className="flex-1" onClick={() => console.log("Reject", item.id)}>
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockModerationQueue.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg font-medium">All Clear!</p>
            <p className="text-sm text-muted-foreground">No items in moderation queue</p>
          </CardContent>
        </Card>
      )}

      {/* Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image src={selectedItem.content} alt="Flagged content" fill className="object-cover blur-md" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedItem.userName}</p>
                  <p className="text-sm text-muted-foreground">{selectedItem.reason}</p>
                </div>
                <Badge variant="destructive">{Math.round(selectedItem.aiConfidence * 100)}% confidence</Badge>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1"><Check className="h-4 w-4 mr-2" />Approve</Button>
                <Button variant="destructive" className="flex-1"><X className="h-4 w-4 mr-2" />Reject</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
