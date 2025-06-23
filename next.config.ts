import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   eslint: {
    ignoreDuringBuilds: true, // <-- IGNORA erros de lint no build
  },
};

export default nextConfig;
