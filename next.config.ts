import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  // Switch to default (remove this line) when migrating to Vercel in Phase 2
  output: "export",
  trailingSlash: true,
  images: {
    // Required for static export — swap to optimized when on Vercel
    unoptimized: true,
  },
};

export default nextConfig;
