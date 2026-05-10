"use client";

import React from "react";
import { AdminSidebar, AdminNotifications } from "@/components/admin/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (!loading && user && !ADMIN_EMAILS.includes(user.email || "")) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const isAdmin = ADMIN_EMAILS.includes(user.email || "");

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <p className="text-lg font-medium">Access Denied</p>
        <Button onClick={() => router.push("/")}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:pl-[260px] transition-all duration-300">
        <div className="sticky top-0 z-30 flex items-center justify-end gap-2 h-16 px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <AdminNotifications />
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
