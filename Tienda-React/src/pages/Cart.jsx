import React from 'react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { cart, updateQty, removeItem, clearCart, total } = useCart()
  const { user } = useAuth()
  const nav = useNavigate()

  if (!user) return <div className="container">Tienes que <button onClick={() => nav('/login')}>iniciar sesión</button> para ver el carrito.</div>

  function handleRemove(id) {
    if (window.confirm('¿Eliminar este producto del carrito?')) removeItem(id)
  }

  return (
    <div className="container">
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((it) => (
                <tr key={it.id}>
                  <td>{it.name}</td>
                  <td>
                    <input type="number" min="1" value={it.qty} onChange={(e) => updateQty(it.id, Math.max(1, Number(e.target.value)))} />
                  </td>
                  <td>€{(it.price * it.qty).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemove(it.id)} className="btn-link">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-summary">
            <p>Total: <strong>€{total.toFixed(2)}</strong></p>
            <button className="btn" onClick={() => { if (window.confirm('Confirmar compra (demo)')) { clearCart(); alert('Gracias por la compra demo') } }}>Pagar (demo)</button>
          </div>
        </>
      )}
    </div>
  )
}
