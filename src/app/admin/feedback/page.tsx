"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AdminHeader } from "@/components/admin/sidebar";
import { mockUsers } from "@/lib/admin/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, ChevronLeft, ChevronRight, Eye, Trash2, MoreHorizontal, MessageSquare, ThumbsUp, TrendingUp, Star } from "lucide-react";
import { getAllFeedback, deleteFeedback as deleteFeedbackAction } from "../actions/feedback";
import { getFeedbackStats } from "../actions/feedback";

const satisfactionLabels: Record<string, string> = {
  "extremely-satisfied": "Extremely Satisfied",
  "satisfied": "Satisfied",
  "neutral": "Neutral",
  "unsatisfied": "Unsatisfied",
  "very-unsatisfied": "Very Unsatisfied",
};

const wouldUseLabels: Record<string, string> = {
  "definitely-yes": "Definitely Yes",
  "probably-yes": "Probably Yes",
  "maybe": "Maybe",
  "probably-no": "Probably No",
  "definitely-no": "Definitely No",
};

const featureLabels: Record<string, string> = {
  "ai-room-redesign": "AI Room Redesign",
  "budget-estimation": "Budget Estimation",
  "decor-suggestions": "Decor Suggestions",
  "diy-planning": "DIY Planning",
  "simplicity": "Simplicity & UI",
};

const easeLabels: Record<string, string> = {
  "very-easy": "Very Easy",
  "easy": "Easy",
  "average": "Average",
  "difficult": "Difficult",
  "very-difficult": "Very Difficult",
};

const vizLabels: Record<string, string> = {
  "yes-very-clearly": "Yes, Very Clearly",
  "yes-somehow": "Yes, Somehow",
  "neutral": "Neutral",
  "not-much": "Not Much",
  "not-at-all": "Not at All",
};

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pageSize = 15;

  const loadFeedback = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllFeedback({
        page: currentPage,
        pageSize,
        search: searchQuery,
      });
      if (res.error) {
        setFeedback([]);
      } else {
        setFeedback(res.feedback || []);
        setTotal(res.total || 0);
      }

      const statsRes = await getFeedbackStats();
      if (!statsRes.error) setStats(statsRes);
    } catch {
      setFeedback([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  const handleDelete = async (id: string) => {
    if (confirm("Delete this feedback?")) {
      await deleteFeedbackAction(id);
      loadFeedback();
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <AdminHeader title="Feedback" description="View and manage user feedback" />

      {/* Stats Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentWeek || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Positive Reviews</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((stats.satisfactionStats?.find(s => s.label === "extremely-satisfied" || s.label === "satisfied")?.count || 0) / (stats.total || 1) * 100).toFixed(0)}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Top Feature</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                {stats.featureStats?.[0] ? featureLabels[stats.featureStats[0].label] || stats.featureStats[0].label : "N/A"}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search feedback..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Feedback Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Satisfaction</TableHead>
                <TableHead>Would Use Again</TableHead>
                <TableHead>Top Feature</TableHead>
                <TableHead>Ease of Use</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedback.map((f) => (
                <TableRow key={f.id}>
                  <TableCell>
                    <Badge variant={f.satisfaction === "extremely-satisfied" || f.satisfaction === "satisfied" ? "default" : "secondary"}>
                      {satisfactionLabels[f.satisfaction] || f.satisfaction}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={f.wouldUse === "definitely-yes" || f.wouldUse === "probably-yes" ? "default" : "secondary"}>
                      {wouldUseLabels[f.wouldUse] || f.wouldUse}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{featureLabels[f.featureImpressed] || f.featureImpressed}</TableCell>
                  <TableCell className="text-sm">{easeLabels[f.easeOfUse] || f.easeOfUse}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(f.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedFeedback(f)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(f.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {Math.min((currentPage - 1) * pageSize + 1, total)} to {Math.min(currentPage * pageSize, total)} of {total} feedback
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">Page {currentPage} of {totalPages || 1}</span>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Feedback Detail Modal */}
      <Dialog open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                  <p className="text-lg font-semibold">{satisfactionLabels[selectedFeedback.satisfaction] || selectedFeedback.satisfaction}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Would Use Again</p>
                  <p className="text-lg font-semibold">{wouldUseLabels[selectedFeedback.wouldUse] || selectedFeedback.wouldUse}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Visualization</p>
                  <p className="text-lg font-semibold">{vizLabels[selectedFeedback.visualization] || selectedFeedback.visualization}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Ease of Use</p>
                  <p className="text-lg font-semibold">{easeLabels[selectedFeedback.easeOfUse] || selectedFeedback.easeOfUse}</p>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Most Impressive Feature</p>
                <p className="text-lg font-semibold">{featureLabels[selectedFeedback.featureImpressed] || selectedFeedback.featureImpressed}</p>
              </div>

              {selectedFeedback.suggestions && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">User Suggestions</p>
                  <div className="p-4 bg-muted rounded-lg border">
                    <p className="whitespace-pre-wrap">{selectedFeedback.suggestions}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Submitted: {new Date(selectedFeedback.createdAt).toLocaleString()}</span>
                {selectedFeedback.ip && <span>IP: {selectedFeedback.ip}</span>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
