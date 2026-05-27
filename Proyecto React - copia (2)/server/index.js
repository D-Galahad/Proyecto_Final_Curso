import express from 'express'
import cors from 'cors'
import axios from 'axios'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.PORT || 4000
const SPRINGBOOT_URL = process.env.SPRINGBOOT_URL || 'http://localhost:8080'

app.use(cors())
app.use(bodyParser.json())

// Axios instance para Spring Boot
const springBootAPI = axios.create({
  baseURL: SPRINGBOOT_URL,
  timeout: 10000
})

// Auth routes - Proxy a Spring Boot
app.post('/api/auth/register', async (req, res) => {
  try {
    const response = await springBootAPI.post('/api/auth/register', req.body)
    res.json(response.data)
  } catch (error) {
    console.error('Register error:', error.message)
    res.status(error.response?.status || 500).json({ error: error.response?.data?.error || 'Registration failed' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const response = await springBootAPI.post('/api/auth/login', req.body)
    res.json(response.data)
  } catch (error) {
    console.error('Login error:', error.message)
    res.status(error.response?.status || 500).json({ error: error.response?.data?.error || 'Login failed' })
  }
})

app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization
    const response = await springBootAPI.get('/api/auth/me', {
      headers: { Authorization: token }
    })
    res.json(response.data)
  } catch (error) {
    console.error('Me error:', error.message)
    res.status(error.response?.status || 500).json({ error: error.response?.data?.error || 'Failed to fetch user' })
  }
})

// Products - Proxy a Spring Boot
app.get('/api/productos', async (req, res) => {
  try {
    const response = await springBootAPI.get('/api/productos')
    console.log('Spring Boot response:', JSON.stringify(response.data).substring(0, 200))
    res.json(response.data)
  } catch (error) {
    console.error('Products error:', error.message)
    res.status(error.response?.status || 500).json({ error: error.message || 'Failed to fetch products' })
  }
})

app.get('/api/productos/:id_producto', async (req, res) => {
  try {
    const response = await springBootAPI.get(`/api/productos/${req.params.id}`)
    res.json(response.data)
  } catch (error) {
    console.error('Product detail error:', error.message)
    res.status(error.response?.status || 500).json({ error: error.message || 'Failed to fetch product' })
  }
})

// // Cart endpoints - Proxy a Spring Boot
// app.get('/api/cart', async (req, res) => {
//   try {
//     const token = req.headers.authorization
//     const response = await springBootAPI.get('/api/cart', {
//       headers: { Authorization: token }
//     })
//     res.json(response.data)
//   } catch (error) {
//     console.error('Cart error:', error.message)
//     res.status(error.response?.status || 500).json({ error: 'Failed to fetch cart' })
//   }
// })

app.post('/api/cart', async (req, res) => {
  try {
    const token = req.headers.authorization
    const response = await springBootAPI.post('/api/cart', req.body, {
      headers: { Authorization: token }
    })
    res.json(response.data)
  } catch (error) {
    console.error('Cart update error:', error.message)
    res.status(error.response?.status || 500).json({ error: 'Failed to update cart' })
  }
})

app.delete('/api/cart/:id_producto', async (req, res) => {
  try {
    const token = req.headers.authorization
    const response = await springBootAPI.delete(`/api/cart/${req.params.id_producto}`, {
      headers: { Authorization: token }
    })
    res.json(response.data)
  } catch (error) {
    console.error('Cart delete error:', error.message)
    res.status(error.response?.status || 500).json({ error: 'Failed to delete from cart' })
  }
})

app.listen(PORT, () => console.log('API server running on', PORT))
