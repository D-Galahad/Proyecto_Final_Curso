import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    // Pequeño feedback visual
    const btn = e.currentTarget
    const originalText = btn.textContent
    btn.textContent = '✓ Añadido'
    btn.style.background = 'var(--success)'
    setTimeout(() => {
      btn.textContent = originalText
      btn.style.background = ''
    }, 1500)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push('★')
    }
    if (hasHalfStar) {
      stars.push('☆')
    }
    while (stars.length < 5) {
      stars.push('☆')
    }
    return stars.join('')
  }

  return (
    <Link to={`/products/${product.id}`} className="card" style={{ textDecoration: 'none' }}>
      <div className="card-image-wrapper">
        <img src={product.image} alt={product.name} />
        <div className="card-category">{product.category}</div>
      </div>

      <div className="card-body">
        <h3>{product.name}</h3>

        <div className="card-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span style={{ color: 'var(--text-muted)' }}>({product.rating})</span>
        </div>

        <p className="card-desc">{product.description}</p>

        {product.specs && (
          <div style={{ marginBottom: 'var(--space-md)' }}>
            {product.specs.slice(0, 2).map((spec, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  marginRight: '6px',
                  marginBottom: '6px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-muted)'
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        <div className="card-footer">
          <div>
            <div className="price">€{product.price.toFixed(2)}</div>
            <div style={{ fontSize: '0.8rem', color: product.stock > 5 ? 'var(--success)' : 'var(--warning)' }}>
              {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
            </div>
          </div>

          <button
            className="btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{ padding: 'var(--space-sm) var(--space-md)' }}
          >
            🛒 Añadir
          </button>
        </div>
      </div>
    </Link>
  )
}
