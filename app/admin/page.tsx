"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  images?: string[];
  stock: number;
  category: { id: number; name: string };
}

interface Category {
  id: number;
  name: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imageError, setImageError] = useState(false);
  const [form, setForm] = useState({
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  images: [''],
  colors: [''],
  stock: '',
  categoryId: '',
  sku: '',
  barcode: '',
  reference: ''
  });
  const router = useRouter();

  useEffect(() => {
    async function checkAdmin() {
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/login');
        return;
      }

      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Verificar si el usuario es admin desde la base de datos
      try {
        const response = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: parsedUser.id })
        });

        const data = await response.json();

        if (data.isAdmin) {
          setIsAdmin(true);
          loadProducts();
          loadCategories();
        } else {
          alert('No tienes permisos de administrador');
          router.push('/');
        }
      } catch (error) {
        console.error('Error al verificar permisos:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    }

    checkAdmin();
  }, [router]);

  async function loadProducts() {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }

  async function loadCategories() {
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();
      console.log('Categorías cargadas:', data);
      setCategories(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === 'imageUrl') {
      setImageError(false);
    }
    if (name.startsWith('images[')) {
      const idx = parseInt(name.match(/images\[(\d+)\]/)?.[1] || '0');
      const newImages = [...form.images];
      newImages[idx] = value;
      setForm({ ...form, images: newImages });
    } else if (name.startsWith('colors[')) {
      const idx = parseInt(name.match(/colors\[(\d+)\]/)?.[1] || '0');
      const newColors = [...form.colors];
      newColors[idx] = value;
      setForm({ ...form, colors: newColors });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const productData = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      imageUrl: form.imageUrl,
      images: form.images.filter((img: string) => img.trim() !== ''),
      colors: form.colors.filter((color: string) => color.trim() !== ''),
      stock: parseInt(form.stock),
      categoryId: parseInt(form.categoryId),
      sku: form.sku || null,
      barcode: form.barcode || null,
      reference: form.reference || null
    };

    try {
      if (editingProduct) {
        // Actualizar producto
        await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        alert('Producto actualizado correctamente');
      } else {
        // Crear nuevo producto
        await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        alert('Producto creado correctamente');
      }
      
  setShowForm(false);
  setEditingProduct(null);
  setForm({ name: '', description: '', price: '', imageUrl: '', images: [''], colors: [''], stock: '', categoryId: '', sku: '', barcode: '', reference: '' });
      loadProducts();
    } catch (error) {
      alert('Error al guardar el producto');
    }
  }

  async function handleDelete(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await fetch(`/api/admin/products/${id}`, {
          method: 'DELETE'
        });
        alert('Producto eliminado correctamente');
        loadProducts();
      } catch (error) {
        alert('Error al eliminar el producto');
      }
    }
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl,
      images: product.images && product.images.length > 0 ? product.images : [''],
      colors: (product as any).colors && (product as any).colors.length > 0 ? (product as any).colors : [''],
      stock: product.stock?.toString() || '',
      categoryId: product.category.id.toString(),
      sku: (product as any).sku || '',
      barcode: (product as any).barcode || '',
      reference: (product as any).reference || ''
    });
    setShowForm(true);
  }

  if (!user) {
    return <div className="container"><p>Cargando...</p></div>;
  }

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>Verificando permisos...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // El redirect se maneja en useEffect
  }

  return (
    <div className="container admin-panel">
      <div className="admin-header">
        <h1>Panel de Administrador</h1>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <button 
            onClick={() => {
              setShowForm(!showForm);
              setEditingProduct(null);
              setForm({ name: '', description: '', price: '', imageUrl: '', images: [''], colors: [''], stock: '', categoryId: '', sku: '', barcode: '', reference: '' });
            }}
            className="btn btn-primary"
          >
            {showForm ? 'Cancelar' : '+ Agregar Producto'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="admin-form-container">
          <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-grid">
              <div className="admin-form-fields">
                <label>
                  Imágenes adicionales
                  {form.images.map((img: string, idx: number) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <input
                        type="url"
                        name={`images[${idx}]`}
                        value={img}
                        onChange={handleChange}
                        placeholder={`URL de imagen #${idx + 1}`}
                        style={{ flex: 1 }}
                      />
                      <button type="button" onClick={() => {
                        const newImages = form.images.filter((_, i) => i !== idx);
                        setForm({ ...form, images: newImages.length ? newImages : [''] });
                      }} style={{ color: '#BA8E7A', fontWeight: 700 }}>🗑️</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setForm({ ...form, images: [...form.images, ''] })} style={{ marginTop: 4 }}>+ Agregar imagen</button>
                </label>
                <label>
                  Colores disponibles
                  {form.colors.map((color: string, idx: number) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <input
                        type="text"
                        name={`colors[${idx}]`}
                        value={color}
                        onChange={handleChange}
                        placeholder={`Ej: Rojo, #FF0000, etc.`}
                        style={{ flex: 1 }}
                      />
                      <button type="button" onClick={() => {
                        const newColors = form.colors.filter((_, i) => i !== idx);
                        setForm({ ...form, colors: newColors.length ? newColors : [''] });
                      }} style={{ color: '#BA8E7A', fontWeight: 700 }}>🗑️</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setForm({ ...form, colors: [...form.colors, ''] })} style={{ marginTop: 4 }}>+ Agregar color</button>
                </label>
                <label>
                  Cantidad disponible (stock)
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </label>
                <label>
                  Nombre del Producto
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Descripción
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={3}
                  />
                </label>

                <label>
                  Precio (COP)
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="100"
                  />
                </label>

                <label>
                  URL de la Imagen
                  <input
                    type="url"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    required
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  <small className="image-hint">Pega una URL https válida. Recomendado 600x600px, JPG o PNG.</small>
                </label>

                <label>
                  Categoría {categories.length > 0 && `(${categories.length} disponibles)`}
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  SKU (Opcional)
                  <input
                    type="text"
                    name="sku"
                    value={form.sku}
                    onChange={handleChange}
                    placeholder="Ej: 4907gi"
                  />
                </label>

                <label>
                  Código de barras (Opcional)
                  <input
                    type="text"
                    name="barcode"
                    value={form.barcode}
                    onChange={handleChange}
                    placeholder="Ej: 1000111"
                  />
                </label>

                <label>
                  Referencia (Opcional)
                  <input
                    type="text"
                    name="reference"
                    value={form.reference}
                    onChange={handleChange}
                    placeholder="Ej: PPL1754"
                  />
                </label>
              </div>

              <div className="admin-image-section">
                <div className="image-preview">
                  {form.imageUrl && !imageError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={form.imageUrl}
                      alt={form.name || 'Vista previa'}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span className="image-emoji">🖼️</span>
                      <p>{form.imageUrl ? 'No se pudo cargar la imagen' : 'Sin vista previa'}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingProduct ? 'Actualizar' : 'Crear'} Producto
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-products">
        <h2>Productos ({products.length})</h2>
        <div className="products-table">
          {products.map((product) => (
            <div key={product.id} className="product-row">
              <img src={product.imageUrl} alt={product.name} className="product-thumb" />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p className="product-category">{product.category.name}</p>
                <p className="product-price">${product.price.toLocaleString('es-CO')}</p>
              </div>
              <div className="product-actions">
                <button onClick={() => handleEdit(product)} className="btn-edit">
                  ✏️ Editar
                </button>
                <button onClick={() => handleDelete(product.id)} className="btn-delete">
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
