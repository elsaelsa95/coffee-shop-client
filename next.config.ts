// /** @type {import('next').NextConfig} */
// const nextConfig = {};

import type { NextConfig } from "next";
 
const nextConfig: NextConfig = {
  serverExternalPackages: ["@mastra/*"],
};
 
export default nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};
