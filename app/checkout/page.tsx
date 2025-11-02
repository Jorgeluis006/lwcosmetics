"use client"
import { useCart } from '../../context/CartContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Hook para obtener cantidad disponible de cada producto
function useProductStock(cart: { id: number }[]) {
  const [stockMap, setStockMap] = useState<Record<number, number>>({});
  useEffect(() => {
    async function fetchStock() {
      const res = await fetch('/api/admin/products');
      const products: { id: number; stock: number }[] = await res.json();
      const map: Record<number, number> = {};
      products.forEach((p) => { map[p.id] = p.stock });
      setStockMap(map);
    }
    fetchStock();
  }, [cart]);
  return stockMap;
}

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    telefono: ''
  });
  const [procesando, setProcesando] = useState(false);
  const [pagoConfirmado, setPagoConfirmado] = useState(false);
  const stockMap = useProductStock(cart.map(item => ({ id: Number(item.id) })));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProcesando(true);

    // Descontar stock en la base de datos
    try {
      await fetch('/api/products/decrement-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({ id: item.id, quantity: item.quantity }))
        })
      });
      // Guardar pedido en la base de datos
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || null,
          userEmail: user?.email || null,
          nombre: form.nombre,
          direccion: form.direccion,
          ciudad: form.ciudad,
          telefono: form.telefono,
          items: cart.map(item => ({
            productId: Number(item.id),
            quantity: item.quantity,
            price: item.price
          }))
        })
      });

      if (response.ok) {
        setPagoConfirmado(true);
        setProcesando(false);
        
        // Redirigir a Mis Pedidos si está logueado, sino a inicio
        setTimeout(() => {
          clearCart();
          if (user) {
            router.push('/mis-pedidos');
          } else {
            router.push('/');
          }
        }, 3000);
      } else {
        throw new Error('Error al crear pedido');
      }
    } catch (err) {
      console.error('Error al procesar pedido:', err);
      setProcesando(false);
      alert('Error al procesar el pedido. Por favor intenta de nuevo.');
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container checkout-empty">
        <h1>Tu carrito está vacío</h1>
        <p>Agrega productos antes de proceder al pago</p>
        <Link href="/productos" className="btn btn-primary">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="container checkout-container">
      <h1 className="checkout-title">Finalizar Compra</h1>
      
      <div className="checkout-grid">
        {/* Resumen del pedido */}
        <div className="order-summary">
          <h2>Resumen del Pedido</h2>
          <div className="order-items">
            {cart.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.imageUrl} alt={item.name} className="order-item-img" />
                <div className="order-item-info">
                  <h4>{item.name}</h4>
                  <p>Cantidad: {item.quantity}</p>
                  <p className="order-item-price">${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                  <p style={{ color: '#A67356', fontWeight: 600, marginTop: 4 }}>
                    Disponible: {typeof stockMap[Number(item.id)] === 'number' ? stockMap[Number(item.id)] : '...'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total:</span>
            <span className="total-price">${getTotalPrice().toLocaleString('es-CO')}</span>
          </div>
        </div>

        {/* Formulario de información y método de pago */}
        <div className="payment-form-container">
          <h2>Información de Envío</h2>
          <form onSubmit={handleSubmit} className="payment-form">
            <label>
              Nombre Completo
              <input 
                type="text" 
                name="nombre" 
                value={form.nombre} 
                onChange={handleChange} 
                required 
                placeholder="Juan Pérez"
              />
            </label>
            
            <label>
              Dirección
              <input 
                type="text" 
                name="direccion" 
                value={form.direccion} 
                onChange={handleChange} 
                required 
                placeholder="Calle 123 #45-67"
              />
            </label>
            
            <label>
              Ciudad
              <input 
                type="text" 
                name="ciudad" 
                value={form.ciudad} 
                onChange={handleChange} 
                required 
                placeholder="Bogotá"
              />
            </label>
            
            <label>
              Teléfono
              <input 
                type="tel" 
                name="telefono" 
                value={form.telefono} 
                onChange={handleChange} 
                required 
                placeholder="300 123 4567"
              />
            </label>

            {/* Instrucciones de pago por Nequi */}
            <div className="nequi-payment-info">
              <h3>💳 Método de Pago</h3>
              <div className="nequi-box">
                <div className="nequi-icon">📱</div>
                <h4>Pago por Nequi</h4>
                <p className="nequi-instructions">
                  Para completar tu pedido, realiza la transferencia al siguiente número de Nequi:
                </p>
                <div className="nequi-number">
                  <span className="number-label">Número Nequi:</span>
                  <span className="number-value">300 347 6918</span>
                </div>
                <div className="nequi-amount">
                  <span className="amount-label">Valor a pagar:</span>
                  <span className="amount-value">${getTotalPrice().toLocaleString('es-CO')}</span>
                </div>
                <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #0066cc' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '10px', color: '#0066cc' }}>Otras Opciones de Pago:</p>
                  <div style={{ marginBottom: '10px' }}>
                    <p style={{ margin: '5px 0' }}><strong>💳 Nequi - Llave:</strong> 300 347 6918</p>
                    <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>Luisa Escobar</p>
                  </div>
                  <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '10px' }}>
                    <p style={{ margin: '5px 0' }}><strong>🏦 Davivienda - Cuenta de Ahorros:</strong></p>
                    <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>0550002400124968</p>
                    <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>Luisa Escobar</p>
                  </div>
                </div>
                <p className="nequi-note">
                  ⚠️ Importante: Una vez realices el pago, envía el comprobante por WhatsApp al <strong>312 423 9687</strong> para confirmar tu pedido.
                </p>
              </div>
            </div>

            {pagoConfirmado ? (
              <div className="success-message-box">
                <div className="success-icon">✅</div>
                <h3>¡Pedido Registrado!</h3>
                <p>Hemos recibido tu información. Por favor realiza el pago por Nequi y envía el comprobante para confirmar tu pedido.</p>
              </div>
            ) : (
              <button 
                type="submit" 
                className="btn btn-primary btn-large" 
                disabled={procesando}
              >
                {procesando ? 'Procesando...' : 'Confirmar Pedido'}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
