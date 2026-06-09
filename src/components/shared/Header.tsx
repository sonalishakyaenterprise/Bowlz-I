"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { label: "Home",      href: "#home"        },
  { label: "About",     href: "#about"        },
  { label: "Products",  href: "#products-sec" },
  { label: "Machine",   href: "#machine-sec"  },
  { label: "Locations", href: "#locs-sec"     },
  // { label: "Blog",      href: "#blog-sec"     },
  { label: "Contact",   href: "#contact-sec"  },
  // { label: "FAQ",       href: "/faq"          },
];

function BowlzILogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="lG1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2d8c58"/><stop offset="100%" stopColor="#1a5c3a"/>
        </radialGradient>
        <radialGradient id="lG2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6b4f2a"/><stop offset="100%" stopColor="#3d2d12"/>
        </radialGradient>
      </defs>
      <circle cx="18" cy="18" r="17.5" fill="url(#lG2)"/>
      <circle cx="18" cy="18" r="11.5" fill="url(#lG1)"/>
      <path d="M18 12C18 12 22 14.5 22 18C22 22 18 24 18 24C18 24 14 22 14 18C14 14.5 18 12 18 12Z" fill="white" opacity=".9"/>
      <line x1="18" y1="24" x2="18" y2="27.5" stroke="white" strokeWidth="1" strokeLinecap="round" opacity=".6"/>
    </svg>
  );
}

export default function Header() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [overDark,      setOverDark]      = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 20);
      const heroEl = document.getElementById("home");
      const heroBottom = heroEl ? heroEl.offsetHeight : window.innerHeight;
      setOverDark(sy < heroBottom - 80);
      const sections = NAV_LINKS.map(l => l.href.replace("#", "")).filter(s => !s.startsWith("/"));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= 90) { setActiveSection(s); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/")) { window.location.href = href; return; }
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  const isLight = scrolled && !overDark;
  const textColor = isLight ? "#1a5c3a" : "#fff";
  const mutedColor = isLight ? "#666" : "rgba(255,255,255,0.65)";

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          height: "var(--nav-height)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 1.25rem",
          transition: "all .35s",
          background: isLight
            ? "rgba(245,240,232,0.96)"
            : scrolled ? "rgba(0,0,0,0.4)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: isLight
            ? "1px solid rgba(26,92,58,0.1)"
            : scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        }}
      >
        {/* LOGO */}
        <button
          onClick={() => handleNavClick("#home")}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}
          aria-label="Go to homepage"
        >
          <BowlzILogo size={30}/>
          <span style={{
            fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", fontWeight: 900,
            color: textColor, letterSpacing: "-.02em", transition: "color .35s",
            whiteSpace: "nowrap",
          }}>
            Bowlz-I
          </span>
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex" style={{ gap: 2 }} aria-label="Main navigation">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  padding: "6px 11px", borderRadius: 8,
                  fontSize: ".76rem", fontWeight: 500, letterSpacing: ".04em",
                  color: isActive ? textColor : mutedColor,
                  background: isActive
                    ? isLight ? "rgba(26,92,58,0.08)" : "rgba(255,255,255,0.12)"
                    : "transparent",
                  border: "none", cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif", transition: "all .2s",
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT SIDE */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {/* CTA — hidden on small mobile */}
          <button
            onClick={() => handleNavClick("#contact-sec")}
            className="hidden sm:block"
            style={{
              background: "#1a5c3a", color: "#fff",
              padding: "8px 16px", borderRadius: 50,
              fontSize: ".76rem", fontWeight: 600,
              border: "none", cursor: "pointer",
              letterSpacing: ".04em", fontFamily: "'DM Sans',sans-serif",
              transition: "all .2s", whiteSpace: "nowrap",
            }}
          >
            Get Started
          </button>

          {/* HAMBURGER — mobile only */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="flex md:hidden"
            style={{
              background: mobileOpen
                ? isLight ? "rgba(26,92,58,0.1)" : "rgba(255,255,255,0.12)"
                : "transparent",
              border: `1.5px solid ${isLight ? "rgba(26,92,58,0.2)" : "rgba(255,255,255,0.25)"}`,
              borderRadius: 8, padding: "6px 8px",
              cursor: "pointer", flexDirection: "column",
              gap: 4, alignItems: "center", justifyContent: "center",
              transition: "all .2s",
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span style={{
              display: "block", width: 18, height: 1.5,
              background: textColor, borderRadius: 2, transition: "all .3s",
              transform: mobileOpen ? "rotate(45deg) translateY(4px)" : "none",
            }}/>
            <span style={{
              display: "block", width: 18, height: 1.5,
              background: textColor, borderRadius: 2, transition: "all .3s",
              opacity: mobileOpen ? 0 : 1,
            }}/>
            <span style={{
              display: "block", width: 18, height: 1.5,
              background: textColor, borderRadius: 2, transition: "all .3s",
              transform: mobileOpen ? "rotate(-45deg) translateY(-4px)" : "none",
            }}/>
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        style={{
          position: "fixed", top: "var(--nav-height)", left: 0, right: 0, zIndex: 49,
          background: isLight ? "rgba(245,240,232,0.98)" : "rgba(10,10,10,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(26,92,58,0.1)",
          padding: mobileOpen ? "12px 20px 20px" : "0 20px",
          maxHeight: mobileOpen ? "480px" : "0px",
          overflow: "hidden",
          transition: "max-height .35s cubic-bezier(.4,0,.2,1), padding .35s ease",
          pointerEvents: mobileOpen ? "all" : "none",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 12 }}>
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "11px 14px", borderRadius: 10,
                  border: "none",
                  background: isActive
                    ? isLight ? "rgba(26,92,58,0.08)" : "rgba(255,255,255,0.08)"
                    : "transparent",
                  cursor: "pointer",
                  fontSize: ".9rem", fontWeight: isActive ? 600 : 400,
                  color: isActive ? (isLight ? "#1a5c3a" : "#fff") : mutedColor,
                  fontFamily: "'DM Sans',sans-serif", transition: "all .2s",
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => handleNavClick("#contact-sec")}
          style={{
            width: "100%", background: "#1a5c3a", color: "#fff",
            padding: "13px", borderRadius: 50,
            fontSize: ".88rem", fontWeight: 600,
            border: "none", cursor: "pointer",
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          Get Started →
        </button>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 48 }}
        />
      )}
    </>
  );
}