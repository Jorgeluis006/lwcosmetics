"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MiPerfilPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Si no hay usuario logueado, redirigir al login
      router.push('/login');
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('user');
    router.push('/');
  }

  if (!user) {
    return <div className="container"><p>Cargando...</p></div>;
  }

  return (
    <div className="container perfil-view">
      <div className="perfil-card">
        <div className="perfil-avatar">
          <span className="avatar-icon">👤</span>
        </div>
        <h1>Mi Perfil</h1>
        <div className="perfil-info">
          <div className="info-item">
            <span className="info-label">Nombre:</span>
            <span className="info-value">{user.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Correo:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">ID de usuario:</span>
            <span className="info-value">#{user.id}</span>
          </div>
        </div>
        <div className="perfil-actions">
          <Link href="/mis-pedidos" className="btn btn-primary" style={{background: '#A67356'}}>
            📦 Mis Pedidos
          </Link>
          <Link href="/productos" className="btn btn-primary">Ver Productos</Link>
          {user?.isAdmin && (
            <Link href="/admin/pedidos" className="btn btn-primary" style={{background: '#7c3aed'}}>
              🛍️ Admin Pedidos
            </Link>
          )}
          <button onClick={handleLogout} className="btn btn-secondary">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
}
