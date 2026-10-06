import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.project-pigeon.com',
      },
    ],
    ...(process.env.NODE_ENV === 'development' && { dangerouslyAllowLocalIP: true }),
  },
};

export default withMDX(config);
