import { Link } from 'react-router-dom'
import { useCollection } from '../hooks/useFirebase'
import { localImages } from '../utils/images'
import './Home.css'

function Home() {
  const { data: firebaseProducts } = useCollection('products')
  const featuredProducts = [...localImages.products, ...(firebaseProducts || [])].slice(0, 4)

  return (
    <div className="home-magazine">
      
      {/* Hero Image Collage */}
      <section className="mag-section hero-mag-section">
        <div className="mag-container">
          <div className="hero-grid">
            <div className="hero-grid-main mag-image-frame">
              <img src="/profile.jpg" alt="Veena Kunwar Yoga" />
              <div className="hero-text-overlay">
                <h1>Breathe.<br/>Laugh.<br/>Nourish.</h1>
                <p>Healing the body and soul through heritage.</p>
              </div>
            </div>
            <div className="hero-grid-side">
              <div className="mag-image-frame">
                <img src="/thekuwa.jpg" alt="Fresh Thekwa" />
              </div>
              <div className="mag-image-frame">
                <img src="/gallery-placeholder.jpg" alt="Community Yoga" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Journey Teaser */}
      <section className="mag-section">
        <div className="mag-container">
          <div className="grid-2-col journey-teaser">
            <div className="mag-image-frame portrait-frame">
              <img src="/profile.jpg" alt="Veena Kunwar" />
            </div>
            <div className="journey-text">
              <h4>The Founder's Journey</h4>
              <h2>From Struggle to Strength</h2>
              <p>
                Asthma. Severe arthritis. A painful knee replacement. When the body fights against you, finding joy feels like an impossible climb. 
              </p>
              <p>
                But Hasya Yoga (Laughter Yoga) changed everything. It wasn't just an exercise—it was a resurrection. The gentle movements and deep breathing coaxed stiff joints back to life and fortified the lungs.
              </p>
              <Link to="/about" className="btn-mag-outline">Read the Full Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="mag-section mag-bg-contrast">
        <div className="mag-container">
          <div className="section-header">
            <h4>Heritage Pantry</h4>
            <h2>Crafted with Pure Love</h2>
            <p>Our return to health demanded a return to pure, homemade snacks.</p>
          </div>

          <div className="grid-4-col products-mag-grid">
            {featuredProducts.map((product, idx) => (
              <div key={idx} className="mag-product-card">
                <div className="mag-image-frame">
                  <img src={product.imageURL || '/thekuwa.jpg'} alt={product.name} />
                </div>
                <div className="mag-product-info">
                  <h3>{product.name}</h3>
                  <p className="price">₹{product.price}</p>
                  <Link to="/shop" className="mag-link">Discover Details</Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="center-action" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/shop" className="btn-mag-solid">View Full Pantry</Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
