import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CheckoutSuccess() {
  const nav = useNavigate()

  return (
    <div className="container">
      <div className="success-page fade-in">
        <div className="success-icon">✅</div>
        <h2>¡Pedido confirmado!</h2>
        <p>Gracias por tu compra. Recibirás un email con los detalles de tu pedido.</p>
        <p className="success-order-id">Nº pedido: <strong>#{Math.floor(Math.random() * 900000 + 100000)}</strong></p>
        <div className="success-actions">
          <button className="btn" onClick={() => nav('/products')}>
            Seguir comprando
          </button>
          <button className="btn-secondary btn" onClick={() => nav('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  )
}
