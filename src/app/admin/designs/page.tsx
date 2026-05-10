"use client";

import React, { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/sidebar";
import { mockDesigns } from "@/lib/admin/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, Star, Trash2, Flag, ImageIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Design } from "@/types/admin";
import { getAllDesigns, updateDesign, deleteDesign } from "../actions/designs";

export default function DesignsPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDesigns = async () => {
    setLoading(true);
    try {
      const res = await getAllDesigns({
        search: searchQuery,
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      if (res.error) {
        setDesigns(mockDesigns as unknown as Design[]);
      } else {
        setDesigns(res.designs || []);
      }
    } catch {
      setDesigns(mockDesigns as unknown as Design[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDesigns(); }, [searchQuery, statusFilter]);

  const handleFeature = async (designId: string, isFeatured: boolean) => {
    await updateDesign(designId, { isFeatured: !isFeatured });
    loadDesigns();
  };

  const handleFlag = async (designId: string, isFlagged: boolean) => {
    await updateDesign(designId, { isFlagged: !isFlagged });
    loadDesigns();
  };

  const handleDelete = async (designId: string) => {
    if (confirm("Delete this design?")) {
      await deleteDesign(designId);
      loadDesigns();
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader title="Designs" description="Browse and manage all generated designs" />

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search designs by prompt or user..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 px-3 rounded-md border bg-background text-sm">
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {designs.map((design) => (
          <Card key={design.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group">
            <div className="relative aspect-square">
              <Image src={design.generatedImage || design.originalImage || "/placeholder.svg"} alt={design.prompt} fill className="object-cover" />
              {design.isFlagged && <div className="absolute top-2 left-2"><Badge variant="destructive" className="bg-destructive/90"><Flag className="h-3 w-3 mr-1" />Flagged</Badge></div>}
              {design.isFeatured && <div className="absolute top-2 right-2"><Badge variant="default" className="bg-yellow-500/90"><Star className="h-3 w-3 mr-1" />Featured</Badge></div>}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => setSelectedDesign(design)}><Eye className="h-4 w-4" /></Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button size="icon" variant="secondary" className="h-8 w-8" onClick={(e) => e.stopPropagation()}><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleFeature(design.id, design.isFeatured)}><Star className="h-4 w-4 mr-2" />{design.isFeatured ? "Unfeature" : "Feature"}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFlag(design.id, design.isFlagged)}><Flag className="h-4 w-4 mr-2" />{design.isFlagged ? "Unflag" : "Flag NSFW"}</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(design.id)}><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium line-clamp-2">{design.prompt}</p>
              <p className="text-xs text-muted-foreground mt-2">{design.userName}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {designs.length === 0 && !loading && (
        <Card><CardContent className="flex flex-col items-center justify-center py-12"><ImageIcon className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-lg font-medium">No designs found</p></CardContent></Card>
      )}

      <Dialog open={!!selectedDesign} onOpenChange={() => setSelectedDesign(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Design Details</DialogTitle></DialogHeader>
          {selectedDesign && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Original</p>
                  <div className="relative aspect-square rounded-lg overflow-hidden border"><Image src={selectedDesign.originalImage || "/placeholder.svg"} alt="Original" fill className="object-cover" /></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Generated</p>
                  <div className="relative aspect-square rounded-lg overflow-hidden border"><Image src={selectedDesign.generatedImage || "/placeholder.svg"} alt="Generated" fill className="object-cover" /></div>
                </div>
              </div>
              <div><p className="text-sm text-muted-foreground mb-2">Prompt</p><p className="font-medium">{selectedDesign.prompt}</p></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg"><p className="text-sm text-muted-foreground">User</p><p className="font-semibold">{selectedDesign.userName}</p></div>
                <div className="p-4 bg-muted rounded-lg"><p className="text-sm text-muted-foreground">Model</p><p className="font-semibold">{selectedDesign.aiModel}</p></div>
                <div className="p-4 bg-muted rounded-lg"><p className="text-sm text-muted-foreground">Status</p><Badge variant={selectedDesign.status === "completed" ? "default" : "secondary"}>{selectedDesign.status}</Badge></div>
                <div className="p-4 bg-muted rounded-lg"><p className="text-sm text-muted-foreground">Tokens</p><p className="font-semibold">{selectedDesign.tokenCost?.toLocaleString() || 0}</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
