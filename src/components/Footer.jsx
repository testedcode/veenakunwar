import { Link } from 'react-router-dom'
import { FACEBOOK_URL, INSTAGRAM_URL } from '../utils/constants'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer-vk">
      <div className="mag-container">
        
        <div className="footer-top">
          <div className="footer-brand-section">
            <img src="/logo.png" alt="Veena Kunwar" className="brand-logo-img" onError={(e) => { e.target.onerror = null; e.target.src = '/logo.jpg'; }} />
            <p className="footer-tagline">Heritage. Health. Harmony.</p>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>The Pantry</h4>
            <ul>
              <li><Link to="/shop">Shop Premium Foods</Link></li>
              <li><Link to="/offers">Seasonal Offers</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>The Practice</h4>
            <ul>
              <li><Link to="/sessions">Join Yoga Sessions</Link></li>
              <li><Link to="/about">Veena's Story</Link></li>
              <li><Link to="/gallery">Visual Journey</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Veena Kunwar. All rights reserved.</p>
          <div className="powered-by">
            <p>Powered by</p>
            <a href="https://futurewebguru.com" target="_blank" rel="noopener noreferrer" className="powered-by-link">
              <span className="powered-by-text">FutureWebGuru.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
