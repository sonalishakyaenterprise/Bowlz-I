"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/hooks/useScroll";
import { cn } from "@/lib/utils/cn";

const JOURNEY_STEPS = [
  {
    id: "farm",
    icon: "🌾",
    label: "Farm-Fresh Verified Sourcing",
    sublabel: "Certified suppliers — verified daily",
    description: "Every ingredient is sourced from a certified network of farm-fresh suppliers. Quality-checked, traceable, and meeting strict food safety standards before it ever reaches our kitchen.",
    color: "#4fa07d",
    bgColor: "bg-emerald-50",
    accent: "border-emerald-300",
    ingredients: ["🥬", "🥕", "🍅", "🌽"],
  },
  {
    id: "supplier",
    icon: "🚛",
    label: "Cold-Chain Delivery",
    sublabel: "Temperature-controlled by 6 AM",
    description: "Ingredients arrive via cold-chain logistics directly to our kitchen — maintaining freshness from source to prep with zero temperature breaks.",
    color: "#2d8c58",
    bgColor: "bg-teal-50",
    accent: "border-teal-300",
    ingredients: ["📦", "🌡️", "🚚"],
  },
  {
    id: "kitchen",
    icon: "🍳",
    label: "Our Kitchen",
    sublabel: "Prep starts at 6:30 AM",
    description: "FSSAI-certified facility. Washed, chopped, cooked, assembled. Every bowl made fresh same morning.",
    color: "#1a5c3a",
    bgColor: "bg-green-50",
    accent: "border-green-300",
    ingredients: ["🔪", "🥣", "👨‍🍳", "✨"],
  },
  {
    id: "qc",
    icon: "✅",
    label: "Quality Check",
    sublabel: "Every batch tested",
    description: "Nutrition, hygiene, taste — checked. Products that don't meet our standards don't leave the kitchen.",
    color: "#154d31",
    bgColor: "bg-lime-50",
    accent: "border-lime-300",
    ingredients: ["🧪", "📋", "🏷️"],
  },
  {
    id: "pack",
    icon: "📦",
    label: "Eco Packaging",
    sublabel: "Sealed by 8 AM",
    description: "Sustainable packaging with QR traceability. Scan to see exactly which farm your meal came from.",
    color: "#6b4f2a",
    bgColor: "bg-amber-50",
    accent: "border-amber-300",
    ingredients: ["♻️", "📱", "🏷️"],
  },
  {
    id: "machine",
    icon: "🤖",
    label: "Smart Machine",
    sublabel: "Stocked by 9 AM",
    description: "Refrigerated at 2–8°C. Fresh inventory loads in daily. Yesterday's stock never rolls over.",
    color: "#0d0d0d",
    bgColor: "bg-gray-50",
    accent: "border-gray-300",
    ingredients: ["❄️", "⚡", "📡"],
  },
  {
    id: "you",
    icon: "🙋",
    label: "You",
    sublabel: "Ready when you are",
    description: "Scan QR. Choose your meal. Pick it up in under 60 seconds. That's healthy food, made easy.",
    color: "#2d8c58",
    bgColor: "bg-forest-50",
    accent: "border-forest-300",
    ingredients: ["📲", "🥗", "😊"],
  },
];

