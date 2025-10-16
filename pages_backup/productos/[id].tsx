import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

export default function Product({ product }: { product: any }) {
  if (!product) return <main className="container"><p>Producto no encontrado</p></main>

  return (
    <article className="product-detail">
      <div className="product-grid">
        <div className="media">📦</div>
        <div>
          <h1>{product.name}</h1>
          <p className="muted">{product.description}</p>
          <p className="price">${(product.price / 100).toFixed(2)}</p>
          <form action="/api/checkout" method="POST">
            <input type="hidden" name="priceId" value={product.id} />
            <button className="btn btn-primary" type="submit">Pagar</button>
          </form>
          <p><Link href="/productos" className="link-muted">← Volver</Link></p>
        </div>
      </div>
    </article>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = [{ id: 'p1' }, { id: 'p2' }]
  return { paths: products.map(p => ({ params: { id: p.id } })), fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const all = [
    { id: 'p1', name: 'Camiseta', description: 'Camiseta de algodón', price: 1999 },
    { id: 'p2', name: 'Taza', description: 'Taza cerámica', price: 999 }
  ]
  const product = all.find(p => p.id === params?.id) || null
  return { props: { product } }
}
