"use client";

import React, { useState } from "react";
import { useInView } from "@/lib/hooks/useScroll";
import { cn } from "@/lib/utils/cn";

const SPECS = [
  { icon: "🖥️", label: "Display",       val: "22\" Touchscreen",        detail: "Full-colour touchscreen with product imagery, UPI QR, and loyalty integration." },
  { icon: "📦", label: "Capacity",      val: "350+ Products",           detail: "42 SKU varieties across 6 trays. 300–350 pcs depending on product dimensions." },
  { icon: "🔼", label: "Delivery",      val: "Elevator Lift System",    detail: "Smooth descent — no dropping, no damage. Perfect for sealed bowls and juice bottles." },
  { icon: "🌡️", label: "Temperature",   val: "4°C – 25°C",              detail: "Adjustable per shelf. Refrigerated mode at 4°C for fresh food. Ambient up to 25°C for snacks." },
  { icon: "⚡", label: "Power",         val: "422W Refrigerated",       detail: "422W in refrigerated mode, just 24W in normal mode. Standard 220–240V outlet." },
  { icon: "⚖️", label: "Weight",        val: "330 kg",                  detail: "Stable floor-standing unit. Suitable for any high-footfall commercial space." },
  { icon: "💳", label: "Payments",      val: "UPI + Cards + NFC",       detail: "GPay, PhonePe, Paytm, RuPay, Visa, Mastercard, Tap to Pay, Apple Pay, Sodexo, RFID." },
  { icon: "🔄", label: "Multi-Vend",    val: "Up to 5 at once",         detail: "Customers can buy a bowl + juice + shot + dressing in one transaction. Boosts basket size by ~25%." },
  { icon: "💰", label: "Funds",         val: "Instant Transfer",        detail: "Money hits your bank account the moment a sale is made. No settlement delays." },
  { icon: "↩️", label: "Refunds",       val: "Automatic",               detail: "If a product fails to dispense, the customer gets an automatic refund. Zero friction." },
  { icon: "📡", label: "Monitoring",    val: "Live IoT Dashboard",      detail: "Real-time inventory, temperature alerts, sales analytics, and refiller tracking via Wendor SaaS." },
  { icon: "🎨", label: "Branding",      val: "Full Custom Wrap",        detail: "The entire machine exterior is wrapped in Bowlz-I branding — our identity, our machine." },
];

const DIMENSIONS = [
  { axis: "Height", val: "1945mm", imp: "6.38 ft" },
  { axis: "Width",  val: "1294mm", imp: "4.25 ft" },
  { axis: "Depth",  val: "870mm",  imp: "2.85 ft" },
];

const PARTNER_LOGOS = [
  "Tata Motors","HCLTech","Optum","Apollo Hospitals","Fortis",
  "The Oberoi","Marriott","IRCTC","Amity University","NITI Aayog",
  "Unilever","Amul",
];

