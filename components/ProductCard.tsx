'use client'

import { useState } from 'react'
import Link from 'next/link'
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

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart()
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const hasColors = Array.isArray(product.colors) && product.colors.length > 0

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
    if (hasColors && !selectedColor) {
      alert('Por favor selecciona un color')
      return
    }
    
    setAdding(true)
    try {
      addToCart(mapped, 1, selectedColor || undefined)
      setAdded(true)
      setTimeout(() => {
        setAdded(false)
        setSelectedColor('') // Reset color selection
      }, 1500)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="product-card modern-card">
      <div className="product-img-wrap">
        <img src={product.imageUrl} alt={product.name} className="product-img" />
        <button className="fav-btn" title="Favorito">♡</button>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString('es-CO')}</p>
        
        {/* Selector de colores */}
        {hasColors && (
          <div style={{ marginBottom: '12px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px', 
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#333'
            }}>
              Color:
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {product.colors!.map((color, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  style={{
                    padding: '6px 12px',
                    border: selectedColor === color ? '2px solid #A67356' : '1px solid #ddd',
                    background: selectedColor === color ? '#FFF5EB' : '#fff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
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

        <div className="product-actions" style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          {typeof product.stock === 'number' && product.stock > 0 ? (
            <>
              <button
                onClick={handleAdd}
                disabled={adding}
                className="btn btn-sm btn-primary"
                style={{ width: '100%' }}
              >
                {adding ? '➕...' : added ? '✓ Agregado' : '🛒 Agregar'}
              </button>
              <Link href={`/productos/${product.id}`} className="btn btn-sm btn-secondary" style={{ width: '100%' }}>
                👁️ Ver detalles
              </Link>
            </>
          ) : (
            <Link href={`/productos/${product.id}`} className="btn btn-sm btn-primary" style={{ width: '100%' }}>
              👁️ Ver detalles
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
