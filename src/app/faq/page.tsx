"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { Metadata } from "next";

// Can't export metadata from client component — move to a server wrapper if needed
// For now this page is fully client to enable accordion interactions

const FAQ_CATEGORIES = [
  {
    id: "freshness",
    label: "Freshness & Food",
    icon: "🥗",
    faqs: [
      {
        q: "How fresh is the food really?",
        a: "Every product is prepared the same morning it's stocked. Our kitchen team starts at 6 AM and machines are loaded by 9 AM. We have a zero-rollover policy — anything unsold at the end of the day is composted. Nothing carries over to the next day.",
      },
      {
        q: "How does the daily rotation work?",
        a: "Our menu rotates based on freshness, seasonality, and demand. The core categories (Signature Bowls, Juices, Shots, Snacks) are available daily with consistent products. The 'What's New This Week?' category changes every Monday — that's where we trial new ideas like Zoodle Bowls, soups, and sushi rolls. If the community loves something, we make it permanent.",
      },
      {
        q: "Are products suitable for specific diets — vegan, gluten-free?",
        a: "Yes — almost all of our products are vegan. Every product card on our website shows dietary tags (vegan, vegetarian, gluten-free, keto-friendly etc.). The only non-vegan items are those containing Greek yogurt (Peri Peri Yogurt dressing, Garlic Parmesan dressing) and grilled paneer (Premium Harvest Bowl). If you have severe allergies, please check the ingredient list on the packaging before consuming.",
      },
      {
        q: "What's the shelf life of products in the machine?",
        a: "Products are stocked fresh each morning and the machine is refrigerated at 2–8°C at all times. All products carry a 'best before' time printed on the label — typically the same evening. We recommend consuming them within 2 hours of purchase for best taste and nutrition.",
      },
    ],
  },
  {
    id: "machine",
    label: "Using the Machine",
    icon: "🤖",
    faqs: [
      {
        q: "How do I pay at the machine?",
        a: "The machine accepts UPI (Google Pay, PhonePe, Paytm — just scan the QR), debit and credit cards (tap or swipe), and digital wallets. Cash is not accepted. The touchscreen walks you through the payment process step by step.",
      },
      {
        q: "What if a product doesn't dispense after I pay?",
        a: "First — don't walk away. Check the collection tray at the bottom of the machine. If nothing is there and your payment was deducted, take a photo of the screen showing your transaction and email us at sonalishakyaenterprise@gmail.com with your transaction ID, machine location, and the time. We will issue a full refund or replacement within 24 hours. Alternatively, scan the QR code on the machine to reach our feedback form and flag it immediately.",
      },
      {
        q: "Can I vend multiple products in one transaction?",
        a: "Yes — the machine supports multi-vend of up to 5 products per transaction. Select all items on the touchscreen, pay once, and they are all dispensed one by one via the elevator lift system.",
      },
      {
        q: "The machine screen is blank / machine seems off. What should I do?",
        a: "The machine may be in a standby mode. Tap the screen once to wake it. If it's unresponsive, scan the QR code on the machine label and submit a 'Machine fault' report through our Partner/Location form — this alerts our ops team immediately. We remotely monitor all machines and will dispatch a technician if needed.",
      },
    ],
  },
  {
    id: "products",
    label: "Products & Dressings",
    icon: "🫙",
    faqs: [
      {
        q: "How do dressings work — do I buy them separately?",
        a: "Yes — salad dressings and fruit dressings are sold separately in 50ml portions. This is intentional: it keeps salad prices lower, reduces waste (not everyone wants dressing), and gives you full control over your meal. The exception is the Rainbow Zoodle Bowl, which comes with our Asian Soy-Sesame dressing bundled in the box. Each product on our website shows recommended dressing pairings to help you choose.",
      },
      {
        q: "Can I request a specific product?",
        a: "Absolutely. Use our feedback form (select 'Suggest something') or email sonalishakyaenterprise@gmail.com. We track all product requests and use them to plan our weekly 'What's New' rotation. If enough people want something, it goes in the machine.",
      },
      {
        q: "What is the 'What's New This Week?' category?",
        a: "It's our rotating experimental shelf — stocked every Monday with new or seasonal items we're testing. This week it includes the Rainbow Zoodle Bowl and our Lentil Vegetable Broth Soup. Some items are available immediately, some are 'coming soon' (still in kitchen testing). If you love a What's New item, tell us through feedback and we'll fast-track it to the permanent menu.",
      },
      {
        q: "Are nutrition details available?",
        a: "Yes — every product on our website has a nutrition flip card showing calories, protein, carbs, fat, and key vitamins. Printed labels on each product also carry full nutrition information and ingredient lists. If you have specific dietary or medical needs, we recommend checking the label on the physical product before consuming.",
      },
    ],
  },
  {
    id: "locations",
    label: "Locations & Access",
    icon: "📍",
    faqs: [
      {
        q: "How do I find the nearest Bowlz-I machine?",
        a: "Visit the Locations section on our website — it shows a live map of all active machines with addresses, operating hours, and partner details. We're currently live in Mumbai (WeWork BKC, Hiranandani Business Park) and Bangalore (Koramangala Tech Hub), with Gurgaon launching shortly. New locations are announced on our Instagram and newsletter.",
      },
      {
        q: "What are the operating hours?",
        a: "Each machine runs on the hours of its host location. WeWork BKC is 7 AM–10 PM daily, Koramangala Tech Hub is 8 AM–9 PM weekdays. Check the Locations page for specific hours at each site. The machine is restocked and ready by 9 AM every morning.",
      },
    ],
  },
  {
    id: "partnership",
    label: "Get a Machine",
    icon: "🏢",
    faqs: [
      {
        q: "How do I get a Bowlz-I machine at my office or gym?",
        a: "Fill out the 'Install a Machine' form on our Contact page or visit bowlz-i.com/feedback and select Partner / Location. We'll reach out within 24 hours. The process is simple: we assess your space, install the machine at zero cost to you, and handle daily restocking and maintenance. You provide the space — we do everything else.",
      },
      {
        q: "Is there a cost to having a machine installed?",
        a: "Zero upfront cost. We install, stock, maintain, and restock the machine daily at our expense. The machine generates revenue through product sales. There is no rental fee, no maintenance charge, and no hidden costs for the host location.",
      },
      {
        q: "How much space does the machine need?",
        a: "The Elevend Multivend 22 is 1940mm tall (6.3ft), 1293mm wide (4.2ft), and 870mm deep (2.85ft). It weighs 340kg and requires a standard 230V / 740W power outlet within reach. It works best near building entrances, break rooms, gym floors, or any high-footfall area.",
      },
      {
        q: "I'm a location manager and the machine needs restocking. Who do I contact?",
        a: "Use the feedback form at bowlz-i.com/feedback — select 'Partner / Location' and choose 'Restock needed'. This sends an urgent alert to our ops team and we respond within 2 hours on business days. For truly urgent issues, email ops@bowlz-i.com directly.",
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn(
      "border-b border-gray-100 last:border-0 transition-colors",
      open && "bg-forest-50/50"
    )}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left font-[inherit]"
        aria-expanded={open}
      >
        <span className="font-semibold text-sm text-gray-800 leading-relaxed">{q}</span>
        <span className={cn(
          "flex-shrink-0 w-5 h-5 rounded-full border border-forest-300 flex items-center justify-center text-forest-600 text-xs transition-transform mt-0.5",
          open && "rotate-45 bg-forest-600 border-forest-600 text-white"
        )}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayedCategories = activeCategory
    ? FAQ_CATEGORIES.filter(c => c.id === activeCategory)
    : FAQ_CATEGORIES;

  const totalFAQs = FAQ_CATEGORIES.reduce((acc, c) => acc + c.faqs.length, 0);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-forest-600/10 px-5 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 no-underline">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <defs>
                <radialGradient id="faqg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#2d8c58"/><stop offset="100%" stopColor="#1a5c3a"/></radialGradient>
                <radialGradient id="faqg2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#6b4f2a"/><stop offset="100%" stopColor="#3d2d12"/></radialGradient>
              </defs>
              <circle cx="18" cy="18" r="17.5" fill="url(#faqg2)"/>
              <circle cx="18" cy="18" r="11.5" fill="url(#faqg1)"/>
              <path d="M18 12C18 12 22 14.5 22 18C22 22 18 24 18 24C18 24 14 22 14 18C14 14.5 18 12 18 12Z" fill="white" opacity=".9"/>
            </svg>
            <span className="font-display text-forest-600 font-black text-lg">Bowlz-I</span>
          </a>
          <a href="/feedback" className="text-xs font-semibold text-forest-600 border border-forest-300 rounded-full px-4 py-1.5 hover:bg-forest-600 hover:text-white transition-colors">
            Give Feedback
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-12">
        {/* Page title */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3 text-[11px] font-semibold tracking-[0.16em] uppercase text-forest-600">
            <span className="w-5 h-px bg-forest-600" />
            Help Centre
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-3"
            style={{ letterSpacing: "-0.03em" }}>
            Frequently Asked<br /><em className="text-forest-600">Questions.</em>
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">
            {totalFAQs} answers across {FAQ_CATEGORIES.length} topics.
            Can&apos;t find what you need?{" "}
            <a href="mailto:sonalishakyaenterprise@gmail.com" className="text-forest-600 font-medium hover:underline">
              Email us directly.
            </a>
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all font-[inherit]",
              !activeCategory
                ? "bg-forest-600 text-white border-forest-600"
                : "bg-white text-gray-500 border-gray-200 hover:border-forest-400"
            )}
          >
            All topics
          </button>
          {FAQ_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all font-[inherit]",
                activeCategory === cat.id
                  ? "bg-forest-600 text-white border-forest-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-forest-400"
              )}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ accordions */}
        <div className="flex flex-col gap-5">
          {displayedCategories.map(category => (
            <div key={category.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              {/* Category header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{category.icon}</span>
                <h2 className="font-display font-bold text-gray-800 text-lg">{category.label}</h2>
                <span className="ml-auto text-[10px] font-bold tracking-widest uppercase text-gray-300">
                  {category.faqs.length} answers
                </span>
              </div>
              {category.faqs.map(faq => (
                <AccordionItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          ))}
        </div>

        {/* Still stuck? */}
        <div className="mt-12 bg-forest-600 rounded-3xl p-8 text-white text-center">
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-display text-xl font-bold mb-2">Still have a question?</h3>
          <p className="text-white/70 text-sm mb-6 leading-relaxed max-w-sm mx-auto">
            We&apos;re a small team and we genuinely reply to every email. Usually within a few hours.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:sonalishakyaenterprise@gmail.com"
              className="bg-white text-forest-600 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              📧 sonalishakyaenterprise@gmail.com
            </a>
            <a
              href="/feedback"
              className="bg-white/15 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/25 transition-colors"
            >
              📝 Submit Feedback
            </a>
          </div>
        </div>
      </main>

      <footer className="text-center py-5 text-[11px] text-gray-300 border-t border-gray-100">
        © 2026 Bowlz-I ·{" "}
        <a href="/" className="underline hover:text-gray-500">Home</a> ·{" "}
        <a href="/privacy" className="underline hover:text-gray-500">Privacy</a>
      </footer>
    </div>
  );
}
