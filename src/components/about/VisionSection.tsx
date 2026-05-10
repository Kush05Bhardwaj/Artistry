"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lightbulb, Globe, Sparkles } from "lucide-react";

export function VisionSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
                alt="Modern living space"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/10 to-amber-100/30 rounded-2xl -z-10" />
          </motion.div>

          {/* Right - Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-sm text-muted-foreground mb-2 block">Our Vision</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Making beautiful design accessible to all.
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                We believe that a beautiful home isn't a luxury reserved for the few. It's a space where memories are made, families grow, and dreams take shape.
              </p>
              <p>
                Our mission is to empower everyone with the tools and inspiration to create a home they love — regardless of budget or design experience.
              </p>
            </div>

            {/* Highlight boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <Globe className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-semibold mb-1">Accessible</h3>
                <p className="text-sm text-muted-foreground">Design for everyone, everywhere</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <Lightbulb className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-semibold mb-1">Creative</h3>
                <p className="text-sm text-muted-foreground">AI-powered inspiration</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <Sparkles className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-semibold mb-1">Affordable</h3>
                <p className="text-sm text-muted-foreground">Professional results, DIY cost</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}