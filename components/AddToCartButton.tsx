'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Product } from '../types/Product'

interface Props {
  product: {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    stock?: number
    category?: { name: string }
  }
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart()
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const mapped: Product = {
    id: String(product.id),
    name: product.name,
    description: product.description,
    price: Number(product.price),
    category: 'ojos',
    image: product.imageUrl,
    imageUrl: product.imageUrl,
    stock: product.stock ?? 50,
  }

  const handleAdd = () => {
    if (adding) return
    setAdding(true)
    try {
      addToCart(mapped, 1)
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <button
        className="btn btn-primary"
        onClick={handleAdd}
        disabled={adding}
      >
        {adding ? 'Agregando…' : 'Agregar al carrito'}
      </button>
      {added && (
        <span style={{ marginLeft: 12, color: 'var(--primary-color)', fontWeight: 600 }}>
          ¡Agregado!
        </span>
      )}
    </div>
  )
}
