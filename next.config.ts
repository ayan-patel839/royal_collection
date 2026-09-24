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
};

export default nextConfig;