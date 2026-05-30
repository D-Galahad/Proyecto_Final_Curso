import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name: '', lastname: '', email: '', username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const nav = useNavigate()

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) return setError('La contrasena debe tener al menos 6 caracteres')
    if (form.username.length < 4 || form.username.length > 12)
      return setError('El usuario debe tener entre 4 y 12 caracteres')
    setLoading(true)
    try {
      await signup(form.name, form.lastname, form.email, form.username, form.password)
      nav('/')
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="form-card" style={{ width: '100%', maxWidth: 480 }}>

        {/* Cabecera */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', margin: '0 auto 1rem'
          }}>
            ✨
          </div>
          <h2 style={{ margin: 0 }}>Crear cuenta</h2>
          <p style={{ margin: '0.5rem 0 0', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Únete a TechStore hoy mismo
          </p>
        </div>

        {error && (
          <div style={{ background: '#fff5f5', border: '1px solid var(--error)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: 'var(--error)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre"
                required
                value={form.name}
                onChange={handleChange}
                autoComplete="given-name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Apellido</label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Tu apellido"
                required
                value={form.lastname}
                onChange={handleChange}
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              required
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">
              Usuario{' '}
              <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.85rem' }}>(4–12 caracteres)</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="nombreusuario"
              required
              minLength={4}
              maxLength={12}
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              required
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          <button className="btn" type="submit" disabled={loading} style={{ width: '100%', marginTop: '0.5rem', padding: '0.9rem' }}>
            {loading ? 'Creando cuenta...' : '→ Crear cuenta'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ fontWeight: 600 }}>Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}