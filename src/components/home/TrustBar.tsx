"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Sparkles, Heart, Globe } from "lucide-react";

const stats = [
  { label: "Rooms Redesigned", value: "15K+", icon: Globe },
  { label: "Happy Users", value: "5K+", icon: Users },
  { label: "Satisfaction Rate", value: "92%", icon: Heart },
  { label: "AI Generations", value: "50K+", icon: Sparkles },
];

export function TrustBar() {
  return (
    <section className="py-12 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-3">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}