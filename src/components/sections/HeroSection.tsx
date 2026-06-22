"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

const WORDS = ["Health.", "Recovery.", "Wellness.", "Focus.", "Energy."];

const SHELF_DATA = [
  { label: "Fresh Bowls",         items: ["🥗","🥗","🥗","🥗"],       screen: "Fresh Bowls",      sub: "Stocked daily at 9 AM" },
  { label: "Fruit Boxes",         items: ["🍓","🍍","🫐","🍉"],       screen: "Fruit Boxes",       sub: "Cut this morning"       },
  { label: "Cold-Pressed Juices", items: ["🥤","🧃","🥤","🧃","🥤"], screen: "Cold-Pressed",      sub: "Never heated"           },
  { label: "Immunity Shots",      items: ["⚡","🌿","⚡","🌿"],       screen: "Wellness Shots",    sub: "60-second ritual"       },
  { label: "Snacks & Dressings",  items: ["🍿","🫙","🥜","🫙"],       screen: "Snacks & Dressings",sub: "No preservatives"       },
];

const MARQUEE_TAGS = [
  "🎯 Aim for Better Health","🥗 Signature Bowls","🧃 Cold-Pressed Juices",
  "⚡ Immunity Shots","🌿 Wellness Shots","🥥 Functional Drinks",
  "🍿 Healthy Snacks","🫙 Dressings","✨ What's New","🌍 World of Wellness",
];

const HERO_BULLETS = [
  { icon: "🎯", text: "Precision nutrition — every macro intentionally calculated" },
  { icon: "🌱", text: "Farm-fresh verified and sourced daily" },
  { icon: "📏", text: "Proper portion sizes — not too little, not too much" },
  { icon: "🥬", text: "Fun new ways to eat your veggies and fruits" },
  { icon: "🤖", text: "Smart vending — scan, pick up, done in under 60 seconds" },
  { icon: "🔒", text: "Hygienically sealed with tamper-evident packaging" },
];

