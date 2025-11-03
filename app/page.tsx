import Link from 'next/link'
import './styles.css'
import Carousel from '../components/Carousel';
import { categories } from '../types/Product'

// Habilitar caché para la página principal
export const revalidate = 3600; // Revalidar cada hora

export default function Home() {
  return (
    <main>
      <section>
        {/* Carrusel de imágenes */}
        <Carousel />
      </section>
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenida a tu tienda de belleza</h1>
          <p>Descubre nuestra colección de productos de alta calidad</p>
        </div>
      </section>

      <section className="categories">
        <h2>Nuestras Categorías</h2>
        <div className="categories-grid">
          {Object.entries(categories).map(([key, name]) => {
            const images: Record<string, string> = {
              ojos: 'https://www.maybelline.co/-/media/project/loreal/brand-sites/mny/americas/latam/articles/como-pintar-la-linea-del-ojo/how-to-image.jpg?rev=f3f86b9a44804052a104aa97b8d1f800',
              labios: 'https://www.bettinafrumboli.com/wp-content/uploads/2021/09/guia-labios-nude-01.jpg',
              rostro: 'https://cyzone.cyzone.com/wp-content/uploads/2022/09/Artboard-8.jpg',
              unas: 'https://www.somosmamas.com.ar/wp-content/uploads/2022/04/maquillaje-de-unas-lilas.jpg',
            }
            return (
              <Link 
                href={`/productos/categoria/${key}`} 
                key={key} 
                className="category-card"
                prefetch={true}
              >
                <div className="category-image">
                  <img 
                    src={images[key]} 
                    alt={name as string}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3>{name as string}</h3>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}