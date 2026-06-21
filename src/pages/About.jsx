import { Link } from 'react-router-dom'
import './About.css'

function About() {
  return (
    <div className="about-magazine">
      
      <section className="mag-section about-hero">
        <div className="mag-container text-center">
          <h4>The Founder's Story</h4>
          <h1>A Journey Through <br/> Resilience</h1>
        </div>
      </section>

      {/* Section 1: The Medical Struggles */}
      <section className="mag-section">
        <div className="mag-container">
          <div className="grid-2-col">
            <div className="about-text-content">
              <h4>01. The Valley</h4>
              <h2>Before the Laughter, There Was Silence.</h2>
              <p>
                Life has a way of testing our limits. For Veena, the test came in the form of severe asthma, crippling arthritis (Gathiya), and eventually, a painful knee replacement.
              </p>
              <p>
                The physical toll was immense. When your body fights against you every day, finding joy feels like an impossible climb. The days were filled with medical appointments, limitations, and a deep longing for the vitality of youth.
              </p>
            </div>
            <div className="mag-image-frame portrait-frame">
              <img src="/profile.jpg" alt="Medical Struggle and Resilience" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Yoga Recovery */}
      <section className="mag-section mag-bg-contrast">
        <div className="mag-container">
          <div className="text-center" style={{ marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
            <h4>02. The Awakening</h4>
            <h2>Breathing Life Back</h2>
            <p>
              Then came Hasya Yoga. It wasn't about complex postures; it was about the fundamental human act of laughing. Laughter forced the breath deep into the lungs, challenging the asthma. The gentle, joyful movements coaxed the stiff joints back to life.
            </p>
          </div>
          
          <div className="grid-3-col">
            <div className="mag-image-frame">
              <img src="/gallery-placeholder.jpg" alt="Yoga Session 1" />
            </div>
            <div className="mag-image-frame">
              <img src="/profile.jpg" alt="Yoga Session 2" />
            </div>
            <div className="mag-image-frame">
              <img src="/gallery-placeholder.jpg" alt="Yoga Session 3" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Transition to Food */}
      <section className="mag-section">
        <div className="mag-container">
          <div className="about-food-layout">
            <div className="mag-image-frame full-width-frame">
              <img src="/thekuwa.jpg" alt="Heritage Kitchen" />
            </div>
            <div className="food-text-card">
              <h4>03. The Nourishment</h4>
              <h2>From Healing to Nourishing</h2>
              <p>
                A healthy mind and a recovering body demanded a new lifestyle. The journey didn't stop on the yoga mat. Exploring truly healthy habits meant returning to our roots. It meant rejecting processed, artificial snacks and bringing back the purity of home-cooked heritage foods.
              </p>
              <p>
                Every batch of Thekwa, every piece of Nimki is kneaded with the same dedication that healed a broken body. Made with Sudh Desi Ghee and boundless love.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <Link to="/shop" className="btn-mag-solid">Explore the Pantry</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About
