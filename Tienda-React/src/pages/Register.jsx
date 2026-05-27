import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    
    if (username.length < 4 || username.length > 12) {
      return setError('El nombre de usuario debe tener entre 4 y 12 caracteres')
    }
    if (password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres')
    }
    
    try {
      await signup({ name, lastname, email, username, password })
      nav('/')
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta')
    }
  }

  return (
    <div className="container form-card fade-in">
      <h2>Registro</h2>
      {error && <p className="error" style={{ marginBottom: '1.5rem' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input 
            required 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Ej. Juan" 
          />
        </div>
        
        <div className="form-group">
          <label>Apellidos</label>
          <input 
            required 
            type="text" 
            value={lastname} 
            onChange={(e) => setLastname(e.target.value)} 
            placeholder="Ej. Pérez" 
          />
        </div>

        <div className="form-group">
          <label>Nombre de usuario</label>
          <input 
            required 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Entre 4 y 12 caracteres" 
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            required 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Ej. juan@example.com" 
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input 
            required 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Mínimo 6 caracteres" 
          />
        </div>

        <button className="btn" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
          Registrar
        </button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        ¿Ya tienes cuenta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  )
}
