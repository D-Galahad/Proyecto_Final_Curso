import { useState, useEffect } from 'react'
import { productosApi } from '../api'
import productsData from '../data/products'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    productosApi.getAll()
      .then(data => {
        // Si los productos del backend no tienen nombres válidos, usa los datos locales
        const hasValidProducts = Array.isArray(data) && data.some(p => p.name && p.name.trim() !== '')
        if (hasValidProducts) {
          setProducts(data)
        } else {
          console.warn('Backend products invalid, using local data')
          setProducts(productsData)
        }
      })
      .catch((e) => {
        console.warn('Error loading from API, using local data:', e.message)
        setProducts(productsData)
        setError(e.message)
      })
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, error }
}

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    productosApi.getById(id)
      .then(data => {
        // Si el producto no tiene nombre válido, busca en datos locales
        if (data && data.name && data.name.trim() !== '') {
          setProduct(data)
        } else {
          const localProduct = productsData.find(p => String(p.id) === String(id))
          if (localProduct) {
            setProduct(localProduct)
          } else {
            setProduct(data)
          }
        }
      })
      .catch((e) => {
        console.warn('Error loading product from API, using local data:', e.message)
        const localProduct = productsData.find(p => String(p.id) === String(id))
        setProduct(localProduct)
        setError(e.message)
      })
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading, error }
}
