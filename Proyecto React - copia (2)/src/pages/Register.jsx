import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function calculateAge(dob) {
  const diff = Date.now() - new Date(dob).getTime()
  const ageDt = new Date(diff)
  return Math.abs(ageDt.getUTCFullYear() - 1970)
}

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres')
    if (!dob) return setError('Introduce tu fecha de nacimiento')
    if (calculateAge(dob) < 18) return setError('Debes ser mayor de edad')
    try {
      await signup(email, password, { dob })
      nav('/')
    } catch (err) {
      setError('Error al crear la cuenta')
    }
  }

  return (
    <div className="container form-card">
      <h2>Registro</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Contraseña</label>
        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Fecha de nacimiento</label>
        <input required type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        <button className="btn" type="submit">Registrar</button>
      </form>
      <p>¿Ya tienes cuenta? <Link to="/login">Entrar</Link></p>
    </div>
  )
}
