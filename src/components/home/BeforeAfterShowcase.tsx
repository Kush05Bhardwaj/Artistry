"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const transformations = [
  { before: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80", after: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80", style: "Modern Scandinavian", room: "Living Room" },
  { before: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80", after: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80", style: "Japandi", room: "Master Bedroom" },
  { before: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", after: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", style: "Luxury", room: "Kitchen" },
];

export function BeforeAfterShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const current = transformations[activeIndex];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSliderPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            See the Magic
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Before & After Transformations
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Drag to compare the original with the redesigned space.
          </p>
        </div>

        {/* Main Showcase */}
        <div className="max-w-4xl mx-auto">
          {/* Image Slider */}
          <div
            ref={containerRef}
            className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none"
            onMouseDown={(e) => { isDragging.current = true; handleMove(e.clientX); }}
            onMouseMove={(e) => { if (isDragging.current) handleMove(e.clientX); }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchStart={(e) => handleMove(e.touches[0].clientX)}
          >
            {/* Before */}
            <div className="absolute inset-0">
              <Image src={current.before} alt="Before" fill className="object-cover" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 text-white text-sm font-medium backdrop-blur-sm">Before</span>
            </div>

            {/* After */}
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
              <Image src={current.after} alt="After" fill className="object-cover" />
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium backdrop-blur-sm">After</span>
            </div>

            {/* Slider Handle */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10" style={{ left: `${sliderPosition}%` }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-foreground rotate-90" />
              </div>
            </div>
          </div>

          {/* Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 p-3 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{current.style}</span>
              <span className="text-sm text-muted-foreground">{current.room}</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-2">
              <button onClick={() => setActiveIndex((prev) => (prev - 1 + transformations.length) % transformations.length)} className="w-8 h-8 rounded-full bg-background border shadow flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1.5 px-2">
                {transformations.map((_, i) => (
                  <button key={i} onClick={() => setActiveIndex(i)} className={cn("h-2 rounded-full transition-all", activeIndex === i ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30")} />
                ))}
              </div>
              <button onClick={() => setActiveIndex((prev) => (prev + 1) % transformations.length)} className="w-8 h-8 rounded-full bg-background border shadow flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}