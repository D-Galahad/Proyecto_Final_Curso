import { useState, useEffect } from 'react'
import { productosApi } from '../api'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    productosApi.getAll()
      .then(setProducts)
      .catch((e) => setError(e.message))
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
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading, error }
}
