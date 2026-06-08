"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

const FOOTER_LINKS = {
  Product: [
    { label: "Signature Bowls", href: "#products" },
    { label: "Juices & Shots", href: "#products" },
    { label: "Healthy Snacks", href: "#products" },
    { label: "World of Wellness", href: "#products" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#contact" },
  ],
  Partners: [
    { label: "Install a Machine", href: "#contact" },
    { label: "Locations", href: "#locations" },
    { label: "Corporate Wellness", href: "#contact" },
    { label: "Become a Supplier", href: "#contact" },
  ],
  Help: [
    { label: "FAQ", href: "/faq" },
    { label: "Give Feedback", href: "/feedback" },
    { label: "Partner Support", href: "/feedback?type=partner" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

function scrollTo(href: string) {
  if (href.startsWith("#")) {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = href;
  }
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <defs>
                  <radialGradient id="fg1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#2d8c58" />
                    <stop offset="100%" stopColor="#1a5c3a" />
                  </radialGradient>
                  <radialGradient id="fg2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#6b4f2a" />
                    <stop offset="100%" stopColor="#3d2d12" />
                  </radialGradient>
                </defs>
                <circle cx="18" cy="18" r="17.5" fill="url(#fg2)" />
                <circle cx="18" cy="18" r="12" fill="url(#fg1)" />
                <circle cx="18" cy="18" r="8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <path d="M18 11 C18 11,22 14,22 18 C22 22,18 24,18 24 C18 24,14 22,14 18 C14 14,18 11,18 11Z" fill="white" opacity="0.9" />
                <line x1="18" y1="24" x2="18" y2="27" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
              </svg>
              <span className="font-display text-white text-xl font-black tracking-tight">Bowlz-I</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xs">
              India&apos;s healthy food infrastructure company. Making nutritious meals
              as accessible as bottled water — one smart machine at a time.
            </p>
            <div className="text-xs text-gray-600 font-medium">
              Founded by{" "}
              <span className="text-forest-400">Sonali Shakya</span>
            </div>
            <div className="flex gap-3 mt-5">
              {["🐦", "📸", "💼", "📺"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-sm hover:bg-forest-600/20 hover:border-forest-600/30 transition-all"
                  aria-label={["Twitter", "Instagram", "LinkedIn", "YouTube"][i]}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-[10px] font-bold tracking-[0.16em] uppercase text-gray-500 mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5 list-none">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-gray-500 hover:text-gray-200 transition-colors bg-transparent border-none cursor-pointer p-0 font-[inherit]"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
          <div>© {currentYear} Bowlz-I. All rights reserved. Made with 🌱 in India.</div>
          <div className="flex gap-4">
            <span>FSSAI Licensed</span>
            <span>·</span>
            <span>ISO 22000 Compliant Kitchen</span>
            <span>·</span>
            <span className="text-forest-600">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
