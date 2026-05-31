import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { cartApi } from '../api'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

// --------------- guest cart helpers ---------------
const GUEST_CART_KEY = 'guest_cart'

function getGuestCart() {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || []
  } catch {
    return []
  }
}

function saveGuestCart(items) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items))
}

// --------------- mapper ---------------
function mapCart(cartData) {
  if (!cartData || !cartData.items) return []
  return cartData.items.map((item) => ({
    id: item.productId,
    name: item.productName,
    price: item.unitPrice,
    qty: item.quantity
  }))
}

// --------------- provider ---------------
export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const [cartError, setCartError] = useState(null)

  const loadCart = useCallback(async () => {
    if (!user) {
      setCart(getGuestCart())
      return
    }
    try {
      setLoading(true)
      const data = await cartApi.getMyCart()
      setCart(mapCart(data))
    } catch (e) {
      setCartError(e.message)
      setCart([])
    } finally {
      setLoading(false)
    }
  }, [user])

  // Al hacer login, sincronizar el carrito guest con el servidor
  useEffect(() => {
    if (!user) {
      setCart(getGuestCart())
      return
    }
    const guestCart = getGuestCart()
    if (guestCart.length > 0) {
      setLoading(true)
      Promise.all(
        guestCart.map((item) =>
          cartApi.addItem(item.id, item.qty).catch(() => null)
        )
      )
        .then(() => {
          localStorage.removeItem(GUEST_CART_KEY)
          return loadCart()
        })
        .catch(() => loadCart())
    } else {
      loadCart()
    }
  }, [user, loadCart])

  async function addItem(product, qty = 1) {
    if (!user) {
      // Usuario no logueado: carrito local
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id)
        const updated = existing
          ? prev.map((i) =>
              i.id === product.id ? { ...i, qty: i.qty + qty } : i
            )
          : [...prev, { id: product.id, name: product.name, price: product.price, qty }]
        saveGuestCart(updated)
        return updated
      })
      return
    }
    // Usuario logueado: intentar backend, si falla usar estado local
    try {
      const data = await cartApi.addItem(product.id, qty)
      setCart(mapCart(data))
    } catch (e) {
      // Backend no disponible: actualizar localmente igual
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id)
        return existing
          ? prev.map((i) =>
              i.id === product.id ? { ...i, qty: i.qty + qty } : i
            )
          : [...prev, { id: product.id, name: product.name, price: product.price, qty }]
      })
    }
  }

  async function updateQty(productId, qty) {
    if (!user) {
      if (qty <= 0) return removeItem(productId)
      setCart((prev) => {
        const updated = prev.map((i) =>
          i.id === productId ? { ...i, qty } : i
        )
        saveGuestCart(updated)
        return updated
      })
      return
    }
    if (qty <= 0) return removeItem(productId)
    try {
      const data = await cartApi.updateItem(productId, qty)
      setCart(mapCart(data))
    } catch (e) {
      // Fallback local
      setCart((prev) =>
        prev.map((i) => (i.id === productId ? { ...i, qty } : i))
      )
    }
  }

  async function removeItem(productId) {
    if (!user) {
      setCart((prev) => {
        const updated = prev.filter((i) => i.id !== productId)
        saveGuestCart(updated)
        return updated
      })
      return
    }
    try {
      const data = await cartApi.removeItem(productId)
      setCart(mapCart(data))
    } catch (e) {
      // Fallback local
      setCart((prev) => prev.filter((i) => i.id !== productId))
    }
  }

  async function clearCart() {
    if (!user) {
      localStorage.removeItem(GUEST_CART_KEY)
      setCart([])
      return
    }
    try {
      await cartApi.clearCart()
    } catch (e) {
      // ignorar error de backend
    }
    setCart([])
  }

  const total = cart.reduce((s, it) => s + it.price * it.qty, 0)

  const value = { cart, addItem, updateQty, removeItem, clearCart, total, loading, cartError }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
