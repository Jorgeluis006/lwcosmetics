
import Link from 'next/link';
import { getAllProducts } from '../../lib/db';

// Revalidar cada 60 segundos (ISR - Incremental Static Regeneration)
export const revalidate = 60;

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: { buscar?: string }
}) {
  const allProducts = await getAllProducts();
  
  // Filtrar productos si hay query de búsqueda
  const searchQuery = searchParams?.buscar?.toLowerCase() || '';
  const products = searchQuery
    ? allProducts.filter((product: any) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description?.toLowerCase().includes(searchQuery) ||
        product.category?.name?.toLowerCase().includes(searchQuery)
      )
    : allProducts;

  return (
    <div className="container">
      <div className="category-header">
        <h1 className="category-title">
          {searchQuery ? `Resultados para "${searchParams.buscar}"` : 'Todos Nuestros Productos'}
        </h1>
        <p className="category-description">
          {searchQuery 
            ? `Se encontraron ${products.length} producto${products.length !== 1 ? 's' : ''}`
            : `Explora nuestra colección completa de ${products.length} productos de belleza`
          }
        </p>
      </div>

      {products.length === 0 ? (
        <div style={{textAlign: 'center', padding: '40px 0'}}>
          <p style={{fontSize: '1.2rem', color: '#666'}}>
            No se encontraron productos que coincidan con tu búsqueda.
          </p>
          <Link href="/productos" className="btn btn-primary" style={{marginTop: '20px'}}>
            Ver todos los productos
          </Link>
        </div>
      ) : (
        <div className="products-grid">
  {products.map((product: any) => (
          <div key={product.id} className="product-card modern-card">
            <div className="product-img-wrap">
              <img src={product.imageUrl || (product as any).image} alt={product.name} className="product-img" />
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
      )}
    </div>
  );
}