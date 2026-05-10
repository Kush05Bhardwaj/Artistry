"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, Wand2, ShoppingBag, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Upload Your Room",
    description: "Take a photo of any room in your home and upload it to our platform.",
    icon: Upload,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    features: ["Any room type", "HD quality"],
  },
  {
    number: "02",
    title: "AI Generates Designs",
    description: "Our AI creates stunning redesign concepts in seconds.",
    icon: Wand2,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    features: ["100+ styles", "Instant results"],
  },
  {
    number: "03",
    title: "Shop & Transform",
    description: "Browse curated furniture that matches your new design.",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    features: ["Curated products", "One-click buy"],
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Transform in Three Steps
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From photo to dream room in under 2 minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="bg-background rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
            >
              {/* Step Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-border/50">
                  <span className="text-sm font-bold text-primary">{step.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {step.features.map((feature) => (
                    <span key={feature} className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-emerald-500" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button size="lg" className="rounded-lg" asChild>
            <Link href="/design">
              Start Your Transformation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}