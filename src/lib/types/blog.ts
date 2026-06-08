// ============================================================
// BLOG DOMAIN TYPES
// ============================================================

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // markdown
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  featuredImage: string;
  tags: string[];
  category: "health" | "nutrition" | "lifestyle" | "company" | "recipe";
  status: "draft" | "published";
  viewCount: number;
  readTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  // Social proof fields
  type: "article" | "testimonial" | "social"; // for Blog carousel
  socialHandle?: string;
  socialPlatform?: "instagram" | "twitter" | "linkedin";
  rating?: number; // 1-5 for testimonials
}

// ============================================================
// PARTNERSHIP DOMAIN TYPES
// ============================================================

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  description: string;
  category: "corporate" | "gym" | "mall" | "coworking" | "hospital" | "university" | "other";
  locationsCount: number;
  contactEmail: string;
  contactPerson: string;
  status: "active" | "inactive" | "pending";
  isFeatured?: boolean;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  supplyCategories: string[];
  verificationStatus: "pending" | "verified" | "rejected";
  createdAt: string;
}

// ============================================================
// LEAD DOMAIN TYPES
// ============================================================

export type LeadInterest = "locations" | "partnership" | "product" | "newsletter" | "supply";
export type LeadStatus = "new" | "contacted" | "converted" | "lost";

export interface Lead {
  id: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
  spaceType?: "corporate" | "gym" | "hospital" | "university" | "coworking" | "other";
  interestedIn: LeadInterest[];
  locationPreference?: string;
  notes?: string;
  status: LeadStatus;
  source: string; // "homepage_cta" | "partner_form" | "newsletter" | etc
  createdAt: string;
  contactedAt?: string;
}

// Form submission types (before ID/timestamp assignment)
export type LeadFormData = Omit<Lead, "id" | "status" | "createdAt" | "contactedAt">;

export interface PartnerEnquiry {
  name: string;
  company: string;
  email: string;
  phone: string;
  spaceType: Lead["spaceType"];
  city: string;
  message?: string;
}

export interface NewsletterSignup {
  email: string;
  name?: string;
}

// ============================================================
// USER DOMAIN TYPES (Future - Phase 2)
// ============================================================

export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  role: "customer" | "admin" | "partner";
  preferences: {
    dietaryRestrictions?: string[];
    nutritionGoals?: string[];
    favoriteCategories?: string[];
    notificationsEnabled?: boolean;
  };
  createdAt: string;
  lastLogin?: string;
}

// ============================================================
// API RESPONSE WRAPPER
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    version: string;
    pagination?: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
}
