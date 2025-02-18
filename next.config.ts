import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.newswire.lk',
        port: ''
      }
    ]
  }
};

export default nextConfig;