export default function MachineSection() {
  const { ref, isInView } = useInView(0.08);
  const [activeSpec, setActiveSpec] = useState<number | null>(null);
  const [hoveredShelf, setHoveredShelf] = useState<number | null>(null);

  const SHELVES = [
    { label: "Signature Bowls",      items: ["🥗","🥗","🌾","💪","🌈"], color: "rgba(34,197,94,0.12)"  },
    { label: "Fruit Boxes",          items: ["🍓","🍍","🫐","🍉","🍎"], color: "rgba(239,68,68,0.1)"   },
    { label: "Cold-Pressed Juices",  items: ["🥤","🧃","🥤","🧃","🥤"], color: "rgba(249,115,22,0.1)"  },
    { label: "Shots & Wellness",     items: ["⚡","🌿","⚡","💚","🌾"], color: "rgba(234,179,8,0.12)"  },
    { label: "Snacks & Dressings",   items: ["🍿","🫙","🥜","🫙","🌻"], color: "rgba(139,92,246,0.1)"  },
    { label: "What's New ✨",         items: ["🌈","🍵","🥣","🍣"],      color: "rgba(236,72,153,0.1)"  },
  ];

  return (
    <section id="machine-sec" className="bg-[#f5f0e8] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={ref} className={cn("max-w-2xl mb-16 opacity-0 translate-y-6 transition-all duration-700", isInView && "opacity-100 translate-y-0")}>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-forest-600" />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-forest-600">The Machine</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-[#0d0d0d] leading-tight mb-4" style={{ letterSpacing:"-0.03em" }}>
            Wendor Nova.<br/>
            <em className="text-forest-600">Built for fresh food at scale.</em>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-3">
            Elevator lift system. Adjustable refrigeration. IoT-monitored. Multi-vend of up to 5 items.
            Custom-wrapped in Bowlz-I branding. Every spec chosen for fresh food, not packaged snacks.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-forest-600 bg-forest-600/8 border border-forest-600/15 px-3 py-1.5 rounded-full">
            <span>✅</span> Multi-vend confirmed — buy a bowl + juice + dressing in one scan
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — Machine visual */}
          <div className="flex flex-col items-center">

            {/* Machine chassis */}
            <div className="relative mx-auto" style={{ maxWidth: 300 }}>
              {/* Branding wrap hint */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-forest-600 text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap">
                Custom Bowlz-I Branding Wrap
              </div>

              {/* Header */}
              <div className="bg-forest-600 rounded-t-2xl px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="font-display text-white font-black text-lg tracking-tight">Bowlz-I</div>
                  <div className="text-[9px] text-white/60 uppercase tracking-widest">Wendor Nova · Powered by Elanpro</div>
                </div>
                <div className="flex gap-1.5">
                  {["Fresh","Daily","IoT"].map(b=>(
                    <span key={b} className="text-[8px] font-bold text-white/80 bg-white/15 px-1.5 py-0.5 rounded">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="bg-gradient-to-b from-[#1e1208] to-[#0f0a04] p-3 shadow-2xl">

                {/* Glass panel */}
                <div className="bg-black/25 border border-white/8 rounded-lg p-2 mb-3">
                  {SHELVES.map((shelf, i) => (
                    <div
                      key={shelf.label}
                      className={cn(
                        "relative flex items-center gap-1.5 px-2 py-2 rounded-lg cursor-pointer transition-all duration-200 mb-0.5",
                        hoveredShelf === i ? "bg-white/12" : "hover:bg-white/6"
                      )}
                      onMouseEnter={() => setHoveredShelf(i)}
                      onMouseLeave={() => setHoveredShelf(null)}
                      style={{ background: hoveredShelf === i ? shelf.color : undefined }}
                    >
                      <div className="flex gap-1.5 flex-1">
                        {shelf.items.map((it, j) => (
                          <span key={j} className="text-base leading-none"
                            style={{ filter:"drop-shadow(0 1px 2px rgba(0,0,0,0.4))" }}>
                            {it}
                          </span>
                        ))}
                      </div>
                      {hoveredShelf === i && (
                        <span className="text-[8px] font-bold text-white/70 tracking-wider uppercase ml-auto whitespace-nowrap">
                          {shelf.label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Screen */}
                <div className="bg-[#0a1f0f] border border-forest-600/30 rounded-lg p-3 mb-3 text-center">
                  <div className="text-[8px] font-medium text-forest-400/60 tracking-widest uppercase mb-0.5">Welcome to</div>
                  <div className="font-display text-forest-400 text-sm font-bold">Bowlz-I</div>
                  <div className="text-[8px] text-forest-400/40 uppercase tracking-widest mt-0.5 mb-2">Scan & Choose</div>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {["GPay","PhonePe","UPI","Card","NFC"].map(p=>(
                      <span key={p} className="text-[7px] font-bold bg-forest-600/25 text-forest-300 px-1.5 py-0.5 rounded">{p}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/4 border border-white/6 rounded-lg p-2 text-center">
                    <div className="text-[8px] font-bold uppercase tracking-widest text-white/35 mb-1">Multi-Vend</div>
                    <div className="text-xs">🔄 Up to 5</div>
                  </div>
                  <div className="bg-white/4 border border-white/6 rounded-lg p-2 text-center">
                    <div className="text-[8px] font-bold uppercase tracking-widest text-white/35 mb-1">Pick Up</div>
                    <div className="text-xs">📦 Elevator</div>
                  </div>
                </div>
              </div>

              {/* Base */}
              <div className="bg-[#3d2d12] rounded-b-2xl p-2 text-center">
                <div className="text-[8px] text-amber-200/35 uppercase tracking-widest">Wendor Nova · wendor.ai</div>
              </div>

              {/* Glow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-5 bg-forest-500/20 blur-2xl rounded-full" />
            </div>

            {/* Dimensions */}
            <div className="flex gap-8 mt-6 justify-center">
              {DIMENSIONS.map(d => (
                <div key={d.axis} className="text-center">
                  <div className="text-sm font-bold text-[#0d0d0d]">{d.val}</div>
                  <div className="text-[10px] text-gray-400">{d.imp}</div>
                  <div className="text-[9px] font-bold tracking-widest uppercase text-forest-600 mt-0.5">{d.axis}</div>
                </div>
              ))}
            </div>

            {/* Model badge */}
            <div className="mt-4 text-center">
              <span className="font-mono text-[10px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                Wendor Nova · Elevator VM · wendor.ai
              </span>
            </div>

            {/* Trusted by */}
            <div className="mt-8 w-full">
              <div className="text-[9px] font-bold tracking-widest uppercase text-gray-300 text-center mb-3">
                Wendor machines trusted by
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {PARTNER_LOGOS.map(p => (
                  <span key={p} className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Specs + Install card */}
          <div>
            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {SPECS.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActiveSpec(activeSpec === i ? null : i)}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition-all duration-200 hover:shadow-md font-[inherit]",
                    activeSpec === i
                      ? "bg-forest-600 border-forest-500 shadow-lg shadow-forest-600/15"
                      : "bg-white border-gray-100 hover:border-forest-600/20"
                  )}
                >
                  <div className="text-xl mb-2">{s.icon}</div>
                  <div className={cn("text-[9px] font-bold uppercase tracking-widest mb-0.5", activeSpec===i?"text-white/55":"text-gray-400")}>{s.label}</div>
                  <div className={cn("font-display font-bold text-sm leading-tight", activeSpec===i?"text-white":"text-[#0d0d0d]")}>{s.val}</div>
                  {activeSpec === i && (
                    <div className="text-white/65 text-[11px] mt-2 leading-relaxed">{s.detail}</div>
                  )}
                </button>
              ))}
            </div>

            {/* Install card */}
            <div className="bg-[#0d0d0d] rounded-2xl p-6 text-white">
              <div className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-2">Install at your space</div>
              <h3 className="font-display text-xl font-bold mb-2">Zero capex. Full service.</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                We install, brand, stock, and restock daily. You provide the wall space and a 220V outlet.
                The Wendor dashboard gives us live visibility so we know what's selling before we arrive.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { v:"₹0",    l:"Setup cost for you" },
                  { v:"Daily", l:"Restocking by 9 AM"  },
                  { v:"Live",  l:"IoT monitoring"      },
                ].map(s => (
                  <div key={s.l} className="text-center bg-white/5 rounded-xl p-2.5">
                    <div className="font-display text-lg font-black text-forest-400">{s.v}</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-wide mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Multi-vend callout */}
              <div className="bg-forest-600/15 border border-forest-600/25 rounded-xl p-3 mb-4">
                <div className="text-[10px] font-bold text-forest-400 uppercase tracking-wider mb-1">🛒 Multi-Vend Enabled</div>
                <div className="text-xs text-gray-400 leading-relaxed">
                  Your customers can buy a Signature Bowl + Cold-Pressed Juice + Immunity Shot + Dressing
                  in a single transaction. Increases average spend per visit by ~25%.
                </div>
              </div>

              <button
                onClick={() => document.getElementById("contact-sec")?.scrollIntoView({ behavior:"smooth" })}
                className="block w-full text-center bg-forest-600 hover:bg-forest-500 text-white py-3 rounded-full font-semibold text-sm tracking-wide transition-all font-[inherit]"
              >
                Request a Machine →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
