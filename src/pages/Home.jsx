import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home-animated">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(/assets/hero.jpg)' }}>
        <div className="mag-container text-center text-white" data-aos="fade-up" data-aos-duration="1000">
          <h4 className="hero-subtitle">Est. 2024</h4>
          <h1 className="hero-title">Timeless Taste, <br/> Uncompromised Health</h1>
          <p className="hero-desc">Discover heritage recipes handcrafted in pure Desi Ghee. No shortcuts. No maida.</p>
          <div className="hero-actions">
            <Link to="/shop" className="btn-mag-solid hero-btn">Explore Pantry</Link>
            <Link to="/sessions" className="btn-mag-outline hero-btn outline-white">Join Yoga</Link>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="values-section">
        <div className="mag-container">
          <div className="values-grid">
            <div className="value-card" data-aos="fade-up" data-aos-delay="100">
              <div className="value-icon">🌾</div>
              <h3>100% Whole Wheat</h3>
              <p>We absolutely refuse to use Maida. Every bite is rich in fiber and wholesome nutrition.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="200">
              <div className="value-icon">🍯</div>
              <h3>Pure Desi Ghee</h3>
              <p>NO Palm Oil. We fry and bake exclusively in traditional Desi Ghee for authentic taste and health.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="300">
              <div className="value-icon">🌿</div>
              <h3>No Refined Sugar</h3>
              <p>Opt for our premium Gud (Jaggery) variants for a completely refined-sugar-free delight.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="400">
              <div className="value-icon">❤️</div>
              <h3>Handmade with Love</h3>
              <p>Every single piece is shaped by hand, preserving the heritage of generations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact Image Break */}
      <section className="image-break" style={{ backgroundImage: 'url(/assets/food4.jpg)' }} data-aos="fade-in">
        <div className="image-break-overlay">
          <h2>"Food that heals, rather than harms."</h2>
        </div>
      </section>

      {/* Yoga & Wellness CTA */}
      <section className="wellness-section">
        <div className="mag-container">
          <div className="grid-2-col align-center">
            <div className="wellness-content" data-aos="fade-right">
              <span className="section-tag">Holistic Health</span>
              <h2>Hasya Yoga Sessions</h2>
              <p>Physical health is only half the journey. Join our vibrant community every morning to start your day with joy, deep breathing, and laughter.</p>
              
              <div className="schedule-box">
                <p><strong>🗓️ Mon - Sat</strong></p>
                <div className="time-tags">
                  <span className="time-tag">5:00 AM - 6:00 AM</span>
                  <span className="time-tag">6:00 AM - 7:00 AM</span>
                </div>
              </div>

              <Link to="/sessions" className="btn-mag-solid mt-4">View Zoom Links</Link>
            </div>
            <div className="wellness-image" data-aos="fade-left">
              <img src="/assets/yoga1.jpg" alt="Hasya Yoga Morning Session" className="rounded-image shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Discount Banner */}
      <section className="discount-banner" data-aos="zoom-in">
        <div className="mag-container text-center">
          <h2>Stock up your pantry & save!</h2>
          <p>Order in bulk to keep your family healthy all month.</p>
          <div className="discount-pills">
            <span className="discount-pill">Buy 1KG = <strong>5% OFF</strong></span>
            <span className="discount-pill">Buy 2KG = <strong>10% OFF</strong></span>
          </div>
          <Link to="/offers" className="btn-mag-outline mt-3" style={{borderColor: '#fff', color: '#fff'}}>View All Offers</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
