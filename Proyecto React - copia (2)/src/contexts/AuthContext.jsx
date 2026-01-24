import React, { createContext, useContext, useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function signup(email, password, profile) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, profile })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Registro fallido')
    localStorage.setItem('token', data.token)
    setUser({ uid: data.uid, email: data.email, profile: data.profile })
    return data
  }

  async function login(email, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login fallido')
    localStorage.setItem('token', data.token)
    setUser({ uid: data.uid, email: data.email, profile: data.profile })
    return data
  }

  async function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    async function check() {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        if (!res.ok) throw new Error('Token inválido')
        const data = await res.json()
        setUser({ uid: data.uid, email: data.email, profile: data.profile })
      } catch (e) {
        localStorage.removeItem('token')
        setUser(null)
      }
      setLoading(false)
    }
    check()
  }, [])

  const value = { user, signup, login, logout }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
