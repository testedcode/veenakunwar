import { Link } from 'react-router-dom'
import { FACEBOOK_URL, INSTAGRAM_URL, YOUTUBE_URL } from '../utils/constants'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer-vk" aria-label="Site footer">
      <div className="mag-container">

        {/* Top brand strip */}
        <div className="footer-top">
          <div className="footer-brand-section">
            <Link to="/" aria-label="Veena Kunwar Home">
              <img
                src="/logo.png"
                alt="Veena Kunwar – Yoga & Homemade Healthy Snacks"
                className="footer-logo-img"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
              />
              <span className="footer-logo-fallback" style={{ display: 'none' }}>
                <span className="brand-text-vk-footer">V<span className="vk-accent">K</span></span>
              </span>
            </Link>
            <p className="footer-tagline">Heritage · Health · Harmony</p>
            <p className="footer-motto">"Eat Healthy, Live Happy"</p>

            {/* Social icons */}
            <div className="footer-socials">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              </a>
              <a href="https://wa.me/917566631777" target="_blank" rel="noopener noreferrer" className="social-icon-btn whatsapp-icon" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Value pillars */}
          <div className="footer-pillars">
            <div className="footer-pillar">
              <span className="pillar-icon">🌾</span>
              <span>No Maida</span>
            </div>
            <div className="footer-pillar">
              <span className="pillar-icon">🍯</span>
              <span>Pure Desi Ghee</span>
            </div>
            <div className="footer-pillar">
              <span className="pillar-icon">🌿</span>
              <span>No Refined Sugar</span>
            </div>
            <div className="footer-pillar">
              <span className="pillar-icon">❤️</span>
              <span>Handmade</span>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/offers">Special Offers</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/sessions">Yoga Sessions</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="https://wa.me/917566631777" target="_blank" rel="noopener noreferrer" className="footer-wa-link">
                  📱 +91 75666 31777
                </a>
              </li>
              <li>
                <a href="https://wa.me/919770477731" target="_blank" rel="noopener noreferrer" className="footer-wa-link">
                  📱 +91 97704 77731
                </a>
              </li>
              <li><Link to="/contact">Send Message</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <ul>
              <li><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Veena Kunwar. All rights reserved.</p>
          <div className="powered-by">
            <p>Powered by</p>
            <a href="https://futurewebguru.com" target="_blank" rel="noopener noreferrer" className="powered-by-link">
              FutureWebGuru.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
