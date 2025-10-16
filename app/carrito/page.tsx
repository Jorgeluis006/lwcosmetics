'use client'

import { useCart } from '../../context/CartContext'
import Link from 'next/link'
import './carrito.css'

export default function CarritoPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart()

  if (cart.length === 0) {
    return (
      <div className="carrito-vacio">
        <div className="vacio-content">
          <span className="vacio-icon">🛒</span>
          <h1>Tu carrito está vacío</h1>
          <p>¡Agrega productos para comenzar tu compra!</p>
          <Link href="/productos" className="btn btn-primary btn-large">
            Ver productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="carrito-page">
      <h1 className="carrito-title">Mi Carrito</h1>
      <p className="carrito-subtitle">{getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}</p>

      <div className="carrito-content">
        {/* Lista de productos */}
        <div className="carrito-productos">
          {cart.map((item) => (
            <div key={item.id} className="carrito-item">
              <Link href={`/productos/${item.id}`} className="item-imagen">
                <img src={item.imageUrl} alt={item.name} />
              </Link>

              <div className="item-info">
                <Link href={`/productos/${item.id}`}>
                  <h3>{item.name}</h3>
                </Link>
                <p className="item-precio">${item.price.toLocaleString('es-CO')}</p>
                <p className="item-descripcion">{item.description}</p>
              </div>

              <div className="item-cantidad">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="cantidad-btn"
                >
                  -
                </button>
                <span className="cantidad-display">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="cantidad-btn"
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>

              <div className="item-total">
                <p className="total-precio">
                  ${(item.price * item.quantity).toLocaleString('es-CO')}
                </p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="btn-eliminar"
                  title="Eliminar producto"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del carrito */}
        <div className="carrito-resumen">
          <h2>Resumen del pedido</h2>
          
          <div className="resumen-detalles">
            <div className="resumen-linea">
              <span>Subtotal ({getTotalItems()} productos)</span>
              <span>${getTotalPrice().toLocaleString('es-CO')}</span>
            </div>
            <div className="resumen-linea">
              <span>Envío</span>
              <span className="envio-gratis">
                {getTotalPrice() >= 150000 ? 'GRATIS' : `$${(10000).toLocaleString('es-CO')}`}
              </span>
            </div>
            {getTotalPrice() < 150000 && (
              <div className="mensaje-envio">
                <p>💡 Agrega ${(150000 - getTotalPrice()).toLocaleString('es-CO')} más para envío gratis</p>
              </div>
            )}
            <div className="resumen-divider"></div>
            <div className="resumen-linea total-linea">
              <span>Total</span>
              <span className="total-amount">
                ${(getTotalPrice() + (getTotalPrice() >= 150000 ? 0 : 10000)).toLocaleString('es-CO')}
              </span>
            </div>
          </div>

          <Link href="/checkout" className="btn btn-checkout">
            Proceder al pago
          </Link>

          <Link href="/productos" className="continuar-comprando">
            ← Continuar comprando
          </Link>

          <div className="beneficios-carrito">
            <div className="beneficio">
              <span>✓</span>
              <span>Compra segura</span>
            </div>
            <div className="beneficio">
              <span>✓</span>
              <span>Devolución gratis</span>
            </div>
            <div className="beneficio">
              <span>✓</span>
              <span>Productos originales</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}