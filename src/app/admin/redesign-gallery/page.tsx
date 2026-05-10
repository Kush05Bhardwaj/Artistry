"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/sidebar";
import { mockRedesigns } from "@/lib/admin/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { ComparisonSlider } from "@/app/redesign/comparison-slider";
import { Check, X, ZoomIn, User, Calendar, Tag, ThumbsUp } from "lucide-react";
import type { Redesign } from "@/types/admin";

export default function RedesignGalleryPage() {
  const [selectedRedesign, setSelectedRedesign] = useState<Redesign | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredRedesigns = mockRedesigns.filter((r) => {
    return filter === "all" || r.status === filter;
  });

  const handleApprove = (id: string) => {
    console.log("Approve:", id);
  };

  const handleReject = (id: string) => {
    console.log("Reject:", id);
  };

  return (
    <div className="space-y-6">
      <AdminHeader title="Redesign Gallery" description="Browse and moderate redesign submissions" />

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRedesigns.map((redesign) => (
              <Card key={redesign.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={redesign.afterImage}
                    alt="Redesign"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <Badge
                      variant={redesign.status === "approved" ? "default" : redesign.status === "rejected" ? "destructive" : "secondary"}
                    >
                      {redesign.status}
                    </Badge>
                    {redesign.isNSFW && (
                      <Badge variant="destructive">NSFW</Badge>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedRedesign(redesign)}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <User className="h-4 w-4" />
                    <span>{redesign.userName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Tag className="h-4 w-4" />
                    <span>{redesign.roomType} / {redesign.style}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(redesign.createdAt).toLocaleDateString()}</span>
                  </div>

                  {filter === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => handleApprove(redesign.id)}>
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" className="flex-1" onClick={() => handleReject(redesign.id)}>
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Fullscreen Modal */}
      <Dialog open={!!selectedRedesign} onOpenChange={() => setSelectedRedesign(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedRedesign && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Before & After Comparison</h3>
                  <p className="text-sm text-muted-foreground">
                    by {selectedRedesign.userName} — {selectedRedesign.roomType} / {selectedRedesign.style}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={selectedRedesign.status === "approved" ? "default" : "secondary"}>
                    {selectedRedesign.status}
                  </Badge>
                  {selectedRedesign.isNSFW && <Badge variant="destructive">NSFW</Badge>}
                </div>
              </div>

              <div className="max-w-4xl mx-auto">
                <ComparisonSlider
                  before={selectedRedesign.beforeImage}
                  after={selectedRedesign.afterImage}
                  beforeHint={`${selectedRedesign.roomType} before`}
                  afterHint={`${selectedRedesign.roomType} after`}
                />
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Applied Suggestions</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRedesign.suggestions.map((s, i) => (
                    <Badge key={i} variant="outline">{s}</Badge>
                  ))}
                </div>
              </div>

              {selectedRedesign.status === "pending" && (
                <div className="flex gap-4 justify-center">
                  <Button size="lg" onClick={() => handleApprove(selectedRedesign.id)}>
                    <Check className="h-5 w-5 mr-2" />
                    Approve Redesign
                  </Button>
                  <Button size="lg" variant="destructive" onClick={() => handleReject(selectedRedesign.id)}>
                    <X className="h-5 w-5 mr-2" />
                    Reject Redesign
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
