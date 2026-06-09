"use client";

import React from "react";

import { useState } from "react";
import { useInView } from "@/lib/hooks/useScroll";
import { cn } from "@/lib/utils/cn";
import type { Location } from "@/lib/types";

interface Props {
  locations: Location[];
}

// Approximate SVG coords for Indian cities on a simplified map
// These are mapped to an 800x900 SVG viewBox
const CITY_COORDS: Record<string, { x: number; y: number }> = {
  Mumbai: { x: 200, y: 530 },
  Bangalore: { x: 255, y: 620 },
  Gurgaon: { x: 285, y: 280 },
  Delhi: { x: 290, y: 260 },
  Hyderabad: { x: 300, y: 520 },
  Pune: { x: 215, y: 555 },
  Chennai: { x: 330, y: 620 },
  Kolkata: { x: 490, y: 380 },
};

const CATEGORY_ICONS: Record<string, string> = {
  coworking: "💻",
  corporate: "🏢",
  gym: "🏋️",
  hospital: "🏥",
  university: "🎓",
  mall: "🛍️",
  other: "📍",
};

export default function LocationsSection({ locations }: Props) {
  const { ref, isInView } = useInView(0.1);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // Filter out template entries (they have _comment field, not real locations)
  const realLocations = locations.filter((l) => !("_comment" in l) && l.name && !l.name.startsWith("PLACEHOLDER"));
  const activeLocations = realLocations.filter((l) => l.active);
  const comingSoonLocations = realLocations.filter((l) => !l.active);

  // Group by city for map pins
  const cityGroups: Record<string, Location[]> = {};
  locations.forEach((loc) => {
    if (!cityGroups[loc.city]) cityGroups[loc.city] = [];
    cityGroups[loc.city].push(loc);
  });

  return (
    <section id="locs-sec" className="bg-[#0d0d0d] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={ref}
          className={cn("max-w-2xl mb-16 reveal-up", isInView && "in-view")}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-forest-400" />
            <span className="text-xs font-semibold tracking-[0.16em] uppercase text-forest-400">
              Find Us
            </span>
          </div>
          <h2
            className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-5"
            style={{ letterSpacing: "-0.03em" }}
          >
            Where to find
            <br />
            <em className="text-forest-400">a Bowlz-I machine.</em>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            We&apos;re growing. Machines live in coworking spaces, corporate offices,
            gyms and campuses. Click a city to see locations.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* India Map SVG */}
          <div className="relative bg-white/3 border border-white/8 rounded-3xl overflow-hidden p-4">
            <svg
              viewBox="0 0 800 900"
              className="w-full h-auto"
              aria-label="Map of India with Bowlz-I machine locations"
            >
              {/* Simplified India outline — enough to be recognisable */}
              <path
                d="M310 80 L370 75 L430 90 L480 120 L520 160 L550 210 L560 260 L545 310 L530 370 L490 420 L510 470 L520 530 L490 580 L460 620 L420 660 L390 700 L360 720 L340 700 L320 670 L300 640 L280 610 L260 580 L240 540 L220 500 L200 460 L190 420 L180 380 L175 330 L180 280 L190 240 L210 200 L230 160 L255 130 L280 105 Z"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1.5"
              />
              {/* Internal state-ish lines */}
              <path d="M310 80 L310 250 L260 280 L250 350 L200 380" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <path d="M430 90 L420 200 L380 250 L360 320 L340 400" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <path d="M180 280 L260 280 L310 250 L380 250 L430 200 L480 200 L530 210" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <path d="M190 420 L260 410 L310 390 L370 380 L430 390 L480 420 L510 440" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

              {/* State fill (very subtle) */}
              <path
                d="M310 80 L370 75 L430 90 L480 120 L520 160 L550 210 L560 260 L545 310 L530 370 L490 420 L510 470 L520 530 L490 580 L460 620 L420 660 L390 700 L360 720 L340 700 L320 670 L300 640 L280 610 L260 580 L240 540 L220 500 L200 460 L190 420 L180 380 L175 330 L180 280 L190 240 L210 200 L230 160 L255 130 L280 105 Z"
                fill="rgba(45,140,88,0.04)"
              />

              {/* City pins */}
              {Object.entries(cityGroups).map(([city, locs]) => {
                const coords = CITY_COORDS[city];
                if (!coords) return null;
                const hasActive = locs.some((l) => l.active);
                const isHovered = hoveredCity === city;
                const isSelected = selectedLocation?.city === city;

                return (
                  <g
                    key={city}
                    onClick={() => setSelectedLocation(locs[0])}
                    onMouseEnter={() => setHoveredCity(city)}
                    onMouseLeave={() => setHoveredCity(null)}
                    className="cursor-pointer"
                  >
                    {/* Pulse ring for active */}
                    {hasActive && (
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r="18"
                        fill={isSelected ? "rgba(45,140,88,0.3)" : "rgba(45,140,88,0.15)"}
                        className="map-ping"
                      />
                    )}
                    {/* Pin dot */}
                    <circle
                      cx={coords.x}
                      cy={coords.y}
                      r={isHovered || isSelected ? "10" : "7"}
                      fill={hasActive ? "#2d8c58" : "#4a4a4a"}
                      stroke={isHovered || isSelected ? "white" : "transparent"}
                      strokeWidth="2"
                      className="transition-all duration-200"
                    />
                    {/* Machine count */}
                    {hasActive && (
                      <text
                        x={coords.x}
                        y={coords.y + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize="7"
                        fontWeight="bold"
                      >
                        {locs.filter((l) => l.active).length}
                      </text>
                    )}
                    {/* City label */}
                    <text
                      x={coords.x}
                      y={coords.y + 22}
                      textAnchor="middle"
                      fill={isHovered || isSelected ? "white" : "rgba(255,255,255,0.5)"}
                      fontSize="11"
                      fontWeight={isHovered || isSelected ? "700" : "400"}
                      className="transition-all duration-200 select-none"
                    >
                      {city}
                    </text>
                  </g>
                );
              })}

              {/* Legend */}
              <g transform="translate(20, 820)">
                <circle cx="8" cy="8" r="6" fill="#2d8c58" />
                <text x="18" y="12" fill="rgba(255,255,255,0.4)" fontSize="10">Active machine</text>
                <circle cx="8" cy="26" r="6" fill="#4a4a4a" />
                <text x="18" y="30" fill="rgba(255,255,255,0.4)" fontSize="10">Coming soon</text>
              </g>
            </svg>
          </div>

          {/* Location cards */}
          <div className="space-y-4">
            {/* Active */}
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-forest-400 mb-3">
                {activeLocations.length > 0 ? `🟢 Live Machines — ${activeLocations.length} location${activeLocations.length !== 1 ? "s" : ""}` : "🚀 Launching Soon — First Machine Loading"}
              </div>
              <div className="space-y-2">
                {activeLocations.length === 0 && (
                  <div className="bg-forest-600/10 border border-forest-600/20 rounded-2xl p-5 text-center mb-2">
                    <div className="text-2xl mb-2">📍</div>
                    <div className="text-sm font-semibold text-forest-600 mb-1">First machine coming very soon</div>
                    <div className="text-xs text-gray-500 leading-relaxed">We're in final discussions with our first location partner. Want to be notified the moment we go live?</div>
                    <button
                      onClick={() => document.getElementById("contact-sec")?.scrollIntoView({ behavior: "smooth" })}
                      className="mt-3 text-xs font-semibold text-forest-600 border border-forest-600/30 rounded-full px-4 py-1.5 hover:bg-forest-600 hover:text-white transition-all font-[inherit]"
                    >
                      Get notified →
                    </button>
                  </div>
                )}
                {activeLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(selectedLocation?.id === loc.id ? null : loc)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl border transition-all duration-200",
                      selectedLocation?.id === loc.id
                        ? "bg-forest-600 border-forest-500"
                        : "bg-white/5 border-white/8 hover:bg-white/8"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span>{CATEGORY_ICONS[loc.category] || "📍"}</span>
                          <span className={cn("font-semibold text-sm", selectedLocation?.id === loc.id ? "text-white" : "text-white")}>
                            {loc.name}
                          </span>
                        </div>
                        <div className={cn("text-xs", selectedLocation?.id === loc.id ? "text-white/70" : "text-gray-500")}>
                          {loc.address}, {loc.city}
                        </div>
                        {selectedLocation?.id === loc.id && (
                          <div className="mt-3 space-y-1.5">
                            <div className="text-xs text-white/60">🕐 {loc.operatingHours}</div>
                            <div className="text-xs text-white/60">🤖 {loc.machinesCount} machine{loc.machinesCount > 1 ? "s" : ""}</div>
                            {loc.partnerName && <div className="text-xs text-white/60">🤝 Partner: {loc.partnerName}</div>}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-forest-300 bg-forest-600/30 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
                        {loc.city}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Coming soon */}
            {comingSoonLocations.length > 0 && (
              <div>
                <div className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-3">
                  🔜 Coming Soon
                </div>
                <div className="space-y-2">
                  {comingSoonLocations.map((loc) => (
                    <div
                      key={loc.id}
                      className="p-4 rounded-2xl bg-white/3 border border-white/5 opacity-60"
                    >
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{CATEGORY_ICONS[loc.category] || "📍"}</span>
                        <span className="font-medium">{loc.name}</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-0.5 pl-6">{loc.city}, {loc.state}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Want us in your city? */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
              <div className="text-2xl mb-2">📍</div>
              <div className="font-semibold text-white text-sm mb-1">Want Bowlz-I in your city?</div>
              <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                We're expanding fast. Tell us your city and we'll prioritise your area.
              </p>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-block bg-forest-600 hover:bg-forest-500 text-white px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors"
              >
                Request a location
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
