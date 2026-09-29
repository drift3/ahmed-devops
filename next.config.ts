import type { NextConfig } from "next";

/**
 * Repo name on GitHub — used for basePath on GitHub Pages project pages.
 * The site is published at https://drift3.github.io/ahmed-devops/
 */
const GITHUB_REPOSITORY_NAME = "ahmed-devops";
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? `/${GITHUB_REPOSITORY_NAME}` : "";

const nextConfig: NextConfig = {
  // GitHub Pages: static HTML export (no Node.js server)
  output: "export",
  //basePath + assetPrefix must point to the project subpath on GitHub Pages
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  // Trailing slash so internal links resolve correctly on GitHub Pages subpaths
  trailingSlash: true,
  // Disable Next.js Image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },
  // Expose basePath to client-side code (e.g. for <img src="/assets/...">)
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
