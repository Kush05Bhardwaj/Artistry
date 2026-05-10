"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Globe, Heart, Sparkles } from "lucide-react";

const stats = [
  { label: "AI Redesigns", value: "50K+", icon: Sparkles },
  { label: "Happy Users", value: "10K+", icon: Users },
  { label: "Satisfaction", value: "95%", icon: Heart },
  { label: "Cities Reached", value: "100+", icon: Globe },
];

export function StatsSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-muted/20 to-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <blockquote className="text-xl md:text-2xl font-medium text-foreground/80 leading-relaxed max-w-2xl mx-auto">
              "Design is not just what it looks like. Design is how it works."
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground">— Our philosophy at Artistry AI</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}