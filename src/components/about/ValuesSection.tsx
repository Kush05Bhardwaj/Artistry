"use client";

import React from "react";
import { motion } from "framer-motion";
import { Accessibility, Palette, Sparkles, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Accessibility,
    title: "Accessibility",
    description: "Design tools and inspiration available to everyone, regardless of budget or experience.",
  },
  {
    icon: Palette,
    title: "Creativity",
    description: "Empowering self-expression through intelligent design suggestions and visual tools.",
  },
  {
    icon: Sparkles,
    title: "Simplicity",
    description: "Complex design made simple. Upload a photo, get stunning results.",
  },
  {
    icon: Heart,
    title: "Community",
    description: "Built for Indian homes with deep understanding of local aesthetics and needs.",
  },
];

export function ValuesSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-muted-foreground mb-4 block">What Guides Us</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Our Values
          </h2>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl border border-border/50 bg-background hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}