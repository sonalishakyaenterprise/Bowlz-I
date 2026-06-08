"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { label: "Home",      href: "#home"        },
  { label: "About",     href: "#about"        },
  { label: "Products",  href: "#products-sec" },
  { label: "Machine",   href: "#machine-sec"  },
  { label: "Locations", href: "#locs-sec"     },
  { label: "Blog",      href: "#blog-sec"     },
  { label: "Contact",   href: "#contact-sec"  },
  { label: "FAQ",       href: "/faq"          },
];

function BowlzILogo({ size = 36, light = false }: { size?: number; light?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Bowlz-I logo">
      <defs>
        <radialGradient id="logoG1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2d8c58"/>
          <stop offset="100%" stopColor="#1a5c3a"/>
        </radialGradient>
        <radialGradient id="logoG2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6b4f2a"/>
          <stop offset="100%" stopColor="#3d2d12"/>
        </radialGradient>
      </defs>
      <circle cx="18" cy="18" r="17.5" fill={light ? "rgba(255,255,255,0.15)" : "url(#logoG2)"}/>
      <circle cx="18" cy="18" r="11.5" fill="url(#logoG1)"/>
      <circle cx="18" cy="18" r="7.5" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      <line x1="18" y1="7" x2="18" y2="29" stroke="rgba(255,255,255,0.1)" strokeWidth=".8"/>
      <line x1="7" y1="18" x2="29" y2="18" stroke="rgba(255,255,255,0.1)" strokeWidth=".8"/>
      <path d="M18 12C18 12 22 14.5 22 18C22 22 18 24 18 24C18 24 14 22 14 18C14 14.5 18 12 18 12Z" fill="white" opacity=".9"/>
      <line x1="18" y1="24" x2="18" y2="27.5" stroke="white" strokeWidth="1" strokeLinecap="round" opacity=".6"/>
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [overDark, setOverDark]         = useState(true); // hero is dark

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 20);

      // Hero section background is dark (#0a0a0a)
      // Once we scroll past it, sections are light (cream)
      const heroEl = document.getElementById("home");
      const heroBottom = heroEl ? heroEl.offsetHeight : window.innerHeight;
      setOverDark(sy < heroBottom - 80);

      // Active section detection
      const sections = NAV_LINKS.map(l => l.href.replace("#", "")).filter(s => !s.startsWith("/"));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= 90) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/")) { window.location.href = href; return; }
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Nav is transparent over dark hero, frosted cream over light sections
  const isLight = scrolled && !overDark;

  return (
    <>
      <header
        className={cn(
          "fixed top:0 left:0 right:0 z-50 transition-all duration-400",
          isLight
            ? "bg-[#f5f0e8]/95 backdrop-blur-md shadow-sm border-b border-forest-600/10"
            : scrolled
              ? "bg-black/40 backdrop-blur-md border-b border-white/8"
              : "bg-transparent"
        )}
        style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, height:"var(--nav-height)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 2.5rem", transition:"all .35s" }}
      >
        {/* LOGO */}
        <button
          onClick={() => handleNavClick("#home")}
          style={{ display:"flex", alignItems:"center", gap:9, background:"none", border:"none", cursor:"pointer" }}
          aria-label="Bowlz-I home"
        >
          <BowlzILogo size={36} light={!isLight}/>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.2rem", fontWeight:900, color: isLight ? "#1a5c3a" : "#fff", letterSpacing:"-.02em", transition:"color .35s" }}>
            Bowlz-I
          </span>
        </button>

        {/* DESKTOP NAV */}
        <nav style={{ display:"flex", gap:2 }} aria-label="Main navigation">
          {NAV_LINKS.map(link => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  padding:"6px 13px", borderRadius:8,
                  fontSize:".78rem", fontWeight:500,
                  letterSpacing:".04em",
                  color: isActive
                    ? isLight ? "#1a5c3a" : "#fff"
                    : isLight ? "#666" : "rgba(255,255,255,0.65)",
                  background: isActive
                    ? isLight ? "rgba(26,92,58,0.08)" : "rgba(255,255,255,0.12)"
                    : "transparent",
                  border:"none", cursor:"pointer",
                  fontFamily:"'DM Sans',sans-serif",
                  transition:"all .2s",
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = isLight ? "#1a5c3a" : "#fff";
                  (e.target as HTMLElement).style.background = isLight ? "rgba(26,92,58,0.06)" : "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.color = isActive ? (isLight ? "#1a5c3a" : "#fff") : (isLight ? "#666" : "rgba(255,255,255,0.65)");
                  (e.target as HTMLElement).style.background = isActive ? (isLight ? "rgba(26,92,58,0.08)" : "rgba(255,255,255,0.12)") : "transparent";
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <button
          onClick={() => handleNavClick("#contact-sec")}
          style={{
            background:"#1a5c3a", color:"#fff",
            padding:"9px 20px", borderRadius:50,
            fontSize:".78rem", fontWeight:600,
            border:"none", cursor:"pointer",
            letterSpacing:".04em", fontFamily:"'DM Sans',sans-serif",
            transition:"all .2s",
            boxShadow: isLight ? "none" : "0 0 20px rgba(45,140,88,0.25)",
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.background="#2d8c58"; (e.target as HTMLElement).style.transform="translateY(-1px)"; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.background="#1a5c3a"; (e.target as HTMLElement).style.transform="translateY(0)"; }}
        >
          Get Started
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ position:"fixed", top:64, left:0, right:0, zIndex:49, background:isLight ? "rgba(245,240,232,0.98)" : "rgba(10,10,10,0.97)", backdropFilter:"blur(14px)", borderBottom:"1px solid rgba(26,92,58,0.1)", padding:"12px 20px 16px" }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{ display:"block", width:"100%", textAlign:"left", padding:"10px 14px", borderRadius:10, border:"none", background:"none", cursor:"pointer", fontSize:".85rem", fontWeight:500, color: isLight ? "#444" : "rgba(255,255,255,0.7)", fontFamily:"'DM Sans',sans-serif", marginBottom:2 }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contact-sec")}
            style={{ width:"100%", background:"#1a5c3a", color:"#fff", padding:"12px", borderRadius:50, fontSize:".85rem", fontWeight:600, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", marginTop:8 }}
          >
            Get Started
          </button>
        </div>
      )}
    </>
  );
}
