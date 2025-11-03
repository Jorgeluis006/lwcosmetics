import Link from 'next/link';
import { getAllCategories } from '../../../../lib/db';
import ProductCard from '../../../../components/ProductCard'

// Forzar render dinámico para evitar fallos de build si la DB no responde
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Deshabilitar caché

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