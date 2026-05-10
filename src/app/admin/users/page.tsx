"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AdminHeader, AdminSearch } from "@/components/admin/sidebar";
import { mockUsers } from "@/lib/admin/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Search, ChevronLeft, ChevronRight, Eye, Ban, UserPlus, Trash2, Shield } from "lucide-react";
import type { User } from "@/types/admin";
import { getAllUsers, updateUser, deleteUser } from "../actions/users";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllUsers({
        page: currentPage,
        pageSize,
        search: searchQuery,
        status: statusFilter !== "all" ? statusFilter : undefined,
      });
      if (res.error) {
        setUsers(mockUsers as unknown as User[]);
        setTotal(mockUsers.length);
      } else {
        setUsers(res.users || []);
        setTotal(res.total || 0);
      }
    } catch {
      setUsers(mockUsers as unknown as User[]);
      setTotal(mockUsers.length);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, statusFilter]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSuspendUser = async (userId: string) => {
    await updateUser(userId, { status: "suspended" });
    loadUsers();
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      loadUsers();
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <AdminHeader title="Users" description="Manage platform users and their accounts" />

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 px-3 rounded-md border bg-background text-sm">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Designs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name || "Unknown"}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant={user.role === "admin" ? "default" : user.role === "moderator" ? "secondary" : "outline"}>{user.role}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.lastActive ? new Date(user.lastActive).toLocaleDateString() : "N/A"}</TableCell>
                  <TableCell><span className="font-medium">{user.totalDesigns || 0}</span> <span className="text-muted-foreground">/ {user.totalRedesigns || 0}</span></TableCell>
                  <TableCell><Badge variant={user.status === "active" ? "default" : user.status === "pending" ? "secondary" : "destructive"}>{user.status}</Badge></TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSelectedUser(user)}><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSuspendUser(user.id)}><Ban className="h-4 w-4 mr-2" />Suspend</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteUser(user.id)}><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {Math.min((currentPage - 1) * pageSize + 1, total)} to {Math.min(currentPage * pageSize, total)} of {total} users</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeft className="h-4 w-4" /></Button>
          <span className="text-sm">Page {currentPage} of {totalPages || 1}</span>
          <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages}><ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>User Details</DialogTitle></DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20"><AvatarImage src={selectedUser.avatar} /><AvatarFallback className="text-2xl">{selectedUser.name?.charAt(0) || "U"}</AvatarFallback></Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name || "Unknown"}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={selectedUser.role === "admin" ? "default" : "secondary"}>{selectedUser.role}</Badge>
                    <Badge variant={selectedUser.status === "active" ? "default" : "destructive"}>{selectedUser.status}</Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg"><p className="text-sm text-muted-foreground">Total Designs</p><p className="text-2xl font-bold">{selectedUser.totalDesigns || 0}</p></div>
                <div className="p-4 bg-muted rounded-lg"><p className="text-sm text-muted-foreground">Total Redesigns</p><p className="text-2xl font-bold">{selectedUser.totalRedesigns || 0}</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
