"use client";

import React from "react";

import { useState, useRef } from "react";
import { useInView } from "@/lib/hooks/useScroll";
import { cn } from "@/lib/utils/cn";
import type { BlogPost } from "@/lib/types";

interface Props {
  posts: BlogPost[];
}

const PLATFORM_ICONS: Record<string, string> = {
  instagram: "📸",
  twitter: "🐦",
  linkedin: "💼",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={cn("text-sm", i < rating ? "text-amber-400" : "text-gray-600")}>
          ★
        </span>
      ))}
    </div>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const isTestimonial = post.type === "testimonial";
  const isSocial = post.type === "social";

  return (
    <div
      className={cn(
        "flex-shrink-0 w-80 rounded-2xl border overflow-hidden snap-start transition-all duration-200 hover:shadow-xl hover:-translate-y-1",
        isTestimonial
          ? "bg-white border-gray-100"
          : "bg-[#111] border-white/8"
      )}
    >
      {/* Image placeholder */}
      <div
        className={cn(
          "h-44 flex items-center justify-center text-5xl relative",
          isTestimonial ? "bg-gradient-to-br from-cream-200 to-cream-300" : "bg-gradient-to-br from-forest-700 to-forest-600"
        )}
      >
        {/* TODO: Replace with Next/Image when real images added */}
        <span className="text-5xl opacity-60">
          {isTestimonial ? "💬" : post.category === "company" ? "🌱" : "📰"}
        </span>
        {post.type === "article" && (
          <span className="absolute top-3 left-3 bg-white/90 text-gray-600 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
            Article
          </span>
        )}
        {isSocial && post.socialPlatform && (
          <span className="absolute top-3 left-3 bg-white/90 text-gray-600 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
            {PLATFORM_ICONS[post.socialPlatform]} {post.socialPlatform}
          </span>
        )}
        {isTestimonial && (
          <span className="absolute top-3 left-3 bg-forest-600 text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full">
            Review
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Author */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-forest-400 to-forest-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {post.author.charAt(0)}
          </div>
          <div>
            <div className={cn("text-sm font-semibold leading-tight", isTestimonial ? "text-gray-800" : "text-white")}>
              {post.author}
            </div>
            {post.authorRole && (
              <div className="text-[10px] text-gray-400">{post.authorRole}</div>
            )}
            {post.socialHandle && (
              <div className="text-[10px] text-forest-500">{post.socialHandle}</div>
            )}
          </div>
        </div>

        {/* Rating */}
        {isTestimonial && post.rating && (
          <div className="mb-2">
            <StarRating rating={post.rating} />
          </div>
        )}

        {/* Title */}
        <h3
          className={cn(
            "font-display font-bold text-base leading-snug mb-2",
            isTestimonial ? "text-gray-900" : "text-white"
          )}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className={cn(
            "text-xs leading-relaxed mb-3 line-clamp-3",
            isTestimonial ? "text-gray-500" : "text-gray-400"
          )}
        >
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <span className={cn("text-[10px]", isTestimonial ? "text-gray-300" : "text-gray-600")}>
            {post.readTimeMinutes} min read · {post.viewCount.toLocaleString("en-IN")} views
          </span>
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
              post.category === "health" && "bg-green-100 text-green-700",
              post.category === "nutrition" && "bg-blue-100 text-blue-700",
              post.category === "lifestyle" && "bg-purple-100 text-purple-700",
              post.category === "company" && "bg-amber-100 text-amber-700",
              post.category === "recipe" && "bg-orange-100 text-orange-700",
            )}
          >
            {post.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function BlogSection({ posts }: Props) {
  const { ref, isInView } = useInView(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section id="blog-sec" className="bg-[#f5f0e8] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={ref}
          className={cn("flex items-end justify-between mb-12 gap-4 flex-wrap reveal-up", isInView && "in-view")}
        >
          <div className="max-w-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-forest-600" />
              <span className="text-xs font-semibold tracking-[0.16em] uppercase text-forest-600">
                Community
              </span>
            </div>
            <h2
              className="font-display text-5xl md:text-6xl font-black text-[#0d0d0d] leading-tight mb-3"
              style={{ letterSpacing: "-0.03em" }}
            >
              People are
              <br />
              <em className="text-forest-600">talking.</em>
            </h2>
            <p className="text-gray-500 text-base">
              Reviews, articles, and stories from people building a healthier
              daily routine with Bowlz-I.
            </p>
          </div>

          {/* Scroll controls */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "w-10 h-10 rounded-full border flex items-center justify-center text-sm transition-all",
                canScrollLeft
                  ? "border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-white"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              )}
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "w-10 h-10 rounded-full border flex items-center justify-center text-sm transition-all",
                canScrollRight
                  ? "border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-white"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              )}
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4"
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}

          {/* CTA card at end */}
          <div className="flex-shrink-0 w-72 rounded-2xl border-2 border-dashed border-forest-600/30 flex flex-col items-center justify-center p-8 text-center snap-start">
            <div className="text-4xl mb-4">✍️</div>
            <div className="font-display font-bold text-forest-600 text-lg mb-2">
              Share your story
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-5">
              Have a Bowlz-I experience? We&apos;d love to feature you.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-forest-600 text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-forest-500 transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Placeholder note */}
        <p className="mt-6 text-center text-xs text-gray-300 italic">
          📸 Placeholder images — real photos, testimonials and media coverage to be added here.
        </p>
      </div>
    </section>
  );
}
