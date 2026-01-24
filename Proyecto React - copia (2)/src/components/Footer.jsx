import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--gradient-hero)',
            color: 'white',
            padding: 'var(--space-3xl) var(--space-xl)',
            marginTop: 'var(--space-3xl)'
        }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 'var(--space-2xl)',
                    marginBottom: 'var(--space-xl)'
                }}>
                    {/* Información */}
                    <div>
                        <h3 style={{ marginBottom: 'var(--space-md)', fontSize: '1.2rem' }}>⚡ TechStore</h3>
                        <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
                            Tu tienda de electrónica premium. Los mejores productos tech al mejor precio.
                        </p>
                    </div>

                    {/* Enlaces rápidos */}
                    <div>
                        <h4 style={{ marginBottom: 'var(--space-md)', fontSize: '1rem' }}>Enlaces</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>
                                <Link to="/" style={{ color: 'white', opacity: 0.9 }}>Inicio</Link>
                            </li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>
                                <Link to="/products" style={{ color: 'white', opacity: 0.9 }}>Productos</Link>
                            </li>
                            <li style={{ marginBottom: 'var(--space-sm)' }}>
                                <Link to="/cart" style={{ color: 'white', opacity: 0.9 }}>Carrito</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Ayuda */}
                    <div>
                        <h4 style={{ marginBottom: 'var(--space-md)', fontSize: '1rem' }}>Ayuda</h4>
                        <p style={{ opacity: 0.9, fontSize: '0.9rem', lineHeight: 1.6 }}>
                            📧 soporte@techstore.com<br />
                            📱 +34 900 123 456<br />
                            🕐 Lun-Vie 9:00-18:00
                        </p>
                    </div>

                    {/* Redes Sociales */}
                    <div>
                        <h4 style={{ marginBottom: 'var(--space-md)', fontSize: '1rem' }}>Síguenos</h4>
                        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                            <a href="#" style={{ fontSize: '1.5rem' }}>📘</a>
                            <a href="#" style={{ fontSize: '1.5rem' }}>📷</a>
                            <a href="#" style={{ fontSize: '1.5rem' }}>🐦</a>
                            <a href="#" style={{ fontSize: '1.5rem' }}>▶️</a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                    paddingTop: 'var(--space-lg)',
                    textAlign: 'center',
                    opacity: 0.8,
                    fontSize: '0.9rem'
                }}>
                    © 2026 TechStore. Proyecto educativo DAW - React E-commerce
                </div>
            </div>
        </footer>
    )
}
