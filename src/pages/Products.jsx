import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'

export default function Products() {
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
  const { products, loading, error } = useProducts()

  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    categories: categoryFromUrl ? [categoryFromUrl] : [],
    maxPrice: 3000,
    sortBy: 'default'
  })

  const filteredProducts = useMemo(() => {
    let result = products

    if (searchQuery) {
      result = result.filter((p) =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category))
    }
    result = result.filter((p) => (p.price ?? 0) <= filters.maxPrice)

    switch (filters.sortBy) {
      case 'price-asc': result = [...result].sort((a, b) => a.price - b.price); break
      case 'price-desc': result = [...result].sort((a, b) => b.price - a.price); break
      case 'name-asc': result = [...result].sort((a, b) => a.name.localeCompare(b.name)); break
      case 'rating-desc': result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break
      default: break
    }
    return result
  }, [searchQuery, filters, products])

  if (loading) return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '1rem' }}>
      <div style={{ fontSize: '3rem', animation: 'pulse 1.5s infinite' }}>⚡</div>
      <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Cargando productos...</p>
    </div>
  )

  if (error) return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '1rem' }}>
      <div style={{ fontSize: '3rem' }}></div>
      <p style={{ color: 'var(--error)', fontWeight: 500 }}>Fallos tecnicos lamentamos las molestias</p>
    </div>
  )

  return (
    <div className="container">
      {/* Cabecera con buscador */}
      <div style={{
        background: 'var(--gradient-hero)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem 2.5rem',
        marginBottom: '2rem',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.8rem' }}>🛍️ Catálogo de productos</h2>
          <p style={{ margin: '0.4rem 0 0', opacity: 0.8, fontSize: '0.95rem' }}>
            {products.length} productos disponibles
          </p>
        </div>
        <div style={{ position: 'relative', maxWidth: 520 }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', pointerEvents: 'none' }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem 1rem 0.8rem 2.75rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              fontSize: '0.95rem',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              backdropFilter: 'blur(8px)',
              outline: 'none',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.3)'
            }}
          />
        </div>
      </div>

      <div className="products-layout">
        <FilterSidebar filters={filters} onFilterChange={setFilters} />
        <div>
          <div className="results-bar">
            <p className="results-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </p>
            {filters.categories.length > 0 && (
              <div className="active-categories">
                {filters.categories.map((cat) => (
                  <span key={cat} className="category-badge">{cat}</span>
                ))}
              </div>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid">
              {filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No se encontraron productos</h3>
              <p>Intenta ajustar los filtros o la búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}