/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/shadcn-ui"],
  webpack: (config) => {
    config.watchOptions = {
      poll: 300,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
