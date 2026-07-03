import { Link } from 'react-router-dom'
import { FACEBOOK_URL, INSTAGRAM_URL } from '../utils/constants'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer-vk">
      <div className="mag-container">
        
        <div className="footer-top">
          <div className="footer-brand-section">
            <h2 className="footer-logo">V<span className="vk-accent">K</span></h2>
            <p className="footer-tagline">Heritage. Health. Harmony.</p>
          </div>
          <div className="footer-newsletter">
            <h4>Join the Inner Circle</h4>
            <p>Exclusive offers, wellness tips, and pantry updates.</p>
            <div className="newsletter-input-group">
              <input type="email" placeholder="Your Email Address" />
              <button className="btn-mag-solid">Subscribe</button>
            </div>
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
