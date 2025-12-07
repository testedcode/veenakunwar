import { Link } from 'react-router-dom'
import { useCollection } from '../hooks/useFirebase'
import { getGalleryImages } from '../utils/images'
import { FACEBOOK_URL, INSTAGRAM_URL } from '../utils/constants'
import HeroSlider from '../components/Slider/HeroSlider'
import ImageGrid from '../components/Gallery/ImageGrid'
import InstagramFeed from '../components/Social/InstagramFeed'
import FacebookFeed from '../components/Social/FacebookFeed'
import Button from '../components/Button'
import Card from '../components/Card'
import Loader from '../components/Loader'
import './Home.css'

function Home() {
  const { data: testimonials, loading: testimonialsLoading } = useCollection('testimonials')
  // Use local gallery images instead of Firebase Storage
  const galleryUrls = getGalleryImages()
  const galleryLoading = false

  // Sample gallery images for different sections
  const journeyImages = [
    { url: '/assets/placeholders/profile1.jpg' },
    { url: '/assets/placeholders/profile2.jpg' },
    { url: '/profile.jpg' }
  ]

  const momentsImages = [
    { url: '/assets/placeholders/gallery1.jpg' },
    { url: '/assets/placeholders/gallery2.jpg' },
    { url: '/profile.jpg' }
  ]

  return (
    <div className="home">
      {/* Hero Slider Banner */}
      <HeroSlider />

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

      {/* Our Journey Section */}
      <section className="section journey-section">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <ImageGrid 
            images={journeyImages} 
            title=""
            columns={3}
          />
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

      {/* Moments Gallery Section */}
      <section className="section moments-section">
        <div className="container">
          <h2 className="section-title">Moments Gallery</h2>
          <ImageGrid 
            images={momentsImages.length > 0 ? momentsImages : galleryUrls} 
            title=""
            columns={4}
          />
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/gallery">
              <Button variant="secondary">View Full Gallery</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <InstagramFeed title="Instagram Highlights" />

      {/* Facebook Feed Section */}
      <FacebookFeed title="Facebook Updates" />

      {/* Social Media CTA Section */}
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
