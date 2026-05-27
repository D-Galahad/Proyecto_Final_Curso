import React, { createContext, useContext, useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check local storage for token
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('userEmail')
    if (token && email) {
      setUser({ email })
    }
    setLoading(false)
  }, [])

  async function signup(userData) {
    const { name, lastname, email, username, password } = userData
    const res = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, lastname, email, username, password, admin: false })
    })
    
    if (!res.ok) {
      const errText = await res.text()
      throw new Error(errText || 'Error en el registro')
    }
    
    return await login(username, password)
  }

  async function login(username, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    
    if (!res.ok) throw new Error('Credenciales inválidas')
    
    const data = await res.json()
    localStorage.setItem('token', data.token)
    localStorage.setItem('userEmail', data.username)
    setUser({ email: data.username })
    return data
  }

  async function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    setUser(null)
  }

  // Google Sign-In not supported natively by this basic JWT backend yet
  async function signInWithGoogle() {
    throw new Error('Google Sign-In is not currently supported with this backend')
  }

  const value = { user, signup, login, logout, signInWithGoogle }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
