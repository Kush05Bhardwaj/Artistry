"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Star, Check, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingCards = [
  { label: "Scandinavian", sublabel: "Style", color: "bg-emerald-500", delay: 0.2 },
  { label: "92% Match", sublabel: "AI Accuracy", color: "bg-blue-500", delay: 0.4 },
  { label: "Budget", sublabel: "Under ₹50K", color: "bg-amber-500", delay: 0.6 },
  { label: "12s", sublabel: "Generation", color: "bg-purple-500", delay: 0.8 },
];

export function HeroSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, x)));
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Simplified Background - No heavy blurs */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-orange-50/20 to-rose-50/30" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-tl from-amber-100/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-primary">Powered by AI</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Transform Any Room with{" "}
              <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                AI
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-foreground/70 max-w-lg leading-relaxed"
            >
              Upload a photo of your space and generate stunning interior redesigns in seconds.
              <span className="block mt-1 font-medium text-foreground">No design skills required.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="h-12 px-6 text-base bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all rounded-lg"
                asChild
              >
                <Link href="/design">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Try AI Redesign
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 text-base rounded-lg hover:bg-muted/40 transition-all"
                asChild
              >
                <Link href="/#inspirations">
                  Explore Inspirations
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 pt-2"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 border-2 border-background" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">5K+</span> users
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-1">4.9</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual - Before/After Slider */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div
              ref={containerRef}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl cursor-col-resize"
              onMouseDown={(e) => { isDragging.current = true; handleMove(e.clientX); }}
              onMouseMove={(e) => { if (isDragging.current) handleMove(e.clientX); }}
              onMouseUp={() => { isDragging.current = false; }}
              onMouseLeave={() => { isDragging.current = false; }}
              onTouchMove={(e) => handleMove(e.touches[0].clientX)}
              onTouchStart={(e) => handleMove(e.touches[0].clientX)}
            >
              {/* Before Image */}
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80"
                  alt="Original room"
                  fill
                  className="object-cover"
                  priority
                />
                <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/50 text-white text-xs font-medium">
                  Original
                </span>
              </div>

              {/* After Image - Clipped */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80"
                  alt="Redesigned room"
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium">
                  AI Redesigned
                </span>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-foreground rotate-90" />
                </div>
              </div>
            </div>

            {/* Floating Cards - Simplified */}
            <div className="absolute -top-4 -right-4 flex flex-col gap-2">
              <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-md p-2.5 border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium">Scandinavian</span>
                </div>
              </div>
              <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-md p-2.5 border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium">92% Match</span>
                </div>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="absolute -bottom-4 -left-4 bg-background/95 backdrop-blur-sm rounded-lg shadow-md p-2.5 border border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center">
                  <Clock className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-medium">12s generation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
        </div>
      </div>
    </section>
  );
}