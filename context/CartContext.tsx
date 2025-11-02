'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '../types/Product'

interface CartItem extends Product {
  quantity: number
  selectedColor?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number, color?: string) => void
  removeFromCart: (productId: string, color?: string) => void
  updateQuantity: (productId: string, quantity: number, color?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    setIsLoaded(true)
  }, [])

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addToCart = (product: Product, quantity: number = 1, color?: string) => {
    setCart(prevCart => {
      // Buscar si existe el mismo producto con el mismo color
      const itemKey = color ? `${product.id}-${color}` : product.id;
      const existingItem = prevCart.find(item => {
        const existingKey = item.selectedColor ? `${item.id}-${item.selectedColor}` : item.id;
        return existingKey === itemKey;
      });
      
      if (existingItem) {
        // Si el producto ya existe con ese color, aumentar la cantidad
        return prevCart.map(item => {
          const existingKey = item.selectedColor ? `${item.id}-${item.selectedColor}` : item.id;
          return existingKey === itemKey
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item;
        });
      } else {
        // Si es nuevo o tiene diferente color, agregarlo al carrito
        return [...prevCart, { ...product, quantity, selectedColor: color }];
      }
    })
  }

  const removeFromCart = (productId: string, color?: string) => {
    setCart(prevCart => prevCart.filter(item => {
      // Si se especifica color, solo eliminar el ítem con ese color específico
      if (color) {
        return !(item.id === productId && item.selectedColor === color);
      }
      // Si no se especifica color, eliminar todos los ítems con ese productId
      return item.id !== productId;
    }))
  }

  const updateQuantity = (productId: string, quantity: number, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color)
      return
    }

    setCart(prevCart =>
      prevCart.map(item => {
        // Actualizar solo el ítem que coincide con productId y color (si se especifica)
        const isMatch = color 
          ? (item.id === productId && item.selectedColor === color)
          : (item.id === productId && !item.selectedColor);
        
        return isMatch
          ? { ...item, quantity: Math.min(quantity, item.stock) }
          : item;
      })
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}