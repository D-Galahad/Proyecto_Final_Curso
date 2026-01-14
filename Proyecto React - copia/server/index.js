import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { nanoid } from 'nanoid'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.PORT || 4000
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_this'

app.use(cors())
app.use(bodyParser.json())

const adapter = new JSONFile(new URL('./db.json', import.meta.url))
const db = new Low(adapter)
await db.read()
db.data ||= { users: [], products: [], carts: [] }

// Seed products if empty
if (!db.data.products || db.data.products.length === 0) {
  db.data.products = [
    { id: 'p1', name: 'Camiseta básica', price: 19.99, image: 'https://picsum.photos/seed/p1/400/300', description: 'Camiseta cómoda de algodón, disponible en varias tallas.' },
    { id: 'p2', name: 'Sudadera con capucha', price: 39.99, image: 'https://picsum.photos/seed/p2/400/300', description: 'Sudadera cálida, ideal para invierno.' },
    { id: 'p3', name: 'Pantalones vaqueros', price: 49.99, image: 'https://picsum.photos/seed/p3/400/300', description: 'Jeans clásicos con corte ajustado.' },
    { id: 'p4', name: 'Zapatillas deportivas', price: 59.99, image: 'https://picsum.photos/seed/p4/400/300', description: 'Zapatillas ligeras para uso diario.' },
    { id: 'p5', name: 'Gorra de algodón', price: 12.5, image: 'https://picsum.photos/seed/p5/400/300', description: 'Gorra cómoda y resistente al uso.' }
  ]
  await db.write()
}

function generateToken(uid) {
  return jwt.sign({ uid }, JWT_SECRET, { expiresIn: '7d' })
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: 'No token' })
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.uid = payload.uid
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password, profile } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
  // basic age check if dob provided
  if (profile && profile.dob) {
    const age = Math.abs(new Date(Date.now() - new Date(profile.dob).getTime()).getUTCFullYear() - 1970)
    if (age < 18) return res.status(400).json({ error: 'Must be 18+' })
  }
  await db.read()
  const exists = db.data.users.find((u) => u.email === email)
  if (exists) return res.status(400).json({ error: 'User exists' })
  const uid = nanoid()
  const passHash = await bcrypt.hash(password, 10)
  const user = { id: uid, email, password: passHash, profile: profile || {} }
  db.data.users.push(user)
  await db.write()
  const token = generateToken(uid)
  res.json({ token, uid, email, profile: user.profile })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
  await db.read()
  const user = db.data.users.find((u) => u.email === email)
  if (!user) return res.status(400).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' })
  const token = generateToken(user.id)
  res.json({ token, uid: user.id, email: user.email, profile: user.profile })
})

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  await db.read()
  const user = db.data.users.find((u) => u.id === req.uid)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ uid: user.id, email: user.email, profile: user.profile })
})

// Products
app.get('/api/products', async (req, res) => {
  await db.read()
  res.json(db.data.products || [])
})

app.get('/api/products/:id', async (req, res) => {
  await db.read()
  const p = db.data.products.find((x) => x.id === req.params.id)
  if (!p) return res.status(404).json({ error: 'Not found' })
  res.json(p)
})

// Cart endpoints (protected)
app.get('/api/cart', authMiddleware, async (req, res) => {
  await db.read()
  const cart = db.data.carts.find((c) => c.userId === req.uid)
  res.json(cart ? cart.items : [])
})

app.post('/api/cart', authMiddleware, async (req, res) => {
  const items = req.body.items || []
  await db.read()
  const idx = db.data.carts.findIndex((c) => c.userId === req.uid)
  if (idx >= 0) {
    db.data.carts[idx].items = items
  } else {
    db.data.carts.push({ userId: req.uid, items })
  }
  await db.write()
  res.json({ ok: true })
})

app.delete('/api/cart/:productId', authMiddleware, async (req, res) => {
  const pid = req.params.productId
  await db.read()
  const cart = db.data.carts.find((c) => c.userId === req.uid)
  if (!cart) return res.json({ ok: true })
  cart.items = cart.items.filter((it) => it.id !== pid)
  await db.write()
  res.json({ ok: true })
})

app.listen(PORT, () => console.log('API server running on', PORT))
