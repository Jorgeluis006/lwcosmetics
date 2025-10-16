/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.maybelline.co',
      },
      {
        protocol: 'https',
        hostname: 'www.bettinafrumboli.com',
      },
      {
        protocol: 'https',
        hostname: 'cyzone.cyzone.com',
      },
      {
        protocol: 'https',
        hostname: 'www.somosmamas.com.ar',
      },
    ],
  },
}

module.exports = nextConfig
