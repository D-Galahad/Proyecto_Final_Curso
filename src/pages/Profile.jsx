import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { usersApi } from '../api'

export default function Profile() {
  const { user, logout } = useAuth()
  const nav = useNavigate()

  const [profileData, setProfileData] = useState(null)
  const [form, setForm] = useState({ name: '', lastname: '', email: '', username: '', password: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!user) {
      nav('/login')
      return
    }
    async function fetchProfile() {
      try {
        setLoading(true)
        const users = await usersApi.getAll()
        const me = users.find((u) => u.username === user.username)
        if (!me) throw new Error('No se encontró el perfil del usuario')
        setProfileData(me)
        setForm({
          name: me.name || '',
          lastname: me.lastname || '',
          email: me.email || '',
          username: me.username || '',
          password: ''
        })
      } catch (e) {
        setError(e.message || 'Error al cargar el perfil')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [user, nav])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSuccess('')
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const payload = {
        name: form.name,
        lastname: form.lastname,
        email: form.email,
        username: form.username,
        ...(form.password ? { password: form.password } : {})
      }
      await usersApi.update(profileData.id, payload)
      setSuccess('Perfil actualizado correctamente')
      setForm((prev) => ({ ...prev, password: '' }))
    } catch (e) {
      setError(e.message || 'Error al actualizar el perfil')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="container"><p>Cargando perfil...</p></div>

  return (
    <div className="container">
      <div className="form-card" style={{ maxWidth: 520, margin: '2rem auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', flexShrink: 0
          }}>
            👤
          </div>
          <div>
            <h2 style={{ margin: 0 }}>Mi Perfil</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {user?.roles?.includes('ROLE_ADMIN') ? '🛡️ Administrador' : '🛒 Cliente'}
            </p>
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        {success && (
          <p style={{ color: 'var(--success)', background: '#f0fff4', padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid var(--success)' }}>
            ✅ {success}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            <div>
              <label>Nombre</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Apellido</label>
              <input
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Usuario</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            minLength={4}
            maxLength={12}
            required
          />

          <label>Nueva contraseña <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(dejar vacío para no cambiar)</span></label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="new-password"
          />

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button className="btn" type="submit" disabled={saving} style={{ flex: 1 }}>
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button
              type="button"
              className="btn-link"
              onClick={() => { logout(); nav('/') }}
              style={{ color: 'var(--error)' }}
            >
              Cerrar sesión
            </button>
          </div>
        </form>

        {profileData && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 8, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong>Info de cuenta</strong>
            <p style={{ margin: '0.25rem 0 0' }}>ID: #{profileData.id}</p>
          </div>
        )}
      </div>
    </div>
  )
}