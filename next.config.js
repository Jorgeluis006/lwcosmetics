/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimizaciones de rendimiento
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Habilitar caché estático
  swcMinify: true,
  // Optimizar fuentes
  optimizeFonts: true,
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
    // Optimizar carga de imágenes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
}

module.exports = nextConfig
