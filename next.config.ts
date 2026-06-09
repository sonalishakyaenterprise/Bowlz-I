import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const base   = isProd ? "/Bowlz-I" : "";

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
