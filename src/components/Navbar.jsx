import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const { cart, toggleCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const navLinks = [
    { to: '/about',    label: 'Hamare Baare Mein' },
    { to: '/shop',     label: 'Khaana Order Karein' },
    { to: '/sessions', label: 'Yoga Class' },
    { to: '/offers',   label: 'Special Offers' },
    { to: '/gallery',  label: 'Photos' },
    { to: '/contact',  label: 'Sampark Karein' },
  ]

  return (
    <nav className="navbar glossy-nav" aria-label="Main navigation">
      <div className="mag-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-brand" aria-label="Veena Kunwar - Home">
            <img
              src="/assets/vk-logo.png"
              alt="Veena Kunwar Logo"
              className="brand-logo-img"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <span className="brand-text-fallback" style={{ display: 'none' }}>
              <span className="brand-text-vk">V<span className="vk-accent">K</span></span>
              <span className="brand-subtext">VEENA KUNWAR</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="navbar-menu" role="list">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={location.pathname === to ? 'active' : ''}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <button
              className="cart-toggle-btn"
              onClick={toggleCart}
              aria-label={`Open cart, ${cartItemCount} items`}
              id="cart-toggle-btn"
            >
              <span>🛒 Tokri</span>
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </button>

            {/* Mobile Hamburger */}
            <button
              className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="navigation" aria-label="Mobile navigation">
        <ul>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={location.pathname === to ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button className="mobile-cart-btn" onClick={() => { toggleCart(); setMenuOpen(false) }}>
              🛒 Tokri {cartItemCount > 0 && `(${cartItemCount})`}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
