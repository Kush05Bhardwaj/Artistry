"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inspirations = [
  { id: 1, title: "Modern Living Room", style: "Modern", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80", likes: 234 },
  { id: 2, title: "Scandi Bedroom", style: "Scandinavian", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80", likes: 189 },
  { id: 3, title: "Luxury Kitchen", style: "Luxury", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80", likes: 312 },
  { id: 4, title: "Boho Living", style: "Bohemian", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80", likes: 156 },
  { id: 5, title: "Industrial Office", style: "Industrial", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", likes: 98 },
  { id: 6, title: "Japandi Studio", style: "Japandi", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", likes: 267 },
  { id: 7, title: "Minimal Bedroom", style: "Minimal", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80", likes: 145 },
  { id: 8, title: "Dark Study", style: "Dark Academia", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80", likes: 178 },
];

const categories = ["All", "Modern", "Scandinavian", "Minimal", "Luxury", "Bohemian"];

export function InspirationGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? inspirations : inspirations.filter((i) => i.style === activeCategory);

  return (
    <section id="inspirations" className="py-16 bg-gradient-to-b from-muted/20 to-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            Get Inspired
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Explore Design Inspirations
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Browse stunning room transformations and discover your next dream design.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn("px-3 py-1.5 rounded-full text-sm font-medium transition-all", activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((item, index) => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden cursor-pointer" onClick={() => {}}>
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={300}
                className={cn("w-full object-cover transition-transform duration-300", index % 3 === 0 ? "aspect-[3/4]" : "aspect-square", "group-hover:scale-105")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 flex flex-col justify-end p-3">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-white text-xs mb-1 w-fit">{item.style}</span>
                  <h3 className="text-white font-medium text-sm">{item.title}</h3>
                  <span className="flex items-center gap-1 text-white/70 text-xs mt-1"><Heart className="w-3 h-3" />{item.likes}</span>
                </div>
              </div>
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button size="lg" className="rounded-lg" asChild>
            <span className="cursor-pointer">Create Your Own Design</span>
          </Button>
        </div>
      </div>
    </section>
  );
}