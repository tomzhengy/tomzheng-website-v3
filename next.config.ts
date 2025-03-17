import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // For static site generation with Cloudflare Pages
  images: {
    unoptimized: true, // Required for static exports
  },
};

export default nextConfig;
