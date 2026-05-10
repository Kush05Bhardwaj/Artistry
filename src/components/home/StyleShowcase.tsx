"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = [
  { id: "modern", label: "Modern", gradient: "from-blue-500 to-cyan-400", preview: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80", popularity: 95 },
  { id: "scandinavian", label: "Scandinavian", gradient: "from-blue-200 to-white", preview: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80", popularity: 88 },
  { id: "japandi", label: "Japandi", gradient: "from-amber-200 to-stone-300", preview: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", popularity: 82 },
  { id: "luxury", label: "Luxury", gradient: "from-yellow-600 to-amber-400", preview: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80", popularity: 75 },
  { id: "minimal", label: "Minimal", gradient: "from-gray-400 to-gray-200", preview: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80", popularity: 90 },
  { id: "boho", label: "Bohemian", gradient: "from-orange-400 to-rose-300", preview: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80", popularity: 78 },
  { id: "industrial", label: "Industrial", gradient: "from-stone-600 to-stone-400", preview: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", popularity: 70 },
  { id: "dark", label: "Dark Academia", gradient: "from-stone-800 to-stone-600", preview: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80", popularity: 65 },
];

export function StyleShowcase() {
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            Endless Possibilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Explore Design Styles
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose from 8+ unique design styles powered by AI.
          </p>
        </div>

        {/* Style Grid - 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {styles.map((style, index) => (
            <div
              key={style.id}
              className={cn(
                "relative rounded-xl overflow-hidden cursor-pointer transition-transform duration-200",
                "hover:scale-[1.02] hover:z-10",
                hoveredStyle === style.id && "scale-[1.02] z-10"
              )}
              onMouseEnter={() => setHoveredStyle(style.id)}
              onMouseLeave={() => setHoveredStyle(null)}
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={style.preview}
                  alt={style.label}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-300",
                    hoveredStyle === style.id && "scale-105"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-3">
                  <span className="inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-black/40 text-white text-xs mb-1">
                    <Sparkles className="w-3 h-3" />
                    {style.popularity}%
                  </span>
                  <h3 className="text-white font-semibold text-sm">{style.label}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}