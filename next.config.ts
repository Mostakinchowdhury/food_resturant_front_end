import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true // build error ignore
  }
}

export default nextConfig
