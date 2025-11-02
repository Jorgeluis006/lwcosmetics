"use client"
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MiPerfilPage() {
  const [user, setUser] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setPreviewImage(parsedUser.profileImage || null);
    } else {
      // Si no hay usuario logueado, redirigir al login
      router.push('/login');
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('user');
    router.push('/');
  }

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño (máx 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen debe ser menor a 2MB');
      return;
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      alert('Solo se permiten archivos de imagen');
      return;
    }

    setUploading(true);

    // Convertir a Base64
    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageData = event.target?.result as string;
      setPreviewImage(imageData);

      try {
        const response = await fetch('/api/user/profile-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            imageData
          })
        });

        if (response.ok) {
          const data = await response.json();
          // Actualizar localStorage
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
          // Disparar evento para que el Header se actualice
          window.dispatchEvent(new Event('userUpdated'));
          alert('Foto de perfil actualizada correctamente');
        } else {
          throw new Error('Error al subir imagen');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al subir la imagen');
        setPreviewImage(user.profileImage || null);
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(file);
  }

  async function handleRemoveImage() {
    if (!confirm('¿Seguro que quieres eliminar tu foto de perfil?')) return;

    setUploading(true);

    try {
      const response = await fetch(`/api/user/profile-image?userId=${user.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setPreviewImage(null);
        // Disparar evento para que el Header se actualice
        window.dispatchEvent(new Event('userUpdated'));
        alert('Foto de perfil eliminada');
      } else {
        throw new Error('Error al eliminar imagen');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar la imagen');
    } finally {
      setUploading(false);
    }
  }

  function getInitials(name: string) {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  if (!user) {
    return <div className="container"><p>Cargando...</p></div>;
  }

  return (
    <div className="container perfil-view">
      <div className="perfil-card">
        <div className="perfil-avatar-section">
          <div 
            className="perfil-avatar-upload" 
            onClick={handleImageClick}
            style={{ cursor: uploading ? 'wait' : 'pointer' }}
          >
            {previewImage ? (
              <img src={previewImage} alt={user.name} className="perfil-avatar-img" />
            ) : (
              <div className="perfil-avatar-placeholder">
                <span className="perfil-avatar-initials">{getInitials(user.name)}</span>
              </div>
            )}
            <div className="perfil-avatar-overlay">
              <span>{uploading ? '⏳' : '�'}</span>
              <span className="perfil-avatar-text">
                {uploading ? 'Subiendo...' : 'Cambiar foto'}
              </span>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            disabled={uploading}
          />
          {previewImage && (
            <button 
              onClick={handleRemoveImage} 
              className="btn-remove-image"
              disabled={uploading}
            >
              🗑️ Eliminar foto
            </button>
          )}
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
            <>
              <Link href="/admin" className="btn btn-primary" style={{background: '#c026d3'}}>
                ➕ Admin Productos
              </Link>
              <Link href="/admin/pedidos" className="btn btn-primary" style={{background: '#7c3aed'}}>
                🛍️ Admin Pedidos
              </Link>
            </>
          )}
          <button onClick={handleLogout} className="btn btn-secondary">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
}
