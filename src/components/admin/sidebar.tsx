"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Palette,
  ImageIcon,
  Bot,
  Globe,
  Route,
  FileText,
  Activity,
  Shield,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bell,
  Search,
  LogOut,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="h-5 w-5" /> },
  { label: "Users", href: "/admin/users", icon: <Users className="h-5 w-5" /> },
  { label: "Designs", href: "/admin/designs", icon: <Palette className="h-5 w-5" /> },
  { label: "Redesign Gallery", href: "/admin/redesign-gallery", icon: <ImageIcon className="h-5 w-5" /> },
  { label: "AI Usage", href: "/admin/ai-usage", icon: <Bot className="h-5 w-5" /> },
  { label: "Traffic", href: "/admin/traffic", icon: <Globe className="h-5 w-5" /> },
  { label: "Site Routes", href: "/admin/site-routes", icon: <Route className="h-5 w-5" /> },
  { label: "Reports", href: "/admin/reports", icon: <FileText className="h-5 w-5" /> },
  { label: "Activity Logs", href: "/admin/activity-logs", icon: <Activity className="h-5 w-5" /> },
  { label: "Moderation", href: "/admin/moderation", icon: <Shield className="h-5 w-5" />, badge: 3 },
  { label: "Rewards", href: "/admin/rewards", icon: <Trophy className="h-5 w-5" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
];

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className={cn("flex flex-col h-full bg-card border-r", className)}>
      {/* Logo */}
      <div className={cn("flex items-center h-16 px-4 border-b", isCollapsed ? "justify-center" : "gap-3")}>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <Palette className="h-6 w-6 text-primary" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-lg">Artistry</span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  isCollapsed && "justify-center px-2"
                )}
              >
                {item.icon}
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-destructive text-destructive-foreground">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className={cn("p-3 border-t", isCollapsed ? "px-2" : "")}>
        {!isCollapsed ? (
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="w-full text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild className="fixed top-20 left-4 z-50 lg:hidden">
          <Button variant="outline" size="icon" className="shadow-lg">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[280px]">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-card border-r transition-all duration-300 z-40",
          isCollapsed ? "w-[72px]" : "w-[260px]"
        )}
      >
        <SidebarContent />
        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute -right-3 top-20 h-6 w-6 rounded-full border bg-background shadow-md",
            isCollapsed && "-right-3"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>
      </div>
    </>
  );
}

interface AdminHeaderProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function AdminHeader({ title, description, children }: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title || "Dashboard"}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
}

interface AdminSearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export function AdminSearch({ placeholder = "Search...", onSearch }: AdminSearchProps) {
  return (
    <div className="relative hidden md:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
        className="h-9 w-[240px] pl-9 pr-4 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

export function AdminNotifications() {
  const [open, setOpen] = useState(false);
  const unreadCount = 2;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[380px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="font-semibold">Notifications</h2>
            <Button variant="ghost" size="sm" className="text-xs">
              Mark all read
            </Button>
          </div>
          <ScrollArea className="flex-1 mt-4">
            <div className="space-y-4">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer hover:bg-accent transition-colors",
                    !notification.isRead && "bg-primary/5 border-primary/20"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full mt-2",
                        notification.type === "error" && "bg-destructive",
                        notification.type === "warning" && "bg-yellow-500",
                        notification.type === "info" && "bg-blue-500",
                        notification.type === "success" && "bg-green-500"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Import mock notifications for the component
import { mockNotifications } from "@/lib/admin/mock-data";