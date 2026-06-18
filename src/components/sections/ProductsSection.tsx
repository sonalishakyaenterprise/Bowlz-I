"use client";

import React, { useState } from "react";
import { useInView } from "@/lib/hooks/useScroll";
import { cn } from "@/lib/utils/cn";
import type { Category, Product } from "@/lib/types";

interface Props {
  categories: Category[];
  products: Product[];
}

// ── Nutrition flip card back ───────────────────────────────────────────────
function NutritionBack({ product, onBack }: { product: Product; onBack: () => void }) {
  const n = product.nutrition;
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-forest-400">Nutrition / 100g</span>
        <button
          onClick={e => { e.stopPropagation(); onBack(); }}
          className="text-[10px] text-gray-500 underline bg-transparent border-none cursor-pointer font-[inherit]"
        >
          ← Back
        </button>
      </div>

      {/* Macro grid */}
      <div className="grid grid-cols-4 gap-1 bg-white/5 rounded-xl p-3 mb-3">
        {[
          { v: n?.calories ?? "—", l: "kcal" },
          { v: n?.proteinG != null ? `${n.proteinG}g` : "—", l: "protein" },
          { v: n?.carbsG != null ? `${n.carbsG}g` : "—", l: "carbs" },
          { v: n?.fatG != null ? `${n.fatG}g` : "—", l: "fat" },
        ].map(m => (
          <div key={m.l} className="text-center">
            <div className="text-sm font-bold text-green-400">{m.v}</div>
            <div className="text-[9px] text-white/40 uppercase tracking-wider">{m.l}</div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      {product.benefits?.slice(0, 3).map(b => (
        <div key={b} className="flex items-center gap-2 text-[11px] text-white/50 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-500 flex-shrink-0" />
          {b}
        </div>
      ))}

      {/* Components preview */}
      {product.components && product.components.length > 0 && (
        <div className="mt-auto pt-3 border-t border-white/8">
          <div className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-1.5">Ingredients</div>
          <div className="text-[10px] text-white/35 leading-relaxed line-clamp-2">
            {product.components.filter(c => c.ingredient && !c.ingredient.includes("PLACEHOLDER")).map(c => c.ingredient).join(", ")}
          </div>
        </div>
      )}

      {/* Allergen warning */}
      {product.allergenInfo && product.allergenInfo.length > 0 && (
        <div className="mt-2 flex items-start gap-1.5 bg-amber-500/10 rounded-lg px-2 py-1.5">
          <span className="text-[11px] flex-shrink-0">⚠️</span>
          <span className="text-[10px] text-amber-300/90 leading-relaxed">
            Contains: {product.allergenInfo.join(", ")}
          </span>
        </div>
      )}

      {/* Dressing bundled notice */}
      {product.dressingIncluded && product.dressingName && (
        <div className="mt-2 bg-forest-600/20 rounded-lg px-2 py-1.5 text-[10px] text-forest-300 font-medium">
          🫙 Includes {product.dressingName} dressing
        </div>
      )}

      {/* Origin for global items */}
      {product.originFlag && product.origin && (
        <div className="mt-2 text-[10px] text-white/30">
          {product.originFlag} From {product.origin}
        </div>
      )}
    </div>
  );
}

// ── Product card ───────────────────────────────────────────────────────────
function ProductCard({ product, allProducts }: { product: Product; allProducts: Product[] }) {
  const [flipped, setFlipped] = useState(false);

  const pairedProducts = allProducts.filter(p =>
    product.pairingTags?.includes(p.id)
  ).slice(0, 3);

  return (
    <div
      className={cn(
        "relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 min-h-[220px] flex flex-col",
        "hover:shadow-lg hover:-translate-y-1",
        flipped
          ? "bg-[#0d1f14] border-forest-600/40 shadow-lg shadow-forest-600/10"
          : "bg-white/5 border-white/8 hover:bg-white/8 hover:border-white/15"
      )}
      onClick={() => setFlipped(!flipped)}
    >
      {/* Unavailable overlay */}
      {!product.available && (
        <div className="absolute top-2.5 right-2.5 z-10 bg-black/70 text-white/60 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
          {product.weekTag === "Coming Soon" ? "Coming Soon" : "Unavailable"}
        </div>
      )}

      {/* Dressing included badge */}
      {product.dressingIncluded && (
        <div className="absolute top-2.5 left-2.5 z-10 bg-forest-600/90 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">
          Dressing included
        </div>
      )}

      {/* Week tag */}
      {product.weekTag === "This Week" && (
        <div className="absolute top-2.5 right-2.5 z-10 bg-pink-500/90 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">
          ✨ This Week
        </div>
      )}

      {!flipped ? (
        /* Front */
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-3xl leading-none">{product.emoji}</div>
            {product.dietaryType && (
              <div
                className="w-3.5 h-3.5 border-[1.5px] rounded-[2px] flex items-center justify-center flex-shrink-0"
                style={{ borderColor: "#1a7a1a" }}
                title={product.dietaryType === "vegan" ? "Vegan" : "Vegetarian"}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#1a7a1a" }} />
              </div>
            )}
          </div>
          <div className="text-[9px] font-bold tracking-widest uppercase text-forest-400 mb-1">
            {product.dressingType === "salad" ? "Salad Dressing" : product.dressingType === "fruit" ? "Fruit Dressing" : ""}
          </div>
          <div className="font-semibold text-white text-sm leading-tight mb-1.5">{product.name}</div>
          <div className="text-[11px] text-white/40 leading-relaxed mb-3 flex-1 line-clamp-3">{product.shortDescription}</div>

          {/* Pairing tags */}
          {pairedProducts.length > 0 && (
            <div className="mb-3">
              <div className="text-[9px] text-white/25 uppercase tracking-widest mb-1">Pairs with</div>
              <div className="flex flex-wrap gap-1">
                {pairedProducts.map(p => (
                  <span key={p.id} className="text-[10px] bg-white/6 text-white/40 px-1.5 py-0.5 rounded-md">{p.emoji} {p.name.split(" ")[0]}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto">
            <span className="text-sm font-bold text-green-400">₹{product.price}</span>
            {product.capacityMl && (
              <span className="text-[9px] text-white/25">{product.capacityMl}ml</span>
            )}
          </div>
        </div>
      ) : (
        /* Back - nutrition */
        <NutritionBack product={product} onBack={() => setFlipped(false)} />
      )}
    </div>
  );
}

// ── Category drawer ────────────────────────────────────────────────────────
function CategoryDrawer({
  category, products, allProducts, isOpen, onClose
}: {
  category: Category;
  products: Product[];
  allProducts: Product[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const isWhatsNew = category.isRotating;
  const isDressings = category.slug === "dressings" || category.slug === "fruit-dressings";

  return (
    <div
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={{ maxHeight: isOpen ? "1400px" : "0px" }}
    >
      <div className="pt-3 pb-8">
        {/* Sub-header */}
        <div className="flex items-start justify-between mb-5 px-1">
          <div>
            {isWhatsNew && category.rotationNote && (
              <p className="text-[11px] text-pink-400/70 max-w-lg leading-relaxed mb-2">
                🔄 {category.rotationNote}
              </p>
            )}
            {isDressings && (
              <p className="text-[11px] text-amber-400/70 max-w-lg leading-relaxed mb-2">
                🫙 Sold in 50ml portions. Each product card shows which bowls or fruit boxes it pairs best with.
              </p>
            )}
            <div className="text-[10px] font-semibold uppercase tracking-widest text-white/25">
              {products.length} item{products.length !== 1 ? "s" : ""}
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[11px] font-medium text-white/30 hover:text-white/60 border border-white/10 rounded-full px-3 py-1.5 transition-colors bg-transparent cursor-pointer font-[inherit]"
          >
            Close ✕
          </button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-14">
            <div className="text-5xl mb-3">🚧</div>
            <p className="text-sm text-white/25">Coming soon — stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {products.map(product => (
              <ProductCard key={product.id} product={product} allProducts={allProducts} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ProductsSection({ categories, products }: Props) {
  const { ref, isInView } = useInView(0.1);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenCategory(prev => {
      const next = prev === id ? null : id;
      if (next) {
        setTimeout(() => {
          document.getElementById(`cat-row-${id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 80);
      }
      return next;
    });
  };

  const getProducts = (categoryId: string) =>
    products.filter(p => p.categoryId === categoryId);

  // Category accent colors
  const accentColor: Record<string, string> = {
    "cat-011": "rgba(236,72,153,0.15)", // pink for whats-new
    "cat-009": "rgba(245,158,11,0.1)",  // amber for dressings
    "cat-010": "rgba(249,115,22,0.1)",  // orange for fruit dressings
    "cat-012": "rgba(26,92,58,0.15)",   // green for world of wellness
  };

  return (
    <section id="products-sec" className="bg-[#0d0d0d] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={ref} className={cn("max-w-2xl mb-16 opacity-0 translate-y-6 transition-all duration-700", isInView && "opacity-100 translate-y-0")}>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-forest-400" />
            <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-forest-400">The Menu</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white leading-tight mb-5" style={{ letterSpacing: "-0.03em" }}>
            What&apos;s inside<br />
            <em className="text-forest-400">the machine.</em>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            Eleven categories. Fresh daily. Tap any category to open the full catalog —
            tap a product card to flip it for nutrition details and ingredient pairings.
          </p>
        </div>

        {/* Category list */}
        <div className="flex flex-col gap-2.5">
          {categories.map((cat, i) => {
            const catProducts = getProducts(cat.id);
            const isOpen = openCategory === cat.id;
            const isWhatsNew = cat.isRotating;
            const bg = accentColor[cat.id];

            return (
              <div key={cat.id} id={`cat-row-${cat.id}`}>
                <button
                  onClick={() => toggle(cat.id)}
                  className={cn(
                    "w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border transition-all duration-250 text-left cursor-pointer font-[inherit]",
                    isOpen
                      ? "border-transparent text-white"
                      : "bg-white/4 border-white/7 text-white hover:bg-white/7 hover:border-white/13"
                  )}
                  style={isOpen ? { background: bg || "rgba(26,92,58,0.2)", borderColor: "transparent" } : {}}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl leading-none">{cat.icon}</span>
                    <div>
                      <div className="font-semibold text-base text-white flex items-center gap-2 flex-wrap">
                        {cat.name}
                        {cat.comingSoon && (
                          <span className="text-[9px] font-bold tracking-widest uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full">Coming Soon</span>
                        )}
                        {isWhatsNew && (
                          <span className="text-[9px] font-bold tracking-widest uppercase bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full">Rotates Weekly</span>
                        )}
                      </div>
                      <div className={cn("text-[11px] mt-0.5", isOpen ? "text-white/60" : "text-white/30")}>{cat.description}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", isOpen ? "bg-white/15 text-white" : "bg-white/7 text-white/40")}>
                      {catProducts.length} items
                    </span>
                    <span className={cn("w-6 h-6 rounded-full border text-[13px] flex items-center justify-center transition-transform duration-300", isOpen ? "bg-white/15 border-white/20 rotate-45" : "bg-white/5 border-white/10")}>
                      +
                    </span>
                  </div>
                </button>

                <CategoryDrawer
                  category={cat}
                  products={catProducts}
                  allProducts={products}
                  isOpen={isOpen}
                  onClose={() => setOpenCategory(null)}
                />
              </div>
            );
          })}
        </div>

        {/* World of Wellness teaser
        <div className="mt-16 bg-gradient-to-br from-forest-600 to-forest-700 rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-around opacity-[0.07] text-[6rem] pointer-events-none select-none" aria-hidden="true">
            <span>🇯🇵</span><span>🇧🇷</span><span>🇦🇷</span><span>🇰🇷</span>
          </div>
          <div className="relative z-10 max-w-xl">
            <div className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-3">Coming Next</div>
            <h3 className="font-display text-3xl md:text-4xl font-black text-white mb-4">World of Wellness 🌍</h3>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              Ceremonial Matcha from Japan. Açaí from Brazil. Yerba Mate from Argentina.
              We&apos;re bringing the world&apos;s most powerful wellness traditions to your machine.
            </p>
            <div className="flex flex-wrap gap-2">
              {["🇯🇵 Matcha", "🇧🇷 Açaí", "🇦🇷 Yerba Mate", "🇰🇷 Tonics", "🇨🇳 Goji"].map(item => (
                <span key={item} className="bg-white/15 text-white text-[11px] font-medium px-3 py-1.5 rounded-full">{item}</span>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
