import Link from 'next/link';
import { getAllCategories } from '../../../../lib/db';

// Forzar render dinámico para evitar fallos de build si la DB no responde
export const dynamic = 'force-dynamic';

export default async function ProductsByCategory({ params }: { params: { category: string } }) {
  let categories: any[] = [];
  try {
    categories = await getAllCategories();
  } catch (e) {
    categories = [];
  }
  const category = categories.find((cat: any) => cat.name.toLowerCase() === params.category.toLowerCase());
  if (!category) {
    return <div className="container">No pudimos cargar la categoría ahora mismo. Intenta más tarde.</div>;
  }
  return (
    <div className="container">
      <div className="category-header">
        <h1 className="category-title">{category.name}</h1>
        <p className="category-description">
          Descubre nuestra selección de productos para {category.name.toLowerCase()}
        </p>
      </div>

      <div className="products-grid">
  {category.products.map((product: any) => (
          <div key={product.id} className="product-card modern-card">
            <div className="product-img-wrap">
              <img src={product.imageUrl} alt={product.name} className="product-img" />
              <button className="fav-btn" title="Favorito">♡</button>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">${product.price.toLocaleString('es-CO')}</p>
              <div className="product-actions">
                <Link href={`/productos/${product.id}`} className="btn btn-sm btn-primary">
                  👁️ Ver detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}