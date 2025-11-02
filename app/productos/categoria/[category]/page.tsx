import Link from 'next/link';
import { getAllCategories } from '../../../../lib/db';
import dynamicImport from 'next/dynamic'
const ProductCard = dynamicImport(() => import('../../../../components/ProductCard'), { ssr: false })

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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}