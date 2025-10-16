import Link from 'next/link'
import { useState } from 'react'

const carouselImages = [
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1920&q=80'
]

const products = [
  { id: 1, name: 'Serum Hidratante', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', price: 45000 },
  { id: 2, name: 'Labial Gloss', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', price: 32000 },
  { id: 3, name: 'Paleta Sombras', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', price: 59000 },
  { id: 4, name: 'Esmalte Uñas', img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', price: 18000 }
]

export default function Home() {
  const [carouselIdx, setCarouselIdx] = useState(0)
  function prev() { setCarouselIdx((i) => (i === 0 ? carouselImages.length - 1 : i - 1)) }
  function next() { setCarouselIdx((i) => (i === carouselImages.length - 1 ? 0 : i + 1)) }

  return (
    <>
      <section className="carousel-section">
        <div className="carousel">
          <button className="carousel-btn left" onClick={prev}>&lt;</button>
          <img src={carouselImages[carouselIdx]} alt="Carrusel" className="carousel-img" />
          <button className="carousel-btn right" onClick={next}>&gt;</button>
          <div className="carousel-overlay">
            <h1 className="carousel-title">Descubre tu belleza única</h1>
            <p className="carousel-desc">Maquillaje profesional, productos exclusivos y asesoría personalizada.</p>
            <Link href="/productos" className="btn btn-lg btn-primary">Ver catálogo</Link>
          </div>
        </div>
        <div className="carousel-dots">
          {carouselImages.map((_, i) => (
            <span key={i} className={i === carouselIdx ? 'dot active' : 'dot'} onClick={()=>setCarouselIdx(i)}></span>
          ))}
        </div>
      </section>

      <section className="container products-section">
        <h2 className="products-title">Nuevos productos</h2>
        <div className="products-grid">
          {products.map(p => (
            <div key={p.id} className="product-card modern-card">
              <div className="product-img-wrap">
                <img src={p.img} alt={p.name} className="product-img" />
                <button className="fav-btn" title="Favorito">♡</button>
              </div>
              <div className="product-info">
                <h3>{p.name}</h3>
                <p className="product-price">${p.price.toLocaleString('es-CO')}</p>
                <Link href="/productos" className="btn btn-sm btn-primary">Ver más</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
