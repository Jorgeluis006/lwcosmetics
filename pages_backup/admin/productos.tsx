import { useState, FormEvent } from 'react'
import { Product, categories } from '../../types/Product'

export default function AdminProducts() {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'ojos',
    image: '',
    stock: 0,
    brand: 'LW Cosmetics'
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar el producto
    console.log('Producto a guardar:', newProduct)
    alert('Producto guardado con éxito')
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: 'ojos',
      image: '',
      stock: 0,
      brand: 'LW Cosmetics'
    })
  }

  return (
    <div className="container admin-page">
      <h1 className="admin-title">Agregar Nuevo Producto</h1>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              id="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value as Product['category']})}
            required
          >
            {Object.entries(categories).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">URL de la Imagen</label>
          <input
            type="url"
            id="image"
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Marca</label>
          <input
            type="text"
            id="brand"
            value={newProduct.brand}
            onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
          />
        </div>

        <button type="submit" className="btn btn-primary">Guardar Producto</button>
      </form>
    </div>
  )
}