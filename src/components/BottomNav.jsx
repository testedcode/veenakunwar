import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import './BottomNav.css'

const tabs = [
  { to: '/',         label: 'Home',    icon: '🏠' },
  { to: '/shop',     label: 'Shop',    icon: '🛒' },
  { to: '/sessions', label: 'Yoga',    icon: '🧘' },
  { to: '/about',    label: 'Story',   icon: '📖' },
  { to: '/contact',  label: 'Contact', icon: '📞' },
]

export default function BottomNav() {
  const location = useLocation()
  const { cart }  = useCart()
  const cartCount = cart.reduce((t, i) => t + i.quantity, 0)

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {tabs.map(({ to, label, icon }) => {
        const isCart   = to === '/shop'
        const isActive = location.pathname === to ||
                         (to !== '/' && location.pathname.startsWith(to))
        return (
          <Link key={to} to={to} className={`bn-tab ${isActive ? 'active' : ''}`} aria-label={label}>
            <span className="bn-icon">
              {icon}
              {isCart && cartCount > 0 && (
                <span className="bn-badge">{cartCount}</span>
              )}
            </span>
            <span className="bn-label">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
