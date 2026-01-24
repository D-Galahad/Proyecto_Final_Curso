import React from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const featured = products.slice(0, 6)

  const categories = [
    { name: 'Smartphones', icon: '📱', color: 'hsl(280, 85%, 60%)' },
    { name: 'Laptops', icon: '💻', color: 'hsl(220, 90%, 56%)' },
    { name: 'Audio', icon: '🎧', color: 'hsl(142, 71%, 45%)' },
    { name: 'Gaming', icon: '🎮', color: 'hsl(0, 65%, 51%)' },
    { name: 'Accesorios', icon: '⌚', color: 'hsl(45, 100%, 51%)' }
  ]

  return (
    <>
      {/* Hero Section */}
      <div className="container" style={{ paddingTop: 0 }}>
        <header className="hero">
          <h1 className="fade-in">
            Descubre la mejor tecnología
          </h1>
          <p className="fade-in">
            Smartphones, laptops, gaming y accesorios premium.
            Todo lo que necesitas para estar a la vanguardia tecnológica.
          </p>
          <div className="hero-cta">
            <Link to="/products" className="btn">
              🛍️ Ver productos
            </Link>
            <Link to="/products" className="btn btn-secondary">
              🔥 Ofertas
            </Link>
          </div>
        </header>

        {/* Benefits */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-lg)',
          marginBottom: 'var(--space-2xl)'
        }}>
          {[
            { icon: '🚚', title: 'Envío gratis', desc: 'En pedidos +50€' },
            { icon: '🔒', title: 'Pago seguro', desc: '100% protegido' },
            { icon: '↩️', title: 'Devoluciones', desc: '30 días garantía' },
            { icon: '💬', title: 'Soporte 24/7', desc: 'Siempre disponibles' }
          ].map((benefit, idx) => (
            <div key={idx} style={{
              padding: 'var(--space-lg)',
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: 'var(--space-sm)' }}>{benefit.icon}</div>
              <h4 style={{ marginBottom: 'var(--space-xs)' }}>{benefit.title}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <section>
          <h2>Explora por categorías</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-lg)',
            marginBottom: 'var(--space-2xl)'
          }}>
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                style={{
                  padding: 'var(--space-xl)',
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'var(--text)',
                  boxShadow: 'var(--shadow-md)',
                  border: '2px solid transparent',
                  transition: 'all var(--transition-base)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cat.color
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ fontSize: '3rem' }}>{cat.icon}</div>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{cat.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
            <h2 style={{ margin: 0 }}>Productos destacados</h2>
            <Link to="/products" style={{ fontWeight: 600 }}>
              Ver todos →
            </Link>
          </div>
          <div className="grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
