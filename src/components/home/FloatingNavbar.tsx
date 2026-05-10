"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles, Palette, LogIn, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "AI Design", href: "/design" },
  { label: "Feedback", href: "/feedback" },
  { label: "About", href: "/about" },
];

const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];

export function FloatingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const isAdmin = session?.user?.email && adminEmails.includes(session.user.email.toLowerCase());

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-3 left-4 right-4 z-50 transition-all duration-300",
          isScrolled && "backdrop-blur-md shadow-xl border border-border/50"
        )}
      >
        <div className={cn(
          "flex items-center justify-between px-4 md:px-6 py-3 rounded-2xl bg-background/95 transition-all duration-300",
          isScrolled ? "shadow-md" : "shadow-lg border border-border/30"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Palette className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">Artistry</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/40 transition-all"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-all"
              >
                <Settings className="w-4 h-4 inline mr-1" />
                Admin
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              {session ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/account">
                      <User className="w-4 h-4 mr-1" />
                      Account
                    </Link>
                  </Button>
                  {isAdmin && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/admin">
                        <Settings className="w-4 h-4 mr-1" />
                        Admin
                      </Link>
                    </Button>
                  )}
                </>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">
                    <LogIn className="w-4 h-4 mr-1" />
                    Sign In
                  </Link>
                </Button>
              )}
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                asChild
              >
                <Link href="/design">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Start Designing
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-xl">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              {session ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Account</span>
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors text-primary"
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Admin Panel</span>
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">Sign In</span>
                </Link>
              )}
            </div>
            <div className="mt-8 pt-8 border-t space-y-3">
              <Button className="w-full" asChild>
                <Link href="/design" onClick={() => setIsMobileMenuOpen(false)}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Designing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}