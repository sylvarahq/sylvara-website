import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: '/',
  trailingSlash: true,
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true

    // OR, if you need more granular control:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.unsplash.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
   eslint: {
    // Warning: this will _completely_ disable ESLint errors on build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // WARNING: this will completely disable type-checking on build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