// ── Vending Machine ────────────────────────────────────────────────────────
function VendingMachine({
  revealedShelves,
  screenText,
  screenSub,
  onShelfClick,
}: {
  revealedShelves: number;
  screenText: string;
  screenSub: string;
  onShelfClick: (i: number) => void;
}) {
  const [highlightedShelf, setHighlightedShelf] = useState<number | null>(null);

  return (
    <div style={{ width: 270, position: "relative" }}>
      {/* Body */}
      <div style={{
        background: "linear-gradient(155deg,#2a1f0e,#1a1208)",
        borderRadius: "18px 18px 8px 8px",
        padding: 14,
        boxShadow: "0 30px 70px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}>
        {/* Header bar */}
        <div style={{
          background: "#1a5c3a",
          borderRadius: "12px 12px 0 0",
          margin: "-14px -14px 12px",
          padding: "11px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", fontWeight:900, color:"#fff" }}>Bowlz-I</div>
            <div style={{ fontSize:".5rem", color:"rgba(255,255,255,0.6)", letterSpacing:".08em", textTransform:"uppercase", marginTop:1 }}>Clean · Green · Conscious</div>
          </div>
          <div style={{ display:"flex", gap:4 }}>
            {["Fresh","Daily"].map(b=>(
              <span key={b} style={{ fontSize:".47rem", fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", background:"rgba(255,255,255,0.18)", color:"rgba(255,255,255,0.85)", padding:"2px 6px", borderRadius:3 }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Glass panel */}
        <div style={{
          background:"rgba(200,240,220,0.04)",
          border:"1px solid rgba(100,200,140,0.14)",
          borderRadius:8, padding:6, marginBottom:10,
        }}>
          {SHELF_DATA.map((shelf, i) => (
            <div key={shelf.label}>
              <div
                onClick={() => onShelfClick(i)}
                onMouseEnter={() => setHighlightedShelf(i)}
                onMouseLeave={() => setHighlightedShelf(null)}
                style={{
                  display:"flex", alignItems:"center", padding:"5px 4px",
                  minHeight:44, cursor:"pointer", borderRadius:5,
                  transition:"background .2s",
                  background: highlightedShelf===i ? "rgba(255,255,255,0.08)" : "transparent",
                }}
              >
                <div style={{ display:"flex", gap:3, flex:1 }}>
                  {shelf.items.map((emoji, j) => (
                    <span key={j} style={{
                      fontSize:18, lineHeight:1,
                      opacity: i < revealedShelves ? 1 : 0,
                      transform: i < revealedShelves ? "translateY(0)" : "translateY(5px)",
                      transition: `opacity 0.4s ease ${j*80}ms, transform 0.4s ease ${j*80}ms`,
                    }}>{emoji}</span>
                  ))}
                </div>
                <div style={{
                  fontSize:".39rem", fontWeight:700, letterSpacing:".1em",
                  textTransform:"uppercase", color:"rgba(100,200,140,0.5)",
                  writingMode:"vertical-rl", width:16, textAlign:"center", whiteSpace:"nowrap",
                  opacity: i < revealedShelves ? 1 : 0, transition:"opacity .4s",
                }}>{shelf.label}</div>
              </div>
              {i < SHELF_DATA.length - 1 && (
                <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(26,92,58,0.2),transparent)", margin:"1px 4px" }}/>
              )}
            </div>
          ))}
        </div>

        {/* Screen */}
        <div style={{
          background:"#0a1a0d", border:"1px solid rgba(26,92,58,0.3)",
          borderRadius:7, padding:10, marginBottom:10, textAlign:"center",
        }}>
          <div style={{ fontSize:".48rem", color:"rgba(100,200,140,0.6)", letterSpacing:".12em", textTransform:"uppercase" }}>Welcome to</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:".9rem", fontWeight:700, color:"#4ade80", margin:"2px 0", transition:"all .4s" }}>{screenText}</div>
          <div style={{ fontSize:".46rem", color:"rgba(100,200,140,0.4)", letterSpacing:".1em", textTransform:"uppercase", transition:"all .4s" }}>{screenSub}</div>
          <div style={{ display:"flex", gap:5, marginTop:6, justifyContent:"center" }}>
            <button style={{ fontSize:".44rem", fontWeight:700, padding:"3px 8px", borderRadius:4, border:"none", cursor:"pointer", background:"#1a5c3a", color:"#fff", fontFamily:"inherit" }}>Scan &amp; Pay</button>
            <button style={{ fontSize:".44rem", fontWeight:700, padding:"3px 8px", borderRadius:4, background:"transparent", border:"1px solid rgba(26,92,58,0.4)", color:"rgba(100,200,140,0.7)", cursor:"pointer", fontFamily:"inherit" }}>Loyalty</button>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
          {[{ lbl:"Pay Here", ico:"💳 📱" },{ lbl:"Pick Up", ico:"📦" }].map(p=>(
            <div key={p.lbl} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:6, padding:7, textAlign:"center" }}>
              <div style={{ fontSize:".44rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:3 }}>{p.lbl}</div>
              <div style={{ fontSize:13 }}>{p.ico}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Glow */}
      <div style={{ position:"absolute", bottom:-20, left:"50%", transform:"translateX(-50%)", width:160, height:16, background:"#1a5c3a", filter:"blur(20px)", opacity:.2, pointerEvents:"none" }}/>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [wordIdx, setWordIdx]           = useState(0);
  const [wordVisible, setWordVisible]   = useState(true);
  const [hasLoaded, setHasLoaded]       = useState(false);
  const [revealedShelves, setRevealed]  = useState(1);
  const [screenText, setScreenText]     = useState("Bowlz-I");
  const [screenSub, setScreenSub]       = useState("Eat Well. Live Green.");
  const revealedRef                     = useRef(1);

  useEffect(() => { const t = setTimeout(() => setHasLoaded(true), 80); return () => clearTimeout(t); }, []);

  // Rotating word
  useEffect(() => {
    const iv = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setWordVisible(true); }, 380);
    }, 2800);
    return () => clearInterval(iv);
  }, []);

  // Scroll-driven shelf reveal
  useEffect(() => {
    const handler = () => {
      const hero = document.getElementById("home");
      if (!hero) return;
      const prog = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / (hero.offsetHeight * 0.7)));
      const step = Math.min(Math.floor(prog * 5.5) + 1, 5);
      if (step > revealedRef.current) {
        revealedRef.current = step;
        setRevealed(step);
        const sd = SHELF_DATA[step - 1];
        if (sd) { setScreenText(sd.screen); setScreenSub(sd.sub); }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    setTimeout(() => { setRevealed(1); revealedRef.current = 1; }, 700);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleShelfClick = (i: number) => {
    setScreenText(SHELF_DATA[i].screen);
    setScreenSub(SHELF_DATA[i].sub);
  };

  const fadeIn = (delay: string, extra?: React.CSSProperties): React.CSSProperties => ({
    opacity: hasLoaded ? 1 : 0,
    transform: hasLoaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`,
    ...extra,
  });

  return (
    <section id="home" style={{ minHeight:"100vh", background:"#0a0a0a", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column" }}>
      {/* Radial glow */}
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 60% at 55% 50%, rgba(26,92,58,0.14) 0%, transparent 65%)", pointerEvents:"none" }}/>

      {/* Floating ingredients */}
      {[
        { e:"🥬", top:"14%", left:"3%",  anim:"heroFloatA", dur:"6s",   del:"0s"   },
        { e:"🍊", top:"40%", left:"1.5%",anim:"heroFloatB", dur:"7s",   del:"1s"   },
        { e:"🫚", top:"66%", left:"5%",  anim:"heroFloatC", dur:"5.5s", del:".5s"  },
        { e:"🫐", top:"15%", right:"3%", anim:"heroFloatB", dur:"6.5s", del:".8s"  },
        { e:"🌿", top:"44%", right:"2%", anim:"heroFloatA", dur:"8s",   del:"1.5s" },
        { e:"🥥", top:"70%", right:"5%", anim:"heroFloatC", dur:"7s",   del:".3s"  },
      ].map((f,i) => (
        <div key={i} aria-hidden="true" style={{
          position:"absolute", top:f.top, left:(f as any).left, right:(f as any).right,
          fontSize:"1.9rem", pointerEvents:"none", userSelect:"none",
          opacity: hasLoaded ? 0.45 : 0, transition:"opacity 1s ease 1.2s",
          animation:`${f.anim} ${f.dur} ease-in-out ${f.del} infinite`,
          filter:"drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
        }}>{f.e}</div>
      ))}

      {/* Two-column hero */}
      <div style={{
        flex:1, display:"grid", gridTemplateColumns:"1fr 1fr",
        alignItems:"center", gap:"3rem",
        maxWidth:1200, margin:"0 auto",
        padding:"8rem 2.5rem 3rem", position:"relative", zIndex:1, width:"100%",
      }}>

        {/* LEFT */}
        <div>
          {/* Eyebrow — bullseye positioning */}
          <div style={{ ...fadeIn("0.1s"), display:"inline-flex", alignItems:"center", gap:8, marginBottom:"1.2rem" }}>
            <span style={{ fontSize:"1.1rem" }}>🎯</span>
            <span style={{ fontSize:".72rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:"rgba(100,220,155,.85)" }}>
              Fresh · Precise · Made for You
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            ...fadeIn("0.2s"),
            fontFamily:"'Playfair Display', Georgia, serif",
            fontSize:"clamp(2.4rem,4.5vw,4.2rem)",
            fontWeight:900, color:"#fff",
            lineHeight:1.08, letterSpacing:"-.04em", marginBottom:"1.2rem",
          }}>
            An aim for your<br/>
            <span style={{ color:"rgba(100,220,155,.95)", fontStyle:"italic" }}>
              perfect{" "}
              <span style={{
                display:"inline-block",
                opacity: wordVisible ? 1 : 0,
                transform: wordVisible ? "translateY(0)" : "translateY(-8px)",
                transition:"all 1s ease",
              }}>{WORDS[wordIdx]}</span>
            </span>
          </h1>

          {/* Sub */}
          <p style={{ ...fadeIn("0.35s"), fontSize:".98rem", color:"rgba(255,255,255,0.45)", lineHeight:1.75, maxWidth:440, marginBottom:"2rem", fontWeight:300 }}>
            Precisely portioned. Nutritionist-curated. Farm-fresh verified every morning.
            Bowlz-I puts the right food in your hands — wherever your day takes you.
          </p>

          {/* Bullet points */}
          <div style={{ ...fadeIn("0.45s"), display:"flex", flexDirection:"column", gap:10, marginBottom:"2.5rem" }}>
            {HERO_BULLETS.map((b, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"center", gap:10,
                opacity: hasLoaded ? 1 : 0,
                transform: hasLoaded ? "translateY(0)" : "translateY(12px)",
                transition: `opacity .6s ease ${0.45 + i*0.08}s, transform .6s ease ${0.45 + i*0.08}s`,
              }}>
                <span style={{ fontSize:"1rem", flexShrink:0 }}>{b.icon}</span>
                <span style={{ fontSize:".82rem", color:"rgba(255,255,255,0.55)", lineHeight:1.5 }}>{b.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ ...fadeIn("0.85s"), display:"flex", gap:12, flexWrap:"wrap", marginBottom:"2.5rem" }}>
            <button
              onClick={() => document.getElementById("products-sec")?.scrollIntoView({ behavior:"smooth" })}
              style={{ background:"#1a5c3a", color:"#fff", padding:"11px 26px", borderRadius:50, fontSize:".88rem", fontWeight:600, border:"none", cursor:"pointer", letterSpacing:".02em", transition:"all .2s", fontFamily:"inherit" }}
              onMouseEnter={e=>{ (e.target as HTMLElement).style.background="#2d8c58"; (e.target as HTMLElement).style.transform="translateY(-2px)"; }}
              onMouseLeave={e=>{ (e.target as HTMLElement).style.background="#1a5c3a"; (e.target as HTMLElement).style.transform="translateY(0)"; }}
            >Explore the Menu</button>
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior:"smooth" })}
              style={{ border:"1.5px solid rgba(255,255,255,0.2)", color:"rgba(255,255,255,0.7)", padding:"11px 26px", borderRadius:50, fontSize:".88rem", fontWeight:600, background:"none", cursor:"pointer", letterSpacing:".02em", transition:"all .2s", fontFamily:"inherit" }}
              onMouseEnter={e=>{ (e.target as HTMLElement).style.borderColor="rgba(255,255,255,0.5)"; (e.target as HTMLElement).style.color="#fff"; }}
              onMouseLeave={e=>{ (e.target as HTMLElement).style.borderColor="rgba(255,255,255,0.2)"; (e.target as HTMLElement).style.color="rgba(255,255,255,0.7)"; }}
            >How It Works</button>
          </div>

          {/* Metrics */}
          <div style={{
            ...fadeIn("1s"),
            display:"flex", gap:"2.5rem",
            paddingTop:"2rem", borderTop:"1px solid rgba(255,255,255,0.08)",
          }}>
            {[
              { value:"34+",   label:"Products"   },
              { value:"11",    label:"Categories"  },
              { value:"Daily", label:"Restocked"   },
              { value:"<60s",  label:"To Serve"    },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.9rem", fontWeight:900, color:"rgba(100,220,155,.9)", lineHeight:1 }}>{m.value}</div>
                <div style={{ fontSize:".62rem", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginTop:3 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — vending machine */}
        <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-start", paddingTop:"1rem" }}>
          <VendingMachine
            revealedShelves={revealedShelves}
            screenText={screenText}
            screenSub={screenSub}
            onShelfClick={handleShelfClick}
          />
        </div>
      </div>

      {/* Marquee */}
      <div style={{ overflow:"hidden", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"10px 0", background:"rgba(255,255,255,0.02)", position:"relative", zIndex:1 }}>
        <div className="marquee-track" style={{ display:"flex", whiteSpace:"nowrap" }}>
          {[...MARQUEE_TAGS,...MARQUEE_TAGS].map((tag, i) => (
            <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:6, marginRight:28, fontSize:".7rem", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Float keyframes */}
      <style>{`
        @keyframes heroFloatA{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-14px) rotate(6deg)}}
        @keyframes heroFloatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px) rotate(-5deg)}}
        @keyframes heroFloatC{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px) rotate(9deg)}}
        .marquee-track{animation:marqueeScroll 32s linear infinite}
        @keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @media(max-width:768px){
          #home>div:first-of-type{grid-template-columns:1fr !important}
        }
      `}</style>
    </section>
  );
}
