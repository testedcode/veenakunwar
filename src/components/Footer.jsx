import { Link } from 'react-router-dom'
import { FACEBOOK_URL, INSTAGRAM_URL } from '../utils/constants'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Hasya Yoga</h3>
            <p>Spreading joy and wellness through laughter and yoga.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/sessions">Sessions</Link></li>
              <li><Link to="/shop">Shop</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/social">Social Media</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">📘 Facebook</a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">📷 Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Hasya Yoga. All rights reserved.</p>
          <div className="powered-by">
            <p>Powered by</p>
            <a 
              href="https://futurewebguru.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="powered-by-link"
            >
              <span className="powered-by-text">FutureWebGuru.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

