/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['palworld.gg'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'palworld.gg',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

