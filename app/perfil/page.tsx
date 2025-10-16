"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function PerfilPage() {
  const [form, setForm] = useState({ nombre: '', correo: '', password: '' });
  const [mensaje, setMensaje] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensaje('');

    try {
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje('¡Perfil creado correctamente!');
        setForm({ nombre: '', correo: '', password: '' });
      } else {
        setMensaje(data.error || 'Error al crear el perfil');
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
    }
  }

  return (
    <div className="container perfil-form">
      <h1>Crear perfil</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Nombre
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>
        <label>
          Correo
          <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
        </label>
        <label>
          Contraseña
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <button type="submit" className="btn btn-primary">Crear perfil</button>
      </form>
      {mensaje && <p className={mensaje.includes('correctamente') ? 'success-message' : 'error-message'}>{mensaje}</p>}
      
      <div className="login-footer">
        <p>¿Ya tienes cuenta? <Link href="/login" className="link-primary">Inicia sesión aquí</Link></p>
      </div>
    </div>
  );
}
