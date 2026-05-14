"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Upload, ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-amber-50/10 to-rose-50/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight">
            Ready to Transform
            <span className="block bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
              Your Space?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Join 15,000+ homeowners who already transformed their rooms with our AI.
            <span className="block mt-1 font-medium text-foreground">No design skills needed.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              size="lg"
              className="h-12 px-7 text-base bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all rounded-lg"
              asChild
            >
              <Link href="/design">
                <Sparkles className="w-4 h-4 mr-2" />
                Start Free Redesign
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-7 text-base rounded-lg hover:bg-muted/40 transition-all"
              asChild
            >
              <Link href="/design">
                <Upload className="w-4 h-4 mr-2" />
                Upload Your Room
              </Link>
            </Button>
          </div>

          {/* Trust Features */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> No credit card required</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Ready in 12s</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}