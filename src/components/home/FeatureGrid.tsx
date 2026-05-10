"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Palette, Sparkles, Lightbulb, ShoppingBag, TrendingUp, Camera, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  { title: "AI Room Analysis", description: "Analyzes your room layout, lighting, and furniture placement.", icon: Camera, gradient: "from-blue-500 to-cyan-400", highlight: "Instant 3D mapping" },
  { title: "Smart Style Matching", description: "Matches your preferences with design elements.", icon: Brain, gradient: "from-purple-500 to-pink-400", highlight: "92% accuracy" },
  { title: "Personalized Recommendations", description: "Furniture and decor tailored to your taste.", icon: Lightbulb, gradient: "from-amber-500 to-orange-400", highlight: "1000+ products" },
  { title: "Lighting Optimization", description: "Optimal furniture placement and colors.", icon: Sparkles, gradient: "from-yellow-400 to-amber-300", highlight: "Professional grade" },
  { title: "Budget Optimization", description: "Get the best look for your budget.", icon: DollarSign, gradient: "from-emerald-500 to-teal-400", highlight: "Save up to 40%" },
  { title: "One-Click Shopping", description: "Buy recommended products from trusted brands.", icon: ShoppingBag, gradient: "from-rose-500 to-red-400", highlight: "500+ brands" },
  { title: "Trend Analysis", description: "Latest interior design trends for Indian homes.", icon: TrendingUp, gradient: "from-indigo-500 to-violet-400", highlight: "Weekly updates" },
  { title: "Color Palette Generation", description: "Color schemes that complement your decor.", icon: Palette, gradient: "from-pink-500 to-rose-400", highlight: "Perfect harmony" },
];

export function FeatureGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            Powerful AI Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Built for the Modern Homeowner
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our AI combines cutting-edge technology with deep understanding of Indian home aesthetics.
          </p>
        </div>

        {/* Features Grid - Simple 2x4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-5 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className={cn("w-10 h-10 rounded-lg bg-gradient-to-br mb-4 flex items-center justify-center", feature.gradient)}>
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 text-xs font-medium">
                <TrendingUp className="w-3 h-3 text-primary" />
                {feature.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}