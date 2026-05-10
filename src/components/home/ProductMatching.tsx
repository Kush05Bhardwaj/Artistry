"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Check, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { name: "Modern Velvet Sofa", brand: "Urban Ladder", price: "₹45,999", match: 94, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", tag: "Best Match" },
  { name: "Scandi Coffee Table", brand: "Fabindia", price: "₹12,499", match: 89, image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&q=80", tag: "Popular" },
  { name: "Floor Lamp Nordic", brand: "IKEA", price: "₹8,999", match: 86, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80", tag: null },
  { name: "Rug Collection", brand: "Fabindia", price: "₹6,999", match: 91, image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=400&q=80", tag: "Trending" },
];

export function ProductMatching() {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
              Shop the Look
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
              Curated Product Matches
            </h2>
            <p className="text-muted-foreground">AI-powered recommendations perfectly matched to your space.</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <span className="cursor-pointer">View All <ArrowRight className="w-4 h-4 inline ml-1" /></span>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.name} className="group bg-background rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-md transition-all">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-medium">
                  {product.match}% Match
                </div>
                {product.tag && (
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {product.tag}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3">
                <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                <h3 className="font-medium text-sm mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{product.price}</span>
                </div>
                <Button size="sm" className="w-full mt-2 text-xs h-8">
                  <ShoppingBag className="w-3 h-3 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Bar */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 p-4 bg-muted/30 rounded-xl text-sm">
          {["500+ Trusted Brands", "Free Delivery Above ₹999", "30-Day Returns", "Secure Payment"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-primary" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}