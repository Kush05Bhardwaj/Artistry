"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Check, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  { name: "Priya Sharma", location: "Pune, Maharashtra", avatar: "PS", rating: 5, text: "Artistry AI helped me visualize my dream living room! The Scandinavian style redesign was exactly what I was looking for.", roomImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80", style: "Scandinavian", beforeImage: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=200&q=80" },
  { name: "Amit Kumar", location: "Jaipur, Rajasthan", avatar: "AK", rating: 5, text: "I was skeptical at first, but the results blew me away. My small apartment feels spacious and modern now.", roomImage: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80", style: "Modern", beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80" },
  { name: "Sunita Devi", location: "Lucknow, UP", avatar: "SD", rating: 5, text: "On a tight budget but wanted a beautiful kitchen. Artistry AI delivered beyond expectations.", roomImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&q=80", style: "Minimal", beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80" },
  { name: "Rahul Mehta", location: "Mumbai, Maharashtra", avatar: "RM", rating: 5, text: "The before/after feature is incredible. Game changer for home design!", roomImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80", style: "Bohemian", beforeImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=200&q=80" },
];

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            Real Stories, Real Homes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Loved by Homeowners
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join thousands of happy homeowners who transformed their spaces.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-muted/20 rounded-2xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left - Quote & Info */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-base leading-relaxed mb-4">"{active.text}"</p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
                    {active.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">{active.name}</h4>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs">
                        <Check className="w-3 h-3" /> Verified
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {active.location}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Redesigned in:</span>
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{active.style}</span>
                </div>
              </div>

              {/* Right - Room Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={active.roomImage} alt={active.name} fill className="object-cover" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-black/60 backdrop-blur-xl rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-9 rounded overflow-hidden">
                      <Image src={active.beforeImage} alt="Before" fill className="object-cover" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/70 flex-1" />
                    <span className="text-white text-xs font-medium">AI Redesigned</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)} className="w-9 h-9 rounded-full bg-background border shadow flex items-center justify-center hover:bg-muted transition-colors">
                <span className="text-xs">‹</span>
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveIndex(i)} className={cn("h-2 rounded-full transition-all", activeIndex === i ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30")} />
                ))}
              </div>
              <button onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)} className="w-9 h-9 rounded-full bg-background border shadow flex items-center justify-center hover:bg-muted transition-colors">
                <span className="text-xs">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}