import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function Products() {
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')

  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    categories: categoryFromUrl ? [categoryFromUrl] : [],
    maxPrice: 3000,
    sortBy: 'default'
  })

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }, [])

  // Filtrado y ordenamiento
  const filteredProducts = useMemo(() => {
    let result = products

    // Filtro por búsqueda
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtro por categorías
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category))
    }

    // Filtro por precio
    result = result.filter((p) => p.price <= filters.maxPrice)

    // Ordenamiento
    switch (filters.sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'rating-desc':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return result
  }, [searchQuery, filters])

  return (
    <div className="container">
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <h2>Productos</h2>
        <input
          type="text"
          placeholder="🔍 Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: 'var(--space-md)',
            fontSize: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--border)'
          }}
        />
      </div>

      <div className="products-layout">
        <FilterSidebar filters={filters} onFilterChange={setFilters} />

        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--space-lg)',
            padding: 'var(--space-md)',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)'
          }}>
            <p style={{ margin: 0, fontWeight: 600 }}>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </p>

            {(filters.categories.length > 0 || filters.maxPrice < 3000) && (
              <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                {filters.categories.map((cat) => (
                  <span
                    key={cat}
                    style={{
                      padding: '4px 12px',
                      background: 'var(--primary)',
                      color: 'white',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      fontWeight: 600
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: 'var(--space-3xl)',
              color: 'var(--text-muted)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>🔍</div>
              <h3>No se encontraron productos</h3>
              <p>Intenta ajustar los filtros o la búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
