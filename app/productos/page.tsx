
import Link from 'next/link';
import { getAllProducts } from '../../lib/db';
import ProductCard from '../../components/ProductCard'

// Habilitar caché para carga instantánea
export const revalidate = 3600; // Revalidar cada hora

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: { buscar?: string }
}) {
  let allProducts: any[] = [];
  try {
    allProducts = await getAllProducts();
  } catch (e) {
    // Si hay un error con la DB en producción, mostramos un estado vacío amistoso
    return (
      <div className="container">
        <div className="category-header">
          <h1 className="category-title">Todos Nuestros Productos</h1>
          <p className="category-description">
            No pudimos conectar con la base de datos en este momento. Intenta de nuevo más tarde.
          </p>
        </div>
        <div style={{textAlign:'center',padding:'40px 0'}}>
          <Link href="/" className="btn btn-primary">Volver al inicio</Link>
        </div>
      </div>
    );
  }
  
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}