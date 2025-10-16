import Link from 'next/link'

export default function Products({ products = [] }: { products?: any[] }) {
  return (
    <section>
      <h1>Productos</h1>
      <ul className="grid">
        {products.map((p: any) => (
          <li key={p.id} className="card">
            <div className="card-body">
              <div className="card-media">📦</div>
              <div>
                <h3>{p.name}</h3>
                <p className="muted">{p.description}</p>
                <p className="price">${(p.price / 100).toFixed(2)}</p>
                <Link href={`/productos/${p.id}`} className="btn">Ver</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export async function getStaticProps() {
  // datos de ejemplo
  const products = [
    { id: 'p1', name: 'Camiseta', description: 'Camiseta de algodón', price: 1999 },
    { id: 'p2', name: 'Taza', description: 'Taza cerámica', price: 999 }
  ]

  return { props: { products } }
}
