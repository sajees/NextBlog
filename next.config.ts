import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.ctfassets.net"], // Add the Contentful image CDN domain
  },
  // You can add more configuration options here if needed
};

export default nextConfig;
