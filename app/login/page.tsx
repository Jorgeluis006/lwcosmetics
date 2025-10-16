"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ correo: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensaje('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        setMensaje('¡Login exitoso!');
        
        // Redirigir al perfil
        setTimeout(() => {
          router.push('/mi-perfil');
        }, 1000);
      } else {
        setMensaje(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
    }
  }

  return (
    <div className="container perfil-form">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Correo
          <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
        </label>
        <label>
          Contraseña
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <button type="submit" className="btn btn-primary">Ingresar</button>
      </form>
      {mensaje && <p className={mensaje.includes('exitoso') ? 'success-message' : 'error-message'}>{mensaje}</p>}
      
      <div className="login-footer">
        <p>¿No tienes cuenta? <Link href="/perfil" className="link-primary">Regístrate aquí</Link></p>
      </div>
    </div>
  );
}
