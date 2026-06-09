// import type { NextConfig } from "next";

// const isProd = process.env.NODE_ENV === "production";
// const isCustomDomain = process.env.CUSTOM_DOMAIN === "true";

// // No basePath needed when using custom domain
// const base = (isProd && !isCustomDomain) ? "/Bowlz-I" : "";

// const nextConfig: NextConfig = {
//   output:        "export",
//   trailingSlash: true,
//   basePath:      base,
//   assetPrefix:   base,
//   images: {
//     unoptimized: true,
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

// Custom domain (bowlz-i.com) is now active — no basePath needed.
// The site lives at the root /.
// If you ever remove the custom domain and go back to GitHub Pages subdirectory,
// add back: basePath: "/Bowlz-I", assetPrefix: "/Bowlz-I"

const nextConfig: NextConfig = {
  output:        "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;