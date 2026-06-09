import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isCustomDomain = process.env.CUSTOM_DOMAIN === "true";

// No basePath needed when using custom domain
const base = (isProd && !isCustomDomain) ? "/Bowlz-I" : "";

const nextConfig: NextConfig = {
  output:        "export",
  trailingSlash: true,
  basePath:      base,
  assetPrefix:   base,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;