import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

// Formatea número de tarjeta con espacios cada 4 dígitos
function formatCardNumber(value) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

// Formatea expiración como MM/AA
function formatExpiry(value) {
  const clean = value.replace(/\D/g, '').slice(0, 4)
  if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2)
  return clean
}

// Detecta tipo de tarjeta por número
function detectCardType(number) {
  const n = number.replace(/\s/g, '')
  if (/^4/.test(n)) return 'visa'
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'mastercard'
  if (/^3[47]/.test(n)) return 'amex'
  return null
}

const CARD_ICONS = {
  visa: '💳 Visa',
  mastercard: '💳 Mastercard',
  amex: '💳 Amex',
}

export default function Checkout() {
  const { cart, total, clearCart } = useCart()
  const { user } = useAuth()
  const nav = useNavigate()

  const [payMethod, setPayMethod] = useState('card') // 'card' | 'paypal' | 'bizum'
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
    city: '',
    zip: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  if (!user) {
    return (
      <div className="container">
        <p>Tienes que <button className="btn-link" onClick={() => nav('/login')}>iniciar sesión</button> para finalizar la compra.</p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container">
        <p>Tu carrito está vacío. <button className="btn-link" onClick={() => nav('/products')}>Ver productos</button></p>
      </div>
    )
  }

  function handleChange(e) {
    let { name, value } = e.target
    if (name === 'cardNumber') value = formatCardNumber(value)
    if (name === 'expiry') value = formatExpiry(value)
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 4)
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.address.trim()) errs.address = 'Dirección requerida'
    if (!form.city.trim()) errs.city = 'Ciudad requerida'
    if (!form.zip.trim()) errs.zip = 'Código postal requerido'
    if (payMethod === 'card') {
      if (!form.name.trim()) errs.name = 'Nombre del titular requerido'
      const digits = form.cardNumber.replace(/\s/g, '')
      if (digits.length < 13) errs.cardNumber = 'Número de tarjeta no válido'
      if (!form.expiry || form.expiry.length < 5) errs.expiry = 'Fecha de expiración no válida'
      if (form.cvv.length < 3) errs.cvv = 'CVV no válido'
    }
    return errs
  }

  async function handleSubmit() {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    // Simulamos procesamiento de pago
    await new Promise(r => setTimeout(r, 1800))
    clearCart()
    nav('/checkout/success')
  }

  const cardType = detectCardType(form.cardNumber)

  return (
    <div className="container">
      <h2>Finalizar compra</h2>
      <div className="checkout-layout">
        {/* ---- Panel izquierdo: formulario ---- */}
        <div className="checkout-form-panel">

          {/* Dirección de envío */}
          <section className="checkout-section">
            <h3>📦 Dirección de envío</h3>
            <div className="form-group">
              <label>Dirección</label>
              <input
                type="text"
                name="address"
                placeholder="Calle y número"
                value={form.address}
                onChange={handleChange}
              />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Tu ciudad"
                  value={form.city}
                  onChange={handleChange}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>Código postal</label>
                <input
                  type="text"
                  name="zip"
                  placeholder="00000"
                  value={form.zip}
                  onChange={handleChange}
                />
                {errors.zip && <span className="error">{errors.zip}</span>}
              </div>
            </div>
          </section>

          {/* Método de pago */}
          <section className="checkout-section">
            <h3>💳 Método de pago</h3>
            <div className="pay-methods">
              {[
                { id: 'card', label: '💳 Tarjeta', desc: 'Visa / Mastercard / Amex' },
                { id: 'paypal', label: '🅿️ PayPal', desc: 'Pago seguro con PayPal' },
                { id: 'bizum', label: '📱 Bizum', desc: 'Pago por móvil' },
              ].map(m => (
                <button
                  key={m.id}
                  className={`pay-method-btn${payMethod === m.id ? ' active' : ''}`}
                  onClick={() => setPayMethod(m.id)}
                  type="button"
                >
                  <span className="pay-method-icon">{m.label}</span>
                  <span className="pay-method-desc">{m.desc}</span>
                </button>
              ))}
            </div>

            {payMethod === 'card' && (
              <div className="card-form fade-in">
                <div className="form-group">
                  <label>Nombre del titular</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Como aparece en la tarjeta"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="cc-name"
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label>
                    Número de tarjeta
                    {cardType && <span className="card-type-badge">{CARD_ICONS[cardType]}</span>}
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    value={form.cardNumber}
                    onChange={handleChange}
                    autoComplete="cc-number"
                    inputMode="numeric"
                  />
                  {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiración</label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/AA"
                      value={form.expiry}
                      onChange={handleChange}
                      autoComplete="cc-exp"
                      inputMode="numeric"
                    />
                    {errors.expiry && <span className="error">{errors.expiry}</span>}
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="···"
                      value={form.cvv}
                      onChange={handleChange}
                      autoComplete="cc-csc"
                      inputMode="numeric"
                    />
                    {errors.cvv && <span className="error">{errors.cvv}</span>}
                  </div>
                </div>
              </div>
            )}

            {payMethod === 'paypal' && (
              <div className="alt-pay-info fade-in">
                <p>Al confirmar serás redirigido a PayPal para completar el pago de forma segura.</p>
              </div>
            )}

            {payMethod === 'bizum' && (
              <div className="alt-pay-info fade-in">
                <div className="form-group">
                  <label>Teléfono Bizum</label>
                  <input type="tel" placeholder="+34 600 000 000" />
                </div>
                <p>Recibirás una notificación en tu app bancaria para confirmar el pago.</p>
              </div>
            )}
          </section>
        </div>

        {/* ---- Panel derecho: resumen ---- */}
        <div className="checkout-summary">
          <h3>Resumen del pedido</h3>
          <ul className="checkout-items">
            {cart.map(it => (
              <li key={it.id} className="checkout-item">
                <span className="checkout-item-name">{it.name}</span>
                <span className="checkout-item-qty">×{it.qty}</span>
                <span className="checkout-item-price">€{(it.price * it.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-totals">
            <div className="checkout-total-row">
              <span>Subtotal</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <div className="checkout-total-row">
              <span>Envío</span>
              <span className="success">Gratis</span>
            </div>
            <div className="checkout-total-row checkout-total-final">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>
          <button
            className="btn"
            style={{ width: '100%', marginTop: '1.5rem', fontSize: '1.05rem', padding: '1rem' }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '⏳ Procesando...' : `Pagar €${total.toFixed(2)}`}
          </button>
          <p className="checkout-secure">🔒 Pago 100% seguro y cifrado</p>
        </div>
      </div>
    </div>
  )
}
