import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './About.css'

function About() {
  const scrollRef = useRef(null)

  useEffect(() => {
    // Simple parallax effect for elements with data-speed
    const handleScroll = () => {
      if (!scrollRef.current) return
      const elements = scrollRef.current.querySelectorAll('[data-speed]')
      
      elements.forEach(el => {
        const speed = el.getAttribute('data-speed')
        const yPos = -(window.scrollY * speed)
        el.style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="about-radical" ref={scrollRef}>
      
      {/* Chapter 1: The Struggle */}
      <section className="about-chapter chapter-struggle organic-section">
        <div className="fluid-container">
          <div className="text-layer" data-speed="0.2">
            <h1 className="chapter-title">The Depth of <br/> The Valley</h1>
          </div>
          
          <div className="content-layer">
            <div className="story-block" data-speed="-0.1">
              <p className="story-lead">Before the laughter, there was silence.</p>
              <p className="story-text">
                Asthma. Severe arthritis (Gathiya). A painful knee replacement. 
                The physical toll was immense, pulling the spirit down into a valley of endless medical appointments and limitations. 
                When your body fights against you every day, finding joy feels like an impossible climb.
              </p>
            </div>
            <div className="abstract-shape shape-1 animate-float"></div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Awakening (Yoga) */}
      <section className="about-chapter chapter-awakening organic-section">
        <div className="fluid-container">
          <div className="awakening-grid">
            <div className="image-column" data-speed="0.15">
              {/* Replace with a real portrait of Veena doing yoga or smiling */}
              <div className="organic-image-mask">
                <img src="/profile.jpg" alt="Veena Kunwar" />
              </div>
            </div>
            
            <div className="text-column" data-speed="-0.05">
              <h2 className="chapter-title">Breathing <br/> Life Back</h2>
              <p className="story-text">
                Then came Hasya Yoga. It wasn't about complex postures; it was about the fundamental human act of laughing. 
                Laughter forced the breath deep into the lungs, challenging the asthma. The gentle, joyful movements coaxed the stiff joints back to life.
              </p>
              <p className="story-text highlight-text">
                Yoga wasn't just a practice; it was a resurrection.
              </p>
            </div>
          </div>
        </div>
        <div className="abstract-shape shape-2"></div>
      </section>

      {/* Chapter 3: The Transformation (Food) */}
      <section className="about-chapter chapter-nourishment organic-section">
        <div className="fluid-container">
          <div className="text-layer center-text" data-speed="0.1">
            <h2 className="chapter-title">From Healing <br/> to Nourishing</h2>
          </div>
          
          <div className="nourishment-layout">
            <div className="story-block wide" data-speed="0">
              <p className="story-text">
                A healthy mind and a recovering body demanded a new lifestyle. The journey didn't stop on the yoga mat. 
                Exploring truly healthy habits meant returning to our roots. It meant rejecting processed, artificial snacks and bringing back the purity of home-cooked heritage foods.
              </p>
              <p className="story-text">
                Every batch of Thekwa, every piece of Nimki is kneaded with the same dedication that healed a broken body. 
                Made with Sudh Desi Ghee and boundless love, this is more than food. It's a prescription for a joyful, healthy life.
              </p>
              
              <div className="chapter-actions">
                <Link to="/sessions" className="btn-organic">Experience the Laughter</Link>
                <Link to="/shop" className="btn-solid">Taste the Love</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About
