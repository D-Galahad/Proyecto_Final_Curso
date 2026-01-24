/*
  Script de seed para Firestore usando Firebase Admin SDK.
  Requisitos:
    - Crear una clave de servicio (service account) en Firebase Console -> Project Settings -> Service accounts
    - Guardar el JSON en local y exportar la variable de entorno:
        set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\serviceAccountKey.json
      (PowerShell) o en Linux/macOS:
        export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json

  Ejecución:
    node scripts/seedFirestore.mjs

  Opcional: crear un usuario de prueba y su carrito usando las vars de entorno:
    SEED_TEST_USER_EMAIL, SEED_TEST_USER_PASSWORD
*/

import admin from 'firebase-admin'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

try {
  admin.initializeApp({ credential: admin.credential.applicationDefault() })
} catch (e) {
  console.error('Error inicializando Firebase Admin:', e.message)
  process.exit(1)
}

const db = admin.firestore()

// importar productos desde src/data/products.js
const productsModulePath = resolve(__dirname, '../src/data/products.js')
const { default: products } = await import(`file://${productsModulePath}`)

async function seedProducts() {
  console.log('Sembrando productos...')
  for (const p of products) {
    const ref = db.collection('products').doc(p.id)
    await ref.set({ name: p.name, price: p.price, image: p.image, description: p.description })
    console.log('->', p.id)
  }
}

async function createTestUser(email, password) {
  try {
    const user = await admin.auth().createUser({ email, password })
    console.log('Usuario creado:', user.uid)
    return user.uid
  } catch (e) {
    console.error('Error creando usuario (puede ya existir):', e.message)
    // intentar buscar por email
    try {
      const user = await admin.auth().getUserByEmail(email)
      console.log('Usuario ya existe, uid:', user.uid)
      return user.uid
    } catch (err) {
      console.error('No se pudo obtener usuario existente:', err.message)
      return null
    }
  }
}

async function seedCartForUser(uid) {
  const sampleCart = [
    { id: 'p1', name: 'Camiseta básica', price: 19.99, qty: 1 },
    { id: 'p3', name: 'Pantalones vaqueros', price: 49.99, qty: 2 }
  ]
  await db.collection('carts').doc(uid).set({ items: sampleCart })
  console.log('Carrito de muestra creado para', uid)
}

async function main() {
  try {
    await seedProducts()

    const email = process.env.SEED_TEST_USER_EMAIL
    const password = process.env.SEED_TEST_USER_PASSWORD
    if (email && password) {
      const uid = await createTestUser(email, password)
      if (uid) await seedCartForUser(uid)
    } else {
      console.log('No se proporcionó SEED_TEST_USER_EMAIL/SEED_TEST_USER_PASSWORD — no se crea usuario de prueba.')
    }

    console.log('Seed finalizado.')
    process.exit(0)
  } catch (e) {
    console.error('Error en seed:', e)
    process.exit(1)
  }
}

main()
