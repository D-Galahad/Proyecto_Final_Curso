import React, { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../api'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    return { user: null, loading: false, login: () => {}, signup: () => {}, logout: () => {}, isAdmin: () => false }
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restaurar sesion del localStorage al arrancar
  useEffect(() => {
    const token = localStorage.getItem('token')
    const stored = localStorage.getItem('user')
    if (token && stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  async function login(username, password) {
    const data = await authApi.login(username, password)
    localStorage.setItem('token', data.token)
    const userData = { username: data.username, roles: data.roles }
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  async function signup(name, lastname, email, username, password) {
    const data = await authApi.register(name, lastname, email, username, password)
    localStorage.setItem('token', data.token)
    const userData = { username: data.username, roles: data.roles }
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  function isAdmin() {
    return user?.roles?.includes('ROLE_ADMIN') ?? false
  }

  const value = { user, login, signup, logout, isAdmin, loading }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}