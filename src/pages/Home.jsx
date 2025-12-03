import { Link } from 'react-router-dom'
import { useCollection } from '../hooks/useFirebase'
import { getGalleryImages } from '../utils/images'
import { FACEBOOK_URL, INSTAGRAM_URL } from '../utils/constants'
import Button from '../components/Button'
import Card from '../components/Card'
import Loader from '../components/Loader'
import './Home.css'

function Home() {
  const { data: testimonials, loading: testimonialsLoading } = useCollection('testimonials')
  // Use local gallery images instead of Firebase Storage
  const galleryUrls = getGalleryImages()
  const galleryLoading = false

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Hasya Yoga</h1>
            <p className="hero-subtitle">Experience the Joy of Laughter and Wellness</p>
            <p className="hero-description">
              Join us for transformative yoga sessions that combine traditional practices with the healing power of laughter.
            </p>
            <div className="hero-buttons">
              <Link to="/sessions">
                <Button variant="primary">Join Zoom Session</Button>
              </Link>
              <Link to="/gallery">
                <Button variant="secondary">View Gallery</Button>
              </Link>
              <Link to="/shop">
                <Button variant="success">Shop Products</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section intro-section">
        <div className="container">
          <div className="intro-content">
            <h2>What is Hasya Yoga?</h2>
            <p>
              Hasya Yoga, or Laughter Yoga, is a unique practice that combines unconditional laughter with yogic breathing.
              It's a powerful tool for reducing stress, improving health, and bringing joy into your daily life.
            </p>
            <p>
              Our sessions are designed to be accessible, fun, and transformative. Whether you're a beginner or experienced practitioner,
              you'll find a welcoming community and a path to greater wellness.
            </p>
            <Link to="/about">
              <Button variant="primary">Learn More About Us</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Students Say</h2>
          {testimonialsLoading ? (
            <Loader />
          ) : testimonials.length > 0 ? (
            <div className="testimonials-grid">
              {testimonials.slice(0, 3).map((testimonial) => (
                <Card key={testimonial.id} className="testimonial-card">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <p className="testimonial-author">— {testimonial.author}</p>
                </Card>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <p>No testimonials yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section gallery-preview-section">
        <div className="container">
          <h2 className="section-title">Gallery Preview</h2>
          {galleryLoading ? (
            <Loader />
          ) : galleryUrls.length > 0 ? (
            <div className="gallery-preview">
              {galleryUrls.slice(0, 6).map((item, index) => (
                <div key={index} className="gallery-preview-item">
                  <img src={item.url} alt={`Gallery ${index + 1}`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <p>Gallery images coming soon!</p>
            </div>
          )}
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/gallery">
              <Button variant="secondary">View Full Gallery</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="section social-section">
        <div className="container">
          <h2 className="section-title">Connect With Us</h2>
          <div className="social-buttons">
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="social-link">
              <span className="social-icon">📘</span>
              <span>Facebook</span>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="social-link">
              <span className="social-icon">📷</span>
              <span>Instagram</span>
            </a>
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/social">
              <Button variant="primary">Visit Social Hub</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

