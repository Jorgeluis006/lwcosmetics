import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CartProvider } from '../context/CartContext'

export const metadata = {
  title: 'Tienda de Belleza - Cosméticos de Alta Calidad',
  description: 'Descubre nuestra colección de productos de belleza para ojos, labios, rostro y uñas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
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
