"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="container"><p>Cargando pedidos...</p></div>;
  }

  return (
    <div className="container admin-orders">
      <h1>Pedidos de usuarios</h1>
      {orders.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card" style={{border: '1px solid #eee', borderRadius: 8, marginBottom: 24, padding: 16}}>
              <h2>Pedido #{order.id}</h2>
              <p><strong>Usuario:</strong> {order.user?.name || 'Sin usuario'}</p>
              <p><strong>Email:</strong> {order.user?.email || '-'}</p>
              <p><strong>Nombre:</strong> {order.nombre}</p>
              <p><strong>Dirección:</strong> {order.direccion}</p>
              <p><strong>Ciudad:</strong> {order.ciudad}</p>
              <p><strong>Teléfono:</strong> {order.telefono}</p>
              <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString('es-CO')}</p>
              <h3>Productos:</h3>
              <ul>
                {order.items.map((item: any) => (
                  <li key={item.id} style={{marginBottom: 8}}>
                    <strong>{item.product?.name}</strong> x {item.quantity} <br />
                    <span style={{color: '#A67356'}}>Precio: ${item.price.toLocaleString('es-CO')}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <Link href="/admin" className="btn btn-secondary" style={{marginTop: 24}}>Volver al panel</Link>
    </div>
  );
}
