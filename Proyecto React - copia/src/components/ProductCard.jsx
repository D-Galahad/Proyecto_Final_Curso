import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="price">€{product.price.toFixed(2)}</p>
        <p className="desc">{product.description}</p>
        <Link to={`/products/${product.id}`} className="btn">Ver</Link>
      </div>
    </div>
  )
}
