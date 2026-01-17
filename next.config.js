/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["palworld.gg"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "palworld.gg",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.discord.com",
      },
      {
        protocol: "https",
        hostname: "*.discordapp.com",
      },
    ],
  },
};

module.exports = nextConfig;
