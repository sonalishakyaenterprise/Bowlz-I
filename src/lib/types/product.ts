// ============================================================
// PRODUCT DOMAIN TYPES
// ============================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  displayOrder: number;
  isGlobal?: boolean;
  comingSoon?: boolean;
  isRotating?: boolean;           // true for "What's New This Week?"
  rotationNote?: string;          // explains the rotation cadence
  createdAt: string;
}

export interface ProductComponent {
  component: string;              // "Base" | "Protein" | "Greens" | "Veg" | etc.
  ingredient: string;
  quantityG: number | null;       // null = "to taste" or unmeasured
}

export interface OatsVariant {
  variantId: string;
  name: string;
  toppings: string[];             // rotating weekly
  available: boolean;
}

export interface NutritionFacts {
  id: string;
  productId: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  sugarG: number;
  sodiumMg: number;
  vitamins: Record<string, string>;
}

export interface Ingredient {
  id: string;
  name: string;
  isOrganic: boolean;
  allergenInfo: string[];
  supplierId?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  price: number;                  // INR
  sku: string;
  available: boolean;
  imageUrl: string;
  emoji: string;
  tags: string[];
  benefits: string[];

  // Dressing / pairing system
  pairingTags?: string[];         // product IDs this pairs with
  suggestedDressing?: string;     // human-readable name
  dressingIncluded?: boolean;     // true = dressing is in the box
  dressingName?: string;          // name of bundled dressing
  dressingDescription?: string;   // description of bundled dressing
  dressingType?: "salad" | "fruit"; // for dressing category products

  // Components (recipe breakdown)
  components?: ProductComponent[];
  totalWeightG?: number;
  capacityMl?: number;

  // "What's New" rotating category
  weekTag?: string;               // "This Week" | "Coming Soon"
  note?: string;                  // kitchen/ops notes and placeholders

  // Overnight oats variants (multiple rotating toppings)
  variants?: OatsVariant[];

  // World of Wellness
  origin?: string;
  originCountry?: string;
  originFlag?: string;
  isGlobal?: boolean;

  isFeatured?: boolean;
  ingredients: Ingredient[];
  nutrition: NutritionFacts;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithCategory extends Product {
  category: Category;
}
