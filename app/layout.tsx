import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CartProvider } from '../context/CartContext'

export const metadata = {
  title: 'Lwcosmetics ',
  description: 'Descubre nuestra colección de productos de belleza para ojos, labios, rostro y uñas',
  icons: {
    icon: '/app/icon.jpg',
  },
}

// Optimizar performance
export const dynamic = 'force-dynamic'
export const revalidate = 60 // Revalidar cada 60 segundos

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Precargar fuente para mejorar performance */}
        <link 
          rel="preload" 
          href="/fonts/Miroles-Regular.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
