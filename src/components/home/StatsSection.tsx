"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Sparkles, Palette, Users, Heart, TrendingUp } from "lucide-react";

const stats = [
  { label: "Rooms Redesigned", value: "50K+", icon: Globe },
  { label: "AI Generations", value: "1M+", icon: Sparkles },
  { label: "Products Matched", value: "100K+", icon: Palette },
  { label: "Happy Users", value: "15K+", icon: Users },
  { label: "Satisfaction Rate", value: "95%", icon: Heart },
  { label: "Design Styles", value: "50+", icon: TrendingUp },
];

export function StatsSection() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Numbers That Matter
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join a growing community of homeowners transforming their spaces with AI.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust Bar */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
          <span>Trusted by homeowners across India</span>
          <div className="flex items-center gap-2">
            {["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"].map((city) => (
              <span key={city} className="px-2 py-0.5 rounded-full bg-muted/50 text-xs">{city}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}