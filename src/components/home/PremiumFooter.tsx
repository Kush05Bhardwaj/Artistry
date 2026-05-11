"use client";

import React from "react";
import Link from "next/link";
import { Palette, Mail, MapPin, Phone, ArrowRight, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  product: [{ label: "AI Redesign", href: "/design" }, { label: "Style Gallery", href: "/#inspirations" }, { label: "Pricing", href: "/#pricing" }, { label: "Products", href: "/products" }],
  company: [{ label: "About Us", href: "/#about" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }],
  support: [{ label: "Help Center", href: "/help" }, { label: "Contact Us", href: "/contact" }, { label: "FAQ", href: "/faq" }],
  legal: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }, { label: "Cookie Policy", href: "/cookies" }],
};

const socialLinks = [{ icon: Instagram, href: "#" }, { icon: Twitter, href: "#" }, { icon: Linkedin, href: "#" }, { icon: Youtube, href: "#" }];

export function PremiumFooter() {
  return (
    <footer className="bg-muted/30">
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Artistry</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-sm">
              Transform any room with the power of AI. Create stunning interior designs in seconds.
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="w-4 h-4 text-primary" /> <span>agaur2813@gmail.com</span></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="w-4 h-4 text-primary" /> <span>8287500899</span></div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4 text-primary" /> <span>Mumbai, Maharashtra</span></div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}><Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}><Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}><Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}><Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">© 2024 Artistry AI. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}