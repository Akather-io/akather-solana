/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["picsum.photos", "arweave.net"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        lokijs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
