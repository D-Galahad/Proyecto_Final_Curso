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
            {/* Cabecera filtros */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>Filtros</h3>
            </div>

            {/* Categorías */}
            <div className="filter-section">
                <h3>📁 Categorías</h3>
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
                <h3>💰 Precio</h3>
                <div className="price-range-wrapper">
                    <label className="price-label">
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
                <div className="price-range-labels">
                    <span>€0</span>
                    <span>€3000</span>
                </div>
            </div>

            {/* Ordenar */}
            <div className="filter-section">
                <h3>↕️ Ordenar por</h3>
                <select
                    className="filter-select"
                    value={filters.sortBy}
                    onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
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
                className="btn-clear-filters"
                onClick={() => onFilterChange({
                    categories: [],
                    maxPrice: 3000,
                    sortBy: 'default'
                })}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
                🗑️ Limpiar filtros
            </button>
        </aside>
    )
}