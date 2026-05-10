"use client";

import React from "react";
import { motion } from "framer-motion";

export function StorySection() {
  return (
    <section className="py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm text-muted-foreground mb-4 block">The Story</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">
              The Story Behind Artistry
            </h2>
          </motion.div>

          {/* Divider */}
          <div className="w-16 h-px bg-border mx-auto mb-16" />

          {/* Story content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-muted-foreground leading-relaxed"
          >
            <p className="text-lg">
              Artistry was born from a simple belief: everyone deserves a beautiful home — not just the wealthy or the elite.
            </p>

            <p>
              We saw countless families struggling with expensive interior designers, confusing home improvement stores, and overwhelming design choices. Coming from Tier-2 and Tier-3 cities ourselves, we understood these challenges firsthand.
            </p>

            <p>
              That's why we built Artistry AI — to put creative control back into your hands. Whether you're decorating a rented room or renovating a lifelong home, our AI helps you visualize, plan, and transform your space — easily, affordably, and independently.
            </p>

            <p className="font-medium text-foreground">
              We're not just an app. We're a movement to make interior design accessible for all — starting with India's rising towns and cities.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}