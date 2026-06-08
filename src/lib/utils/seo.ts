import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants/config";

interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Generate consistent metadata for any page
 */
export function generateMetadata(options: SeoOptions = {}): Metadata {
  const title = options.title
    ? `${options.title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`;

  const description = options.description ?? SITE_CONFIG.description;
  const image = options.image ?? "/images/og-image.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      siteName: SITE_CONFIG.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: options.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
