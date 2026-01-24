import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await login(email, password)
      nav('/')
    } catch (err) {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="container form-card">
      <h2>Entrar</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Contraseña</label>
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn" type="submit">Entrar</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </div>
  )
}
