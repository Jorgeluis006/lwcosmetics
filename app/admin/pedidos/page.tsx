"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    imageUrl: string;
  };
}

interface Order {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('todos');

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(orderId: number, newStatus: string) {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchOrders();
        alert('Estado actualizado exitosamente');
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      alert('Error al actualizar el estado');
    }
  }

  function getStatusBadge(status: string) {
    const styles: Record<string, any> = {
      pendiente: { background: '#fbbf24', color: '#78350f' },
      confirmado: { background: '#60a5fa', color: '#1e3a8a' },
      enviado: { background: '#a78bfa', color: '#4c1d95' },
      entregado: { background: '#34d399', color: '#065f46' },
      cancelado: { background: '#f87171', color: '#7f1d1d' }
    };

    const labels: Record<string, string> = {
      pendiente: 'Pendiente',
      confirmado: 'Confirmado',
      enviado: 'Enviado',
      entregado: 'Entregado',
      cancelado: 'Cancelado'
    };

    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '0.85rem',
        fontWeight: 600,
        ...styles[status]
      }}>
        {labels[status] || status}
      </span>
    );
  }

  const filteredOrders = filter === 'todos' 
    ? orders 
    : orders.filter(order => order.status === filter);

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <h1 style={{ margin: 0 }}>Gestión de Pedidos</h1>
        <Link href="/admin/productos" className="btn btn-secondary">
          ← Volver al Panel
        </Link>
      </div>

      {/* Filtros */}
      <div style={{ 
        marginBottom: '24px', 
        display: 'flex', 
        gap: '12px', 
        flexWrap: 'wrap',
        padding: '16px',
        background: '#f9fafb',
        borderRadius: '8px'
      }}>
        <button 
          onClick={() => setFilter('todos')}
          className="btn"
          style={{
            background: filter === 'todos' ? '#A67356' : '#fff',
            color: filter === 'todos' ? '#fff' : '#333',
            border: '1px solid #e5e7eb'
          }}
        >
          Todos ({orders.length})
        </button>
        <button 
          onClick={() => setFilter('pendiente')}
          className="btn"
          style={{
            background: filter === 'pendiente' ? '#fbbf24' : '#fff',
            color: filter === 'pendiente' ? '#78350f' : '#333',
            border: '1px solid #e5e7eb'
          }}
        >
          Pendientes ({orders.filter(o => o.status === 'pendiente').length})
        </button>
        <button 
          onClick={() => setFilter('confirmado')}
          className="btn"
          style={{
            background: filter === 'confirmado' ? '#60a5fa' : '#fff',
            color: filter === 'confirmado' ? '#1e3a8a' : '#333',
            border: '1px solid #e5e7eb'
          }}
        >
          Confirmados ({orders.filter(o => o.status === 'confirmado').length})
        </button>
        <button 
          onClick={() => setFilter('enviado')}
          className="btn"
          style={{
            background: filter === 'enviado' ? '#a78bfa' : '#fff',
            color: filter === 'enviado' ? '#4c1d95' : '#333',
            border: '1px solid #e5e7eb'
          }}
        >
          Enviados ({orders.filter(o => o.status === 'enviado').length})
        </button>
        <button 
          onClick={() => setFilter('entregado')}
          className="btn"
          style={{
            background: filter === 'entregado' ? '#34d399' : '#fff',
            color: filter === 'entregado' ? '#065f46' : '#333',
            border: '1px solid #e5e7eb'
          }}
        >
          Entregados ({orders.filter(o => o.status === 'entregado').length})
        </button>
      </div>

      {/* Lista de pedidos */}
      {filteredOrders.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: '#f9fafb',
          borderRadius: '12px'
        }}>
          <h2>No hay pedidos {filter !== 'todos' && `en estado "${filter}"`}</h2>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredOrders.map((order) => (
            <div key={order.id} style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'start',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0' }}>Pedido #{order.id}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
                    {new Date(order.createdAt).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  {getStatusBadge(order.status)}
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregado">Entregado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              {/* Información del usuario y cliente */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{ 
                  background: '#f9fafb', 
                  padding: '16px', 
                  borderRadius: '8px'
                }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#6b7280' }}>
                    Usuario Registrado
                  </h4>
                  {order.user ? (
                    <>
                      <p style={{ margin: '4px 0' }}><strong>Nombre:</strong> {order.user.name}</p>
                      <p style={{ margin: '4px 0' }}><strong>Email:</strong> {order.user.email}</p>
                    </>
                  ) : (
                    <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>Usuario invitado</p>
                  )}
                </div>

                <div style={{ 
                  background: '#f9fafb', 
                  padding: '16px', 
                  borderRadius: '8px'
                }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.95rem', color: '#6b7280' }}>
                    Información de Envío
                  </h4>
                  <p style={{ margin: '4px 0' }}><strong>Cliente:</strong> {order.nombre}</p>
                  <p style={{ margin: '4px 0' }}><strong>Teléfono:</strong> {order.telefono}</p>
                  <p style={{ margin: '4px 0' }}><strong>Ciudad:</strong> {order.ciudad}</p>
                  <p style={{ margin: '4px 0' }}><strong>Dirección:</strong> {order.direccion}</p>
                </div>
              </div>

              {/* Productos */}
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ display: 'block', marginBottom: '12px' }}>Productos:</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {order.items.map((item) => (
                    <div key={item.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px',
                      background: '#f9fafb',
                      borderRadius: '6px'
                    }}>
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '6px'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500 }}>{item.product.name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                          Cantidad: {item.quantity} × ${item.price.toLocaleString('es-CO')}
                        </div>
                      </div>
                      <div style={{ fontWeight: 600 }}>
                        ${(item.quantity * item.price).toLocaleString('es-CO')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div style={{ 
                textAlign: 'right', 
                paddingTop: '16px', 
                borderTop: '1px solid #e5e7eb',
                fontSize: '1.2rem',
                fontWeight: 700
              }}>
                Total: ${order.total.toLocaleString('es-CO')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
