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
  const res = await fetch(`http://localhost:8080${path}`, {
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

// Mapear productos del backend al formato esperado
function mapProduct(backendProduct) {
  const productId = backendProduct.id || backendProduct.id_producto
  return {
    id: productId,
    name: backendProduct.name && backendProduct.name.trim() ? backendProduct.name : `Producto ${productId}`,
    price: backendProduct.precio || backendProduct.price || 0,
    category: backendProduct.category || 'Otros',
    stock: backendProduct.stock || 10,
    rating: backendProduct.rating || 4.5,
    image: backendProduct.imageUrl || backendProduct.image || '/placeholder.png',
    description: backendProduct.description || `${backendProduct.marca || ''} ${backendProduct.modelo || ''}`.trim(),
    specs: backendProduct.specs || []
  }
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
  getAll: () => request('GET', '/api/productos').then(productos => 
    Array.isArray(productos) ? productos.map(mapProduct) : []
  ),
  getById: (id_producto) => request('GET', `/api/productos/${id_producto}`).then(mapProduct),
  create: (producto) => request('POST', '/api/productos', producto),
  update: (id_producto, producto) => request('PUT', `/api/productos/${id_producto}`, producto),
  delete: (id_producto) => request('DELETE', `/api/productos/${id_producto}`)
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
  addItem: (id_producto, quantity) =>
    request('POST', `/api/cart/my/items?id_producto=${id_producto}&quantity=${quantity}`),
  updateItem: (id_producto, quantity) =>
    request('PUT', `/api/cart/my/items?id_producto=${id_producto}&quantity=${quantity}`),
  removeItem: (id_producto) =>
    request('DELETE', `/api/cart/my/items?id_producto=${id_producto}`),
  clearCart: () => request('DELETE', '/api/cart/my')
}