/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/encheres',
        destination: '/',
        permanent: true,
      },
      {
        source: '/actualites',
        destination: '/',
        permanent: true,
      },
      {
        source: '/auctions',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
