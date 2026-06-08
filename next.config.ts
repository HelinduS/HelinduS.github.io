import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",       // Static HTML export for GitHub Pages
  trailingSlash: true,    // Needed for GitHub Pages routing
  images: {
    unoptimized: true,    // Required for static export (no Next.js server)
  },
};

export default nextConfig;
