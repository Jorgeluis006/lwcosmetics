import Link from 'next/link';
import { getAllCategories } from '../../../../lib/db';

// Revalidar cada 60 segundos
export const revalidate = 60;

export default async function ProductsByCategory({ params }: { params: { category: string } }) {
  const categories = await getAllCategories();
  const category = categories.find((cat: any) => cat.name.toLowerCase() === params.category.toLowerCase());
  if (!category) {
    return <div>Categoría no encontrada</div>;
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