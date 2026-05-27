import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!user) {
        setCart([])
        setLoading(false)
        return
      }
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_URL}/api/cart`, { headers: { Authorization: `Bearer ${token}` } })
      const items = await res.json()
      setCart(items || [])
      setLoading(false)
    }
    load()
  }, [user])

  async function persist(items) {
    if (!user) return
    const token = localStorage.getItem('token')
    await fetch(`${API_URL}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ items })
    })
  }

  function addItem(product, qty = 1) {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id)
      let next
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx].qty += qty
        next = copy
      } else {
        next = [...prev, { ...product, qty }]
      }
      persist(next)
      return next
    })
  }

  function updateQty(productId, qty) {
    setCart((prev) => {
      const next = prev.map((p) => (p.id === productId ? { ...p, qty } : p))
      persist(next)
      return next
    })
  }

  function removeItem(productId) {
    setCart((prev) => {
      const next = prev.filter((p) => p.id !== productId)
      persist(next)
      return next
    })
  }

  function clearCart() {
    setCart([])
    persist([])
  }

  const total = cart.reduce((s, it) => s + it.price * it.qty, 0)

  const value = { cart, addItem, updateQty, removeItem, clearCart, total, loading }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
