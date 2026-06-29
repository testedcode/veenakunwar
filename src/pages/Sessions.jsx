import { Link } from 'react-router-dom'
import './Sessions.css'

function Sessions() {
  return (
    <div className="sessions-page">
      <section className="mag-section hero-mag-section text-center" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/assets/yoga2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff' }}>
        <div className="mag-container" data-aos="fade-up">
          <h4 style={{color: '#fff'}}>Hasya Yoga by Veena</h4>
          <h1 style={{color: '#fff'}}>Breathe. Laugh. Heal.</h1>
          <p style={{color: '#fff'}}>Join our morning sessions to start your day with immense positivity.</p>
        </div>
      </section>

      <section className="mag-section">
        <div className="mag-container">
          <div className="grid-2-col align-center">
            <div data-aos="fade-right">
              <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>The Morning Ritual</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--mag-text-sub)', marginBottom: '2rem' }}>
                We believe that health starts from within. While our heritage pantry takes care of your physical nutrition, our morning Hasya (Laughter) Yoga sessions take care of your mental and emotional well-being.
              </p>
              
              <div className="schedule-card shadow-lg">
                <h3>🗓️ Session Schedule</h3>
                <p className="schedule-days">Monday to Saturday</p>
                <div className="time-slots">
                  <div className="time-slot">
                    <span className="slot-icon">🌅</span>
                    <span className="slot-time">5:00 AM - 6:00 AM</span>
                  </div>
                  <div className="time-slot">
                    <span className="slot-icon">☀️</span>
                    <span className="slot-time">6:00 AM - 7:00 AM</span>
                  </div>
                </div>
                
                <a 
                  href="https://zoom.us/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-mag-solid full-width text-center mt-4"
                  style={{ display: 'block', fontSize: '1.2rem' }}
                >
                  Join via Zoom Link
                </a>
              </div>
            </div>

            <div data-aos="fade-left" className="sessions-image-collage">
              <img src="/assets/yoga1.jpg" alt="Yoga Session" className="rounded-image shadow-lg" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Cross-Sell */}
      <section className="mag-section" style={{ backgroundColor: 'var(--mag-surface)', textAlign: 'center' }}>
        <div className="mag-container" data-aos="zoom-in">
          <h2>Fuel Your Practice</h2>
          <p style={{ marginBottom: '2rem' }}>Pair your healthy morning routine with our whole-wheat, desi ghee snacks.</p>
          <Link to="/shop" className="btn-mag-outline">Shop Healthy Snacks</Link>
        </div>
      </section>
    </div>
  )
}

export default Sessions
