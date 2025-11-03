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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Prevenir FOUC (Flash of Unstyled Content) */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html { visibility: visible; opacity: 1; }
          `
        }} />
        {/* Precargar fuente para mejorar performance */}
        <link 
          rel="preload" 
          href="/fonts/Miroles-Regular.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <CartProvider>
          <div className="app-container">
            <Header />
            <main className="main-content">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
