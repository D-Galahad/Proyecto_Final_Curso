import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cart } = useCart()

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <nav className="nav">
      <div className="nav-links">
        <Link to="/" className="brand">⚡ TechStore</Link>
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
      </div>

      <div className="nav-links">
        {user ? (
          <>
            <Link to="/profile" className="user">👤 {user.username}</Link>
            <Link
              to="/cart"
              className={cartCount > 0 ? 'cart-badge' : ''}
              data-count={cartCount > 0 ? cartCount : null}
            >
              🛒 Carrito
            </Link>
            <button onClick={logout} className="btn-link">Salir</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar sesion</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  )
}