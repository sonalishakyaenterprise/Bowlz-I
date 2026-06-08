// Nutrition goal tags — used for product filtering in Phase 2
export const NUTRITION_GOALS = [
  "energy",
  "focus",
  "immunity",
  "recovery",
  "detox",
  "weight-management",
  "gut-health",
  "heart-health",
] as const;

export type NutritionGoal = (typeof NUTRITION_GOALS)[number];

// Partner categories
export const PARTNER_CATEGORIES = [
  "corporate",
  "coworking",
  "gym",
  "hospital",
  "university",
  "mall",
  "other",
] as const;

export type PartnerCategory = (typeof PARTNER_CATEGORIES)[number];

// Machine statuses
export const MACHINE_STATUSES = ["active", "inactive", "maintenance"] as const;
export type MachineStatus = (typeof MACHINE_STATUSES)[number];

// Lead sources — used for attribution tracking
export const LEAD_SOURCES = [
  "homepage_hero",
  "machine_section",
  "partner_section",
  "contact_form",
  "newsletter",
  "locations_section",
  "blog",
  "referral",
  "direct",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];
