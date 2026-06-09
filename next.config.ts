import type { NextConfig } from "next";

// GitHub Pages serves from https://USERNAME.github.io/REPO_NAME/
// GITHUB_REPOSITORY is automatically set by GitHub Actions as "username/repo"
// We extract the repo name to use as basePath and assetPrefix
const isProd = process.env.NODE_ENV === "production";
const repo   = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const base   = isProd && repo ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output:      "export",
  trailingSlash: true,
  basePath:    base,
  assetPrefix: base,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
