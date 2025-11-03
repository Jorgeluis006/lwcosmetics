import Link from 'next/link';
import { getCategoryByName } from '../../../../lib/db';
import ProductCard from '../../../../components/ProductCard'

// Habilitar caché agresivo para carga instantánea
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidar cada hora

// Generar todas las páginas de categorías en build time
export async function generateStaticParams() {
  // Lista de categorías conocidas
  return [
    { category: 'ojos' },
    { category: 'labios' },
    { category: 'rostro' },
    { category: 'uñas' },
    { category: 'Ojos' },
    { category: 'Labios' },
    { category: 'Rostro' },
    { category: 'Uñas' },
  ];
}

export default async function ProductsByCategory({ params }: { params: { category: string } }) {
  let category: any = null;
  try {
    // Usar la nueva función optimizada que solo busca UNA categoría
    category = await getCategoryByName(params.category);
  } catch (e) {
    console.error('Error loading category:', e);
  }
  
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
        {category.products && category.products.length > 0 ? (
          category.products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p style={{textAlign: 'center', padding: '40px 0', color: '#666'}}>
            No hay productos en esta categoría.
          </p>
        )}
      </div>
    </div>
  )
}