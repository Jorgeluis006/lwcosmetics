import { getProductById, getAllProducts } from '../../../lib/db'
import Link from 'next/link'
import './detalle.css'
import dynamicImport from 'next/dynamic'
const AddToCartButton = dynamicImport(() => import('../../../components/AddToCartButton'), { ssr: false })

// Forzar render dinámico para evitar fallos de build si la DB no responde
export const dynamic = 'force-dynamic';

export default async function ProductoDetalle({ params }: { params: { id: string } }) {
  let product: any = null;
  try {
    product = await getProductById(Number(params.id));
  } catch (e) {
    product = null;
  }
  const prod: any = product;
  // product: { id, name, description, price, imageUrl, stock, categoryId, category: { id, name } }

  if (!product) {
    return (
      <div className="container">
        <h1>Producto no encontrado</h1>
        <Link href="/productos" className="btn btn-primary">Volver a productos</Link>
      </div>
    );
  }

  // Imagen principal única
  const mainImage = product.imageUrl;
  const images = Array.isArray(prod.images) && prod.images.length > 0 ? prod.images : [mainImage];

  let allProducts: any[] = [];
  try {
    allProducts = await getAllProducts();
  } catch (e) {
    allProducts = [];
  }
  const relatedProducts = allProducts
  .filter((p: any) => p.category && p.category.name === prod.category?.name && p.id !== prod.id)
    .slice(0, 4);

  return (
    <div className="producto-detalle">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link href="/">Inicio</Link>
        <span> / </span>
        <Link href="/productos">Productos</Link>
        <span> / </span>
        <Link href={`/productos/categoria/${product.category.name}`}>
          {prod.category?.name ? prod.category.name.charAt(0).toUpperCase() + prod.category.name.slice(1) : ''}
        </Link>
        <span> / </span>
        <span>{product.name}</span>
      </div>

      {/* Imagen principal y detalles */}
      <div className="detalle-content">
        <div className="galeria">
          <div className="galeria-imagenes">
            {images.map((img: string, idx: number) => (
              <div className="imagen-principal" key={idx} style={{ marginBottom: 12 }}>
                <img src={img} alt={product.name + ' ' + (idx + 1)} />
              </div>
            ))}
          </div>
        </div>
        <div className="producto-info-detalle">
          <h1 className="producto-nombre">{product.name}</h1>
          <div className="producto-precio-detalle">
            <span className="precio-actual">${product.price.toLocaleString('es-CO')}</span>
          </div>
          <p className="producto-descripcion-larga">{product.description}</p>
          <div className="acciones-detalle">
            {typeof prod.stock === 'number' && prod.stock > 0 ? (
              <>
                <AddToCartButton product={prod} />
                <p style={{ color: '#A67356', fontWeight: 600, marginTop: 8 }}>
                  Disponible: {prod.stock}
                </p>
              </>
            ) : (
              <p style={{ color: '#BA8E7A', fontWeight: 700, fontSize: '1.2rem', marginTop: 8 }}>
                Agotado, comunícate para pedir más<br />
                <a
                  href="https://wa.me/573003476918"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#A67356', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'underline' }}
                >
                  300 3476918 Luisa Escobar
                </a>
              </p>
            )}
          </div>
          
          {/* Códigos del producto */}
          <div className="producto-codigos" style={{
            marginTop: '20px',
            padding: '16px',
            background: '#f9f9f9',
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            {(product as any).sku && (
              <div style={{marginBottom: '8px'}}>
                <strong style={{color: '#FFD700'}}>SKU:</strong> {(product as any).sku}
              </div>
            )}
            {(product as any).barcode && (
              <div style={{marginBottom: '8px'}}>
                <strong style={{color: '#FFD700'}}>Código de barras:</strong> {(product as any).barcode}
              </div>
            )}
            {(product as any).reference && (
              <div>
                <strong style={{color: '#FFD700'}}>Referencia:</strong> {(product as any).reference}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Beneficios */}
      <div className="beneficios">
        <div className="beneficio">
          <span className="beneficio-icono">🚚</span>
          <div>
            <strong>Envío gratis</strong>
            <p>En compras mayores a $150.000</p>
          </div>
        </div>
        <div className="beneficio">
          <span className="beneficio-icono">↩️</span>
          <div>
            <strong>Devolución gratis</strong>
            <p>30 días para devolver</p>
          </div>
        </div>
        <div className="beneficio">
          <span className="beneficio-icono">✓</span>
          <div>
            <strong>Producto original</strong>
            <p>100% garantizado</p>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <div className="productos-relacionados">
          <h2>Productos relacionados</h2>
          <div className="productos-grid-relacionados">
            {relatedProducts.map((relProduct: any) => (
              <Link href={`/productos/${relProduct.id}`} key={relProduct.id} className="producto-card-relacionado">
                <div className="img-wrap-relacionado">
                  <img src={relProduct.imageUrl} alt={relProduct.name} />
                </div>
                <h3>{relProduct.name}</h3>
                <p className="precio-relacionado">${relProduct.price.toLocaleString('es-CO')}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
// Código duplicado y restos eliminados
}