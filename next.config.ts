import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Yeh har external domain ko allow kar dega
      },
    ],
  },
  // 🚀 Server Actions ki default 1MB limit ko 5MB kar diya
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;