function JourneyStep({
  step,
  index,
  activeStep,
}: {
  step: (typeof JOURNEY_STEPS)[0];
  index: number;
  activeStep: number;
}) {
  const isActive = index <= activeStep;
  const isCurrent = index === activeStep;

  return (
    <div
      className={cn(
        "relative flex gap-5 transition-all duration-500",
        isActive ? "opacity-100" : "opacity-30"
      )}
    >
      {/* Connector line */}
      {index < JOURNEY_STEPS.length - 1 && (
        <div className="absolute left-6 top-14 w-0.5 h-[calc(100%+1rem)] -z-10">
          <div
            className={cn(
              "w-full transition-all duration-700 bg-forest-500",
              isActive && index < activeStep ? "h-full" : "h-0"
            )}
            style={{ transitionDelay: `${index * 150}ms` }}
          />
          <div className="w-full h-full bg-gray-200 absolute top-0" style={{ zIndex: -1 }} />
        </div>
      )}

      {/* Icon bubble */}
      <div
        className={cn(
          "flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 shadow-sm",
          isCurrent
            ? "scale-110 shadow-lg ring-2 ring-forest-500/30"
            : isActive
            ? "scale-100"
            : "scale-90 grayscale",
          step.bgColor
        )}
      >
        {step.icon}
      </div>

      {/* Content */}
      <div className="pb-8 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="font-display font-bold text-[#0d0d0d] text-lg">{step.label}</h3>
          {isCurrent && (
            <span className="text-[10px] font-bold tracking-widest uppercase text-forest-600 bg-forest-600/10 px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </div>
        <p className="text-xs font-medium tracking-wide text-forest-500 uppercase mb-2">{step.sublabel}</p>
        <p className="text-sm text-gray-500 leading-relaxed max-w-sm">{step.description}</p>
        {isActive && (
          <div className="flex gap-2 mt-3">
            {step.ingredients.map((ing) => (
              <span key={ing} className="text-xl" aria-hidden>
                {ing}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { ref: sectionRef, isInView } = useInView(0.05);
  const [activeStep, setActiveStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;

      // How far we've scrolled through the journey container
      const scrolled = Math.max(0, windowH * 0.6 - rect.top);
      const stepHeight = rect.height / JOURNEY_STEPS.length;
      const step = Math.min(Math.floor(scrolled / stepHeight), JOURNEY_STEPS.length - 1);
      setActiveStep(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#f5f0e8] py-24 relative overflow-hidden"
    >
      {/* BG accent */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-forest-600/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={cn(
            "max-w-2xl mb-20 reveal-up",
            isInView && "in-view"
          )}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-forest-600" />
            <span className="text-xs font-semibold tracking-[0.16em] uppercase text-forest-600">
              How It Works
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-[#0d0d0d] leading-tight mb-5"
            style={{ letterSpacing: "-0.03em" }}>
            From farm to your<br />
            <em className="text-forest-600">hands — every day.</em>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            We rotate inventory every single day. Not because we have to —
            because fresh food cannot be stockpiled. Watch how a morning at
            Bowlz-I works.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT: Journey steps */}
          <div ref={containerRef} className="relative">
            {JOURNEY_STEPS.map((step, i) => (
              <JourneyStep
                key={step.id}
                step={step}
                index={i}
                activeStep={activeStep}
              />
            ))}
          </div>

          {/* RIGHT: What Makes Us Different */}
          <div className="lg:sticky lg:top-24 space-y-4">

            {/* Section header */}
            <div className="mb-2">
              <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-forest-600 mb-1">What makes us different</div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Not just another healthy food brand. Here's what we actually do differently.
              </p>
            </div>

            {/* Differentiator cards */}
            {[
              {
                icon: "🌱",
                title: "Zero rollover. Full stop.",
                body: "Every unsold item is composted at end of day. Yesterday's food never sees tomorrow's machine. You always get today's batch — nothing older.",
                tag: "Freshness"
              },
              {
                icon: "🥬",
                title: "New ways to eat your vegetables",
                body: "Zoodles (spiralised carrot & zucchini). Rainbow bowls with beetroot microgreens. Kale massaged in lemon. We make vegetables genuinely interesting — not just a side thought.",
                tag: "Innovation"
              },
              {
                icon: "📏",
                title: "Portions that are actually right",
                body: "Every bowl is measured by a nutritionist — 750ml, built around your macro needs. Not too little that you're hungry in an hour. Not so much it undoes your goals.",
                tag: "Precision"
              },
              {
                icon: "🔬",
                title: "Nutritionist-reviewed, not marketing-approved",
                body: "Every product earns its place based on macro balance, micro-nutrient density, and functional benefit. If it doesn't help you, it's not on our menu.",
                tag: "Science"
              },
              {
                icon: "🌍",
                title: "Global wellness, local machine",
                body: "Ceremonial matcha from Japan. Açaí from Brazil. Yerba mate from Argentina. We bring the world's most powerful wellness traditions to the machine around the corner.",
                tag: "Discovery"
              },
              {
                icon: "🔄",
                title: "Daily rotating menu — by design",
                body: "The menu isn't fixed because nutrition shouldn't be boring. New items rotate in weekly. Seasonal produce drives what's available. Your body gets variety. Your palate stays curious.",
                tag: "Variety"
              },
            ].map((d) => (
              <div
                key={d.title}
                className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-start hover:border-forest-600/20 hover:shadow-sm transition-all duration-200 group"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{d.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <div className="font-semibold text-[#0d0d0d] text-sm">{d.title}</div>
                    <span className="text-[9px] font-bold tracking-widest uppercase text-forest-600 bg-forest-600/8 px-2 py-0.5 rounded-full flex-shrink-0">{d.tag}</span>
                  </div>
                  <div className="text-xs text-gray-400 leading-relaxed">{d.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
