import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
    // OR, if you need more granular control:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.unsplash.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  }
};

export default nextConfig;
