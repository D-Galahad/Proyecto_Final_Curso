import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProduct, useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import { useCart } from '../contexts/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const { addItem } = useCart()
  const { product, loading, error } = useProduct(id)
  const { products } = useProducts()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (loading) return <div className="container"><p>Cargando...</p></div>
  if (error || !product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
        <h2>Producto no encontrado</h2>
        <button onClick={() => nav('/products')} className="btn">Ver todos los productos</button>
      </div>
    )
  }

  const specs = product.specs ? JSON.parse(product.specs) : []
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const renderStars = (rating) => {
    const stars = []
    const full = Math.floor(rating ?? 0)
    for (let i = 0; i < full; i++) stars.push('★')
    if ((rating ?? 0) % 1 >= 0.5) stars.push('☆')
    while (stars.length < 5) stars.push('☆')
    return stars.join('')
  }

  return (
    <div className="container">
      <div style={{ marginBottom: 'var(--space-lg)', fontSize: '0.9rem' }}>
        <Link to="/" style={{ color: 'var(--text-muted)' }}>Inicio</Link>
        {' / '}
        <Link to="/products" style={{ color: 'var(--text-muted)' }}>Productos</Link>
        {' / '}
        <Link to={`/products?category=${product.category}`} style={{ color: 'var(--text-muted)' }}>{product.category}</Link>
        {' / '}
        <span>{product.name}</span>
      </div>

      <div className="detail">
        <div>
          <img src={product.image} alt={product.name} className="detail-image" />
        </div>
        <div className="detail-info">
          <div>
            <span style={{ display: 'inline-block', padding: '6px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', marginBottom: 'var(--space-md)' }}>
              {product.category}
            </span>
            <h1 style={{ marginBottom: 'var(--space-sm)' }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
              <div style={{ color: '#ffc107', fontSize: '1.2rem' }}>{renderStars(product.rating)}</div>
              <span style={{ color: 'var(--text-muted)' }}>({product.rating})</span>
              <span style={{ color: (product.stock ?? 0) > 5 ? 'var(--success)' : 'var(--warning)', fontWeight: 600, fontSize: '0.9rem' }}>
                {(product.stock ?? 0) > 0 ? `✓ ${product.stock} en stock` : '✗ Agotado'}
              </span>
            </div>
          </div>

          <div className="price" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-lg)' }}>
            €{(product.price ?? 0).toFixed(2)}
          </div>
          <p style={{ lineHeight: 1.7, marginBottom: 'var(--space-lg)' }}>{product.description}</p>

          {specs.length > 0 && (
            <div style={{ marginBottom: 'var(--space-xl)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-md)' }}>Especificaciones</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                {specs.map((spec, idx) => (
                  <span key={idx} style={{ padding: '8px 16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', fontWeight: 500 }}>{spec}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-md)' }}>Cantidad</h3>
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>−</button>
              <input type="number" className="quantity-input" value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value) || 1)))}
                min="1" max={product.stock} />
              <button className="quantity-btn" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock}>+</button>
            </div>
          </div>

          <button className="btn" onClick={handleAddToCart} disabled={(product.stock ?? 0) === 0}
            style={{ width: '100%', padding: 'var(--space-lg)', fontSize: '1.1rem', background: addedToCart ? 'var(--success)' : undefined }}>
            {addedToCart ? '✓ Añadido al carrito' : '🛒 Añadir al carrito'}
          </button>
          {(product.stock ?? 0) === 0 && (
            <p style={{ color: 'var(--error)', marginTop: 'var(--space-md)', textAlign: 'center' }}>Este producto esta agotado</p>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section style={{ marginTop: 'var(--space-3xl)' }}>
          <h2>Productos relacionados</h2>
          <div className="grid">
            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}