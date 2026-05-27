import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await login(username, password)
      nav('/')
    } catch (err) {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="container form-card fade-in">
      <h2>Entrar</h2>
      {error && <p className="error" style={{ marginBottom: '1.5rem' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de usuario</label>
          <input 
            required 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Tu usuario (ej. admin o juanperez)" 
          />
        </div>
        
        <div className="form-group">
          <label>Contraseña</label>
          <input 
            required 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Tu contraseña" 
          />
        </div>
        
        <button className="btn" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
          Entrar
        </button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  )
}
