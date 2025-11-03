import '../styles/globals.css'
import './styles.css'
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
        {/* Estilos críticos inline para prevenir FOUC */}
        <style dangerouslySetInnerHTML={{
          __html: `
            * { 
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            html, body {
              height: 100%;
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
              color: #A67356;
              background: #fff;
            }
            .app-container {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
            .main-content {
              flex: 1;
            }
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
