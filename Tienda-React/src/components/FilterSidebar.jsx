import React from 'react'

export default function FilterSidebar({ filters, onFilterChange }) {
    const categories = ['Smartphones', 'Laptops', 'Audio', 'Gaming', 'Accesorios']
    const sortOptions = [
        { value: 'default', label: 'Predeterminado' },
        { value: 'price-asc', label: 'Precio: Menor a Mayor' },
        { value: 'price-desc', label: 'Precio: Mayor a Menor' },
        { value: 'name-asc', label: 'Nombre: A-Z' },
        { value: 'rating-desc', label: 'Mejor Valorados' }
    ]

    return (
        <aside className="filters">
            {/* Categorías */}
            <div className="filter-section">
                <h3>Categorías</h3>
                {categories.map((cat) => (
                    <label key={cat} className="filter-option">
                        <input
                            type="checkbox"
                            checked={filters.categories.includes(cat)}
                            onChange={(e) => {
                                const newCategories = e.target.checked
                                    ? [...filters.categories, cat]
                                    : filters.categories.filter(c => c !== cat)
                                onFilterChange({ ...filters, categories: newCategories })
                            }}
                        />
                        <span>{cat}</span>
                    </label>
                ))}
            </div>

            {/* Rango de precio */}
            <div className="filter-section">
                <h3>Precio</h3>
                <div style={{ marginBottom: 'var(--space-md)' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        Máximo: €{filters.maxPrice}
                    </label>
                    <input
                        type="range"
                        className="price-range"
                        min="0"
                        max="3000"
                        step="50"
                        value={filters.maxPrice}
                        onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)'
                }}>
                    <span>€0</span>
                    <span>€3000</span>
                </div>
            </div>

            {/* Ordenar */}
            <div className="filter-section">
                <h3>Ordenar por</h3>
                <select
                    value={filters.sortBy}
                    onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
                    style={{
                        width: '100%',
                        padding: 'var(--space-sm)',
                        borderRadius: 'var(--radius-sm)',
                        border: '2px solid var(--border)',
                        fontSize: '0.9rem'
                    }}
                >
                    {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Limpiar filtros */}
            <button
                onClick={() => onFilterChange({
                    categories: [],
                    maxPrice: 3000,
                    sortBy: 'default'
                })}
                style={{
                    width: '100%',
                    padding: 'var(--space-sm)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all var(--transition-fast)'
                }}
            >
                Limpiar filtros
            </button>
        </aside>
    )
}
