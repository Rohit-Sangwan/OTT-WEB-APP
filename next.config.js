/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/t/p/:path*',
        destination: 'https://image.tmdb.org/t/p/:path*',
      },
    ]
  },
}

module.exports = nextConfig 