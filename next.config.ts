import type { NextConfig } from 'next'
// food-resturant-back-end.onrender.com   add to protocol
const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**'
      },
      {
        protocol: 'https',
        hostname: 'food-resturant-back-end.onrender.com',
        port: '',
        pathname: '/media/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // matches e.g. res.cloudinary.com, a-res.cloudinary.com
        port: '',
        pathname: '/**' // allow any path under Cloudinary
      }
    ]
  }
  // eslint: {
  //   ignoreDuringBuilds: true // build error ignore
  // }
}

export default nextConfig
