"use client";

import React, { useState } from "react";
import { AdminHeader, AdminSearch } from "@/components/admin/sidebar";
import { mockDesigns } from "@/lib/admin/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, MoreHorizontal, Eye, Star, Trash2, Flag, ImageIcon, User, Calendar, Sparkles, ThumbsUp, Download } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Design } from "@/types/admin";

export default function DesignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modelFilter, setModelFilter] = useState<string>("all");
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");

  const filteredDesigns = mockDesigns.filter((design) => {
    const matchesSearch =
      design.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || design.status === statusFilter;
    const matchesModel = modelFilter === "all" || design.aiModel === modelFilter;
    return matchesSearch && matchesStatus && matchesModel;
  });

  return (
    <div className="space-y-6">
      <AdminHeader title="Designs" description="Browse and manage all generated designs">
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <div className="grid h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "masonry" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("masonry")}
          >
            <div className="flex flex-col gap-0.5 h-4 w-4">
              <div className="flex gap-0.5">
                <div className="h-1.5 w-1.5 bg-current rounded-sm" />
                <div className="h-1.5 w-1.5 bg-current rounded-sm" />
              </div>
              <div className="flex gap-0.5">
                <div className="h-1.5 w-1.5 bg-current rounded-sm" />
                <div className="h-1.5 w-1.5 bg-current rounded-sm" />
              </div>
            </div>
          </Button>
        </div>
      </AdminHeader>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search designs by prompt or user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 px-3 rounded-md border bg-background text-sm"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <select
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
                className="h-9 px-3 rounded-md border bg-background text-sm"
              >
                <option value="all">All Models</option>
                <option value="flux-dev">Flux Dev</option>
                <option value="gemini-flash">Gemini Flash</option>
                <option value="stable-diffusion">Stable Diffusion</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Designs Gallery */}
      <div className={cn(
        "grid gap-4",
        viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      )}>
        {filteredDesigns.map((design) => (
          <Card
            key={design.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
            onClick={() => setSelectedDesign(design)}
          >
            <div className="relative aspect-square">
              <Image
                src={design.generatedImage || design.originalImage}
                alt={design.prompt}
                fill
                className="object-cover"
              />
              {design.isFlagged && (
                <div className="absolute top-2 left-2">
                  <Badge variant="destructive" className="bg-destructive/90">
                    <Flag className="h-3 w-3 mr-1" />
                    Flagged
                  </Badge>
                </div>
              )}
              {design.isFeatured && (
                <div className="absolute top-2 right-2">
                  <Badge variant="default" className="bg-yellow-500/90">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="secondary" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Star className="h-4 w-4 mr-2" />Feature</DropdownMenuItem>
                      <DropdownMenuItem><Flag className="h-4 w-4 mr-2" />Flag as NSFW</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium line-clamp-2">{design.prompt}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span className="truncate max-w-[80px]">{design.userName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  {design.likes}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {design.downloads}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDesigns.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No designs found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
          </CardContent>
        </Card>
      )}

      {/* Design Detail Modal */}
      <Dialog open={!!selectedDesign} onOpenChange={() => setSelectedDesign(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Design Details</DialogTitle>
          </DialogHeader>
          {selectedDesign && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Original</p>
                  <div className="relative aspect-square rounded-lg overflow-hidden border">
                    <Image src={selectedDesign.originalImage} alt="Original" fill className="object-cover" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Generated</p>
                  <div className="relative aspect-square rounded-lg overflow-hidden border">
                    <Image src={selectedDesign.generatedImage || "/placeholder.svg"} alt="Generated" fill className="object-cover" />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Prompt</p>
                <p className="font-medium">{selectedDesign.prompt}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">User</p>
                  <p className="font-semibold">{selectedDesign.userName}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-semibold">{selectedDesign.aiModel}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={selectedDesign.status === "completed" ? "default" : "secondary"}>{selectedDesign.status}</Badge>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Tokens</p>
                  <p className="font-semibold">{selectedDesign.tokenCost?.toLocaleString() || 0}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Star className="h-4 w-4 mr-2" />
                  {selectedDesign.isFeatured ? "Unfeature" : "Feature"}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Flag className="h-4 w-4 mr-2" />
                  {selectedDesign.isFlagged ? "Unflag" : "Flag NSFW"}
                </Button>
                <Button variant="destructive" className="flex-1">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
