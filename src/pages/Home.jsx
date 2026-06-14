import { Link } from 'react-router-dom'
import { useCollection } from '../hooks/useFirebase'
import { FACEBOOK_URL, INSTAGRAM_URL } from '../utils/constants'
import { localImages } from '../utils/images'
import HeroSlider from '../components/Slider/HeroSlider'
import Button from '../components/Button'
import Card from '../components/Card'
import Loader from '../components/Loader'
import './Home.css'

function Home() {
  const { data: testimonials, loading: testimonialsLoading } = useCollection('testimonials')
  const { data: firebaseProducts, loading: productsLoading } = useCollection('products')

  // Combine local products with any firebase products to show featured items
  const featuredProducts = [...localImages.products, ...(firebaseProducts || [])].slice(0, 3)

  return (
    <div className="home">
      {/* 1. Immersive Hero Slider (Hasya Yoga Focus) */}
      <div className="hero-container">
        <HeroSlider />
        <div className="hero-overlay-content animate-fade-up">
          <h1 className="hero-title-blast">Discover Joy & Wellness</h1>
          <p className="hero-subtitle-blast">Experience the transformative power of Hasya Yoga and nourish your body with our premium heritage foods.</p>
          <div className="hero-actions">
            <Link to="/about" className="btn btn-primary">Our Story</Link>
            <a href="#featured-shop" className="btn btn-secondary">Explore Products</a>
          </div>
        </div>
      </div>

      {/* 2. Dual Showcase Section: Yoga + Food */}
      <section className="section dual-showcase">
        <div className="container">
          <div className="showcase-grid">
            
            {/* Yoga Side */}
            <div className="showcase-card glossy-card yoga-side">
              <div className="showcase-icon">🧘‍♀️</div>
              <h2>Hasya Yoga</h2>
              <p>Laughter Yoga combines unconditional laughter with yogic breathing. It reduces stress, boosts immunity, and brings unparalleled joy to your daily life.</p>
              <ul className="showcase-benefits">
                <li>✨ Stress Relief & Mindfulness</li>
                <li>✨ Enhanced Immune System</li>
                <li>✨ Joyful Community Connections</li>
              </ul>
              <Link to="/sessions">
                <Button variant="secondary">Join a Session</Button>
              </Link>
            </div>

            {/* Products Side */}
            <div className="showcase-card glossy-card food-side">
              <div className="showcase-icon">🍯</div>
              <h2>Heritage Foods</h2>
              <p>We craft authentic, traditional delicacies like Thekwa and Nimki using the finest ingredients like Sudh Desi Ghee. Pure, wholesome, and made with love.</p>
              <ul className="showcase-benefits">
                <li>✨ Authentic Traditional Recipes</li>
                <li>✨ Premium Sudh Desi Ghee</li>
                <li>✨ Zero Artificial Preservatives</li>
              </ul>
              <Link to="/shop">
                <Button variant="primary">Visit Shop</Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Featured Products "Blast" Carousel / Grid */}
      <section id="featured-shop" className="section featured-products">
        <div className="container">
          <div className="section-header-dynamic">
            <h2 className="section-title">Trending Delicacies</h2>
            <p className="section-subtitle">Handcrafted with heritage recipes to nourish your soul.</p>
          </div>

          {productsLoading ? (
            <Loader />
          ) : (
            <div className="products-showcase-grid">
              {featuredProducts.map((product, index) => (
                <div key={index} className="product-blast-card">
                  <div className="product-image-wrapper">
                    <img src={product.imageURL} alt={product.name} />
                    <div className="product-badge">Top Rated</div>
                  </div>
                  <div className="product-blast-info">
                    <h3>{product.name}</h3>
                    <p className="price">₹{product.price}</p>
                    <p className="desc">{product.description?.substring(0, 60)}...</p>
                    <Link to="/shop" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/shop" className="btn btn-secondary btn-lg">Explore All Products ➔</Link>
          </div>
        </div>
      </section>

      {/* 4. Social Wall (Replaces broken embeds) */}
      <section className="section social-wall-section">
        <div className="container">
          <div className="social-wall-header">
            <h2>Join Our Community</h2>
            <p>Follow our journey of laughter and wellness on social media.</p>
          </div>
          
          <div className="social-wall-grid">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="social-wall-card insta-card">
              <div className="social-wall-icon">📷</div>
              <h3>Instagram Reels & Highlights</h3>
              <p>Watch our daily doses of laughter and behind-the-scenes of our heritage kitchen.</p>
              <span className="social-wall-cta">Follow @veena_kunwar ➔</span>
            </a>
            
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="social-wall-card fb-card">
              <div className="social-wall-icon">📘</div>
              <h3>Facebook Community</h3>
              <p>Connect with fellow practitioners and get updates on our latest sessions and products.</p>
              <span className="social-wall-cta">Join the Group ➔</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. Dynamic Testimonials */}
      <section className="section testimonials-blast">
        <div className="container">
          <h2 className="section-title" style={{color: 'white'}}>Words of Joy</h2>
          {testimonialsLoading ? (
            <Loader />
          ) : testimonials.length > 0 ? (
            <div className="testimonials-masonry">
              {testimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="testimonial-blast-card">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <p className="testimonial-author">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data" style={{color: 'white'}}>
              <p>Join us and be the first to share your experience!</p>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

export default Home
