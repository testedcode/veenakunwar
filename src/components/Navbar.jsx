import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const { cart, toggleCart } = useCart()

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="navbar glossy-nav">
      <div className="mag-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-text-vk">V<span className="vk-accent">K</span></span>
            <span className="brand-subtext">VEENA KUNWAR</span>
          </Link>
          
          <ul className="navbar-menu">
            <li>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                The Story
              </Link>
            </li>
            <li>
              <Link to="/shop" className={location.pathname === '/shop' ? 'active' : ''}>
                Heritage Pantry
              </Link>
            </li>
            <li>
              <Link to="/sessions" className={location.pathname === '/sessions' ? 'active' : ''}>
                Yoga Sessions
              </Link>
            </li>
            <li>
              <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>
                Visuals
              </Link>
            </li>
          </ul>

          <div className="navbar-actions">
            <button className="cart-toggle-btn" onClick={toggleCart}>
              <span>Pantry</span>
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
