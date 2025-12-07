import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">

          {/* ---------- LOGO + TEXT ---------- */}
          <Link to="/" className="navbar-brand">
            <img 
              src="/assets/placeholders/logo2.png"
              alt="Hasya Yoga by Veena Logo"
              className="navbar-logo"
            />
            <div className="brand-text-wrapper">
              <span className="brand-title">Hasya Yoga</span>
              <span className="brand-subtitle">By Veena</span>
            </div>
          </Link>

          {/* ---------- MENU ITEMS ---------- */}
          <ul className="navbar-menu">
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
            </li>
            <li>
              <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
            </li>
            <li>
              <Link to="/sessions" className={isActive('/sessions') ? 'active' : ''}>Sessions</Link>
            </li>
            <li>
              <Link to="/shop" className={isActive('/shop') ? 'active' : ''}>Shop</Link>
            </li>
            <li>
              <Link to="/gallery" className={isActive('/gallery') ? 'active' : ''}>Gallery</Link>
            </li>
            <li>
              <Link to="/social" className={isActive('/social') ? 'active' : ''}>Social</Link>
            </li>
            <li>
              <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
