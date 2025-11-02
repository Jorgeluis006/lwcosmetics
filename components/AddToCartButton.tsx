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
    colors?: string[]
  }
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart()
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string>('')

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

  const hasColors = Array.isArray(product.colors) && product.colors.length > 0;

  const handleAdd = () => {
    if (adding) return
    if (hasColors && !selectedColor) {
      alert('Por favor selecciona un color')
      return
    }
    
    setAdding(true)
    try {
      addToCart(mapped, 1, selectedColor || undefined)
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      {hasColors && (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: 600,
            color: '#333'
          }}>
            Selecciona un color:
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {product.colors!.map((color, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedColor(color)}
                style={{
                  padding: '8px 16px',
                  border: selectedColor === color ? '2px solid #A67356' : '1px solid #ddd',
                  background: selectedColor === color ? '#FFF5EB' : '#fff',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: selectedColor === color ? 600 : 400,
                  color: selectedColor === color ? '#A67356' : '#666',
                  transition: 'all 0.2s'
                }}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
      
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
