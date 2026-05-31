import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function ProductCard({ product }) {
  if (!product) return null

  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()   // evita que el <Link> navegue
    e.stopPropagation()  // evita que el evento suba al Link
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    for (let i = 0; i < fullStars; i++) stars.push('★')
    if (hasHalfStar) stars.push('☆')
    while (stars.length < 5) stars.push('☆')
    return stars.join('')
  }

  return (
    <Link to={`/products/${product.id}`} className="card">
      <div className="card-image-wrapper">
        <img src={product.image} alt={product.name} />
        <div className="card-category">{product.category}</div>
      </div>

      <div className="card-body">
        <h3>{product.name}</h3>

        <div className="card-rating">
          <span className="stars">{renderStars(product.rating || 0)}</span>
          <span className="rating-value">({product.rating || 0})</span>
        </div>

        {product.specs && (
          <div className="spec-list">
            {product.specs.slice(0, 2).map((spec, idx) => (
              <span key={idx} className="spec-tag">{spec}</span>
            ))}
          </div>
        )}

        <div className="card-footer">
          <div>
            <div className="price">€{(product.price || 0).toFixed(2)}</div>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              marginTop: 2,
              color: (product.stock || 0) === 0 ? 'var(--error)' : (product.stock || 0) <= 5 ? 'var(--warning)' : 'var(--success)'
            }}>
              {(product.stock || 0) === 0 ? '✗ Agotado' : (product.stock || 0) <= 5 ? `⚠ Solo ${product.stock}` : '✓ En stock'}
            </div>
          </div>

          <button
            className={`btn btn-cart${added ? ' btn-added' : ''}`}
            onClick={handleAddToCart}
            disabled={(product.stock || 0) === 0}
            style={{
              opacity: (product.stock || 0) === 0 ? 0.5 : 1,
              background: added ? 'var(--success)' : undefined,
              transition: 'background 0.3s'
            }}
          >
            {added ? '✓ Añadido' : '🛒 Añadir'}
          </button>
        </div>
      </div>
    </Link>
  )
}
