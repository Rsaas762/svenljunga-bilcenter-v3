import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Real inventory photos come from the dealership's Blocket ads
      {
        protocol: "https",
        hostname: "images.blocketcdn.se",
      },
      // Unsplash is still used for non-inventory imagery (hero)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
