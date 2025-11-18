/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Für Netlify
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
}

module.exports = nextConfig

