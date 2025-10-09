/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
  },
  webpack: (config, { isServer }) => {
    config.module = config.module || {};
    config.module.exprContextCritical = false;
    return config;
  },
};

export default nextConfig;
