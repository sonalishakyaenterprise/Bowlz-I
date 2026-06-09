/**
 * DATA ACCESS LAYER
 * Phase 1: Static JSON  |  Phase 2: Supabase  |  Phase 3: Spring Boot
 * Replace implementations here — function signatures stay the same.
 */

import type { Category, Product, Location, Machine, BlogPost } from "@/lib/types";

import categoriesData  from "./categories.json";
import productsData    from "./products.json";
import locationsData   from "./locations.json";
import machinesData    from "./machines.json";
import blogPostsData   from "./blog-posts.json";

// ── CATEGORIES ────────────────────────────────────────────────
export function getAllCategories(): Category[] {
  return (categoriesData as Category[]).sort((a, b) => a.displayOrder - b.displayOrder);
}
export function getCategoryById(id: string): Category | undefined {
  return (categoriesData as Category[]).find(c => c.id === id);
}
export function getCategoryBySlug(slug: string): Category | undefined {
  return (categoriesData as Category[]).find(c => c.slug === slug);
}

// ── PRODUCTS ──────────────────────────────────────────────────
export function getAllProducts(): Product[] {
  return productsData as unknown as Product[];
}
export function getAvailableProducts(): Product[] {
  return (productsData as unknown as Product[]).filter(p => p.available);
}
export function getFeaturedProducts(): Product[] {
  return (productsData as unknown as Product[]).filter(p => p.isFeatured);
}
export function getProductsByCategory(categoryId: string): Product[] {
  return (productsData as unknown as Product[]).filter(p => p.categoryId === categoryId);
}
export function getProductBySlug(slug: string): Product | undefined {
  return (productsData as unknown as Product[]).find(p => p.slug === slug);
}
export function getProductById(id: string): Product | undefined {
  return (productsData as unknown as Product[]).find(p => p.id === id);
}
export function getGlobalProducts(): Product[] {
  return (productsData as unknown as Product[]).filter(p => p.isGlobal);
}
export function getDressings(): Product[] {
  return (productsData as unknown as Product[]).filter(
    p => p.categoryId === "cat-009" || p.categoryId === "cat-010"
  );
}
export function getWhatsNewProducts(): Product[] {
  return (productsData as unknown as Product[]).filter(p => p.categoryId === "cat-011");
}
export function getPairingsFor(productId: string): Product[] {
  const product = getProductById(productId);
  if (!product?.pairingTags) return [];
  return product.pairingTags
    .map(id => getProductById(id))
    .filter((p): p is Product => p !== undefined);
}

// ── LOCATIONS ─────────────────────────────────────────────────
export function getAllLocations(): Location[] {
  // Filter out template/placeholder entries
  return (locationsData as unknown as Location[]).filter(
    l => !("_comment" in (l as unknown as Record<string, unknown>)) && l.name && !l.name.startsWith("PLACEHOLDER")
  );
}
export function getActiveLocations(): Location[] {
  return getAllLocations().filter(l => l.active);
}
export function getLocationById(id: string): Location | undefined {
  return (locationsData as unknown as Location[]).find(l => l.id === id);
}

// ── MACHINES ──────────────────────────────────────────────────
export function getAllMachines(): Machine[] {
  return machinesData as unknown as Machine[];
}
export function getMachineById(id: string): Machine | undefined {
  return (machinesData as unknown as Machine[]).find(m => m.id === id);
}

// ── BLOG ──────────────────────────────────────────────────────
export function getAllBlogPosts(): BlogPost[] {
  return blogPostsData as unknown as BlogPost[];
}
export function getPublishedBlogPosts(): BlogPost[] {
  return (blogPostsData as unknown as BlogPost[]).filter(p => p.status === "published");
}
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return (blogPostsData as unknown as BlogPost[]).find(p => p.slug === slug);
}
export function getTestimonials(): BlogPost[] {
  return (blogPostsData as unknown as BlogPost[]).filter(p => p.type === "testimonial");
}
