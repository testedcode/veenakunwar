import { Link } from 'react-router-dom'
import './About.css'

function About() {
  return (
    <div className="about-page-vk">
      
      <section className="about-hero-vk text-center">
        <div className="mag-container">
          <h4 className="vk-accent-text">The Origin</h4>
          <h1>A Journey Through <br/> Resilience</h1>
          <p className="hero-subtitle">How physical struggle birthed a wellness revolution.</p>
        </div>
      </section>

      <section className="timeline-section">
        <div className="mag-container">
          
          <div className="timeline-block">
            <div className="timeline-content">
              <h4>01. The Valley</h4>
              <h2>Before the Laughter, There Was Silence.</h2>
              <p>Life has a way of testing our physical boundaries. For Veena, this test manifested as severe asthma, crippling arthritis, and eventually, a highly painful double knee replacement.</p>
              <p>When your body fights against you every day, finding joy feels like an impossible climb. The days were filled with medical appointments and a deep longing for vitality.</p>
            </div>
            <div className="timeline-image portrait-frame">
              <img src="/profile.jpg" alt="Medical Struggle and Resilience" />
            </div>
          </div>

          <div className="timeline-block reversed">
            <div className="timeline-content">
              <h4>02. The Awakening</h4>
              <h2>Breathing Life Back</h2>
              <p>Then came Hasya Yoga. It wasn't about complex, painful postures; it was about the fundamental human act of laughing. Laughter forced oxygen deep into the lungs, challenging the asthma. The gentle, joyful movements coaxed stiff joints back to life.</p>
              <p>Today, Veena leads daily Zoom sessions, proving that healing begins in the mind and breath.</p>
            </div>
            <div className="timeline-image">
              <img src="/gallery-placeholder.jpg" alt="Yoga Recovery" />
            </div>
          </div>

          <div className="timeline-block">
            <div className="timeline-content">
              <h4>03. The Nourishment</h4>
              <h2>From Healing to Heritage</h2>
              <p>A healthy mind and recovering body demanded a new lifestyle. True healing meant returning to our roots—rejecting processed snacks and bringing back the purity of home-cooked heritage foods.</p>
              <p>Every batch of Thekuwa and Nimki is kneaded with the same dedication that healed a broken body. Crafted exclusively with Sudh Desi Ghee and boundless love.</p>
              <Link to="/shop" className="btn-mag-solid">Explore the Pantry</Link>
            </div>
            <div className="timeline-image full-width-frame">
              <img src="/assets/vk_thekuwa.png" alt="Heritage Kitchen" />
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}

export default About
