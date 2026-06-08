/**
 * Format a price in INR
 * e.g. 199 → "₹199" | 1099 → "₹1,099"
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a date string for display
 * e.g. "2026-04-12T00:00:00Z" → "12 April 2026"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format large numbers with Indian comma notation
 * e.g. 12400 → "12,400"
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-IN").format(n);
}

/**
 * Truncate a string to a max length, adding ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Convert a string to a URL-safe slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Format nutrition value with unit
 * e.g. (14, "g") → "14g"
 */
export function formatNutrition(value: number, unit: string): string {
  return `${value}${unit}`;
}
