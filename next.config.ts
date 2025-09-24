import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true
}

export default nextConfig
module.exports = {
  images: {
    remotePatterns: [new URL('http://127.0.0.1:8000/media/**')]
  }
}
