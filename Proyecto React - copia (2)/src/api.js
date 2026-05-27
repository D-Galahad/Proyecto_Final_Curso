const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

function getToken() {
  return localStorage.getItem('token')
}

function authHeaders() {
  const token = getToken()
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' }
}

async function request(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: authHeaders(),
    body: body !== undefined ? JSON.stringify(body) : undefined
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || 'Error en la peticion')
  }
  if (res.status === 204) return null
  return res.json()
}

// --- Auth ---
export const authApi = {
  login: (username, password) =>
    request('POST', '/api/auth/login', { username, password }),
  register: (name, lastname, email, username, password) =>
    request('POST', '/api/auth/register', { name, lastname, email, username, password })
}

// --- Productos ---
export const productosApi = {
  getAll: () => request('GET', '/api/products'),
  getById: (id) => request('GET', `/api/products/${id}`),
  create: (producto) => request('POST', '/api/products', producto),
  update: (id, producto) => request('PUT', `/api/products/${id}`, producto),
  delete: (id) => request('DELETE', `/api/products/${id}`)
}

// --- Usuarios ---
export const usersApi = {
  getAll: () => request('GET', '/api/users'),
  getById: (id) => request('GET', `/api/users/${id}`),
  update: (id, userData) => request('PUT', `/api/users/${id}`, userData),
  delete: (id) => request('DELETE', `/api/users/${id}`)
}

// --- Carrito ---
export const cartApi = {
  getMyCart: () => request('GET', '/api/cart/my'),
  addItem: (productId, quantity) =>
    request('POST', `/api/cart/my/items?productId=${productId}&quantity=${quantity}`),
  updateItem: (productId, quantity) =>
    request('PUT', `/api/cart/my/items?productId=${productId}&quantity=${quantity}`),
  removeItem: (productId) =>
    request('DELETE', `/api/cart/my/items?productId=${productId}`),
  clearCart: () => request('DELETE', '/api/cart/my')
}