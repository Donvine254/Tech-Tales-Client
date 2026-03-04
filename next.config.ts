import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  turbopack: {
    resolveAlias: { "@prisma/client/index-browser": "@prisma/client" },
  },
};

export default nextConfig;
