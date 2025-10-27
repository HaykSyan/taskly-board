import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: { domains: [] },
  compiler: { removeConsole: process.env.NODE_ENV === "production" },
};

export default nextConfig;
