"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
}

export default function MisPedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay usuario logueado
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Cargar pedidos del usuario
    fetchOrders(parsedUser.id);
  }, [router]);

  async function fetchOrders(userId: number) {
    try {
      const response = await fetch(`/api/orders?userId=${userId}`);
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

  async function cancelOrder(orderId: number) {
    if (!confirm('¿Estás seguro de que quieres cancelar este pedido?')) {
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelado' })
      });

      if (response.ok) {
        // Recargar pedidos
        fetchOrders(user.id);
        alert('Pedido cancelado exitosamente');
      }
    } catch (error) {
      console.error('Error al cancelar pedido:', error);
      alert('Error al cancelar el pedido');
    }
  }

  function getStatusBadge(status: string) {
    const styles: Record<string, string> = {
      pendiente: 'background: #fbbf24; color: #78350f;',
      confirmado: 'background: #60a5fa; color: #1e3a8a;',
      enviado: 'background: #a78bfa; color: #4c1d95;',
      entregado: 'background: #34d399; color: #065f46;',
      cancelado: 'background: #f87171; color: #7f1d1d;'
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
        ...(styles[status] && { cssText: styles[status] })
      }}>
        {labels[status] || status}
      </span>
    );
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Mis Pedidos</h1>
        <Link href="/mi-perfil" className="btn btn-secondary">
          ← Volver al Perfil
        </Link>
      </div>

      {orders.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: '#f9fafb',
          borderRadius: '12px'
        }}>
          <h2>No tienes pedidos aún</h2>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            Explora nuestros productos y realiza tu primer pedido
          </p>
          <Link href="/productos" className="btn btn-primary">
            Ver Productos
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => (
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {getStatusBadge(order.status)}
                  {order.status === 'pendiente' && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="btn"
                      style={{
                        background: '#ef4444',
                        color: '#fff',
                        padding: '6px 16px',
                        fontSize: '0.9rem'
                      }}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>

              <div style={{ 
                background: '#f9fafb', 
                padding: '16px', 
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div>
                    <strong>Cliente:</strong> {order.nombre}
                  </div>
                  <div>
                    <strong>Teléfono:</strong> {order.telefono}
                  </div>
                  <div>
                    <strong>Ciudad:</strong> {order.ciudad}
                  </div>
                  <div>
                    <strong>Dirección:</strong> {order.direccion}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <strong style={{ display: 'block', marginBottom: '12px' }}>Productos:</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {order.items.map((item) => (
                    <div key={item.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px',
                      background: '#fff',
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
                        {(item as any).color && (
                          <div style={{ 
                            fontSize: '0.85rem', 
                            color: '#A67356',
                            fontWeight: 600,
                            marginTop: '2px'
                          }}>
                            Color: {(item as any).color}
                          </div>
                        )}
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
