import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cart } = useCart()

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">DAW Shop</Link>
        <Link to="/products">Productos</Link>
      </div>
      <div className="nav-right">
        <Link to="/cart">Carrito ({cart.length})</Link>
        {user ? (
          <>
            <span className="user">{user.email}</span>
            <button onClick={logout} className="btn-link">Cerrar sesión</button>
          </>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
      </div>
    </nav>
  )
}
