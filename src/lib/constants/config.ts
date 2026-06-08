export const SITE_CONFIG = {
  name: "Bowlz-I",
  tagline: "Healthy Meals. Available in Seconds.",
  description:
    "India's healthy food infrastructure. Smart vending machines stocked daily with fresh nutritionist-curated meals.",
  url: "https://bowlz-i.com",
  email: "sonalishakyaenterprise@gmail.com",
  phone: "+91 PLACEHOLDER-NUMBER",
  founder: "Sonali Shakya",
  foundedYear: 2026,
  socialLinks: {
    instagram: "https://instagram.com/bowlzi",
    twitter: "https://twitter.com/bowlzi",
    linkedin: "https://linkedin.com/company/bowlzi",
  },
} as const;

export const API_CONFIG = {
  // Phase 1: unused (static JSON)
  // Phase 2: set these via environment variables
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
} as const;

export const FEATURE_FLAGS = {
  // Toggle features without code changes
  enableBlog: true,
  enableLocationsMap: true,
  enableNewsletterSignup: true,
  enablePartnerForm: true,
  // Phase 2+
  enableUserAccounts: false,
  enableLiveInventory: false,
  enableOrdering: false,
} as const;
