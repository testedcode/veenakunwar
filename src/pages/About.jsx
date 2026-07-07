import { useState } from 'react'
import { Link } from 'react-router-dom'
import YoutubeShorts from '../components/YoutubeShorts'
import './About.css'

const PROFILE_IMAGES = [
  { src: '/profile.jpg',                     caption: 'With the yoga community' },
  { src: '/assets/placeholders/profile2.jpg', caption: 'Veena Kunwar — founder & instructor' },
  { src: '/assets/placeholders/profile1.jpg', caption: 'Spreading joy through Hasya Yoga' },
]

function ProfileGallery() {
  const [active, setActive] = useState(0)
  return (
    <div className="profile-gallery">
      {/* Main big image */}
      <div className="profile-main-img-wrap">
        {PROFILE_IMAGES.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.caption}
            className={`profile-main-img ${i === active ? 'visible' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        {/* Gold border decoration */}
        <div className="profile-frame-deco" />
      </div>

      {/* Thumbnail strip */}
      <div className="profile-thumbs">
        {PROFILE_IMAGES.map((img, i) => (
          <button
            key={i}
            className={`profile-thumb ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`View: ${img.caption}`}
          >
            <img src={img.src} alt={img.caption} loading="lazy" />
          </button>
        ))}
      </div>

      {/* Caption */}
      <p className="profile-caption">— {PROFILE_IMAGES[active].caption}</p>
    </div>
  )
}

function About() {
  return (
    <div className="about-page-vk">

      {/* ── HERO ── */}
      <section className="about-hero-vk" aria-label="About Veena Kunwar">
        <div className="about-hero-bg" />
        <div className="mag-container about-hero-inner">
          {/* Logo floats in hero */}
          <div className="about-logo-wrap" data-aos="zoom-in" data-aos-duration="900">
            <img src="/logo.png" alt="Veena Kunwar" className="about-logo" />
          </div>
          <div className="about-hero-text" data-aos="fade-up" data-aos-delay="200">
            <span className="about-eyebrow">The Story Behind the Brand</span>
            <h1 className="about-hero-title">A Journey Through<br/>Resilience & Joy</h1>
            <p className="about-hero-sub">
              From severe asthma and double knee replacement — to healing thousands 
              through laughter, breath, and the purest food. This is Veena's story.
            </p>
            <div className="about-hero-stats">
              <div className="hero-stat">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Yoga Students</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">6+</span>
                <span className="stat-label">Years of Teaching</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Pure Desi Ghee</span>
              </div>
            </div>
          </div>
        </div>
        {/* scroll cue */}
        <div className="scroll-cue" aria-hidden="true">
          <span /><span /><span />
        </div>
      </section>

      {/* ── MEET VEENA ── */}
      <section className="meet-section">
        <div className="mag-container meet-grid">
          <div className="meet-images" data-aos="fade-right" data-aos-duration="1200">
            <ProfileGallery />
          </div>
          <div className="meet-text" data-aos="fade-left" data-aos-delay="150" data-aos-duration="1200">
            <span className="about-eyebrow">Meet the Founder</span>
            <h2 className="meet-heading">Veena Kunwar</h2>
            <div className="meet-title-badge">Hasya Yoga Instructor · Food Artisan · Wellness Advocate</div>
            <p>
              Veena Kunwar is not your typical wellness entrepreneur. Her journey did not begin with perfect health — 
              it began with the <strong>hardest possible starting point</strong>: severe asthma, debilitating arthritis, 
              and a double knee replacement that most would consider a life sentence to limited movement.
            </p>
            <p>
              Rather than accepting limitations, she discovered <strong>Hasya Yoga</strong> — the ancient practice of 
              therapeutic laughter and conscious breathing. Within months, the asthma softened. The joints loosened. 
              The joy returned. And a calling was born.
            </p>
            <p>
              Today, she leads <strong>daily live Zoom sessions</strong> reaching students across India and beyond, 
              and crafts <strong>authentic heritage snacks</strong> — Thekuwa, Nimki, Ladoos — made entirely in 
              pure Desi Ghee, with no Maida, no refined sugar, no shortcuts. 
              Just the way her family has done for generations.
            </p>
            <div className="meet-values">
              <div className="meet-value-item">
                <span className="mvi-icon">🧘</span>
                <div>
                  <strong>Certified Yoga Instructor</strong>
                  <span>Specialising in Hasya (Laughter) Yoga</span>
                </div>
              </div>
              <div className="meet-value-item">
                <span className="mvi-icon">🍯</span>
                <div>
                  <strong>Heritage Food Artisan</strong>
                  <span>Traditional recipes, zero compromise on purity</span>
                </div>
              </div>
              <div className="meet-value-item">
                <span className="mvi-icon">❤️</span>
                <div>
                  <strong>Community Builder</strong>
                  <span>1000+ students in her morning yoga family</span>
                </div>
              </div>
            </div>
            <div className="meet-actions">
              <Link to="/sessions" className="btn-mag-solid">Join a Yoga Class</Link>
              <Link to="/shop" className="btn-mag-outline">Shop Our Foods</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ── */}
      <section className="journey-section">
        <div className="journey-bg" />
        <div className="mag-container">
          <div className="journey-header text-center" data-aos="fade-up">
            <span className="about-eyebrow">The Journey</span>
            <h2 className="journey-title">From Pain to Purpose</h2>
          </div>

          <div className="journey-steps">

            <div className="journey-step" data-aos="fade-right" data-aos-duration="1100">
              <div className="step-number">01</div>
              <div className="step-content">
                <div className="step-img-wrap">
                  <img src="/assets/placeholders/profile2.jpg" alt="The struggle" loading="lazy" />
                </div>
                <div className="step-text">
                  <h4>The Valley</h4>
                  <h3>Before the Laughter, There Was Silence</h3>
                  <p>
                    Severe asthma made every breath a battle. Crippling arthritis robbed daily joys. 
                    A double knee replacement surgery felt like the end of an active life. 
                    The days were filled with medical appointments and a deep longing for vitality that seemed out of reach.
                  </p>
                </div>
              </div>
            </div>

            <div className="journey-step reversed" data-aos="fade-left" data-aos-duration="1100">
              <div className="step-number">02</div>
              <div className="step-content">
                <div className="step-img-wrap">
                  <img src="/assets/yoga1.jpg" alt="Yoga Awakening" loading="lazy" />
                </div>
                <div className="step-text">
                  <h4>The Awakening</h4>
                  <h3>Laughter as Medicine</h3>
                  <p>
                    Then came Hasya Yoga. Not the painful, impossible postures she feared — but the 
                    fundamental human act of laughing deeply and breathing consciously. Laughter forced 
                    oxygen deep into the lungs, challenging the asthma. Gentle movements coaxed stiff 
                    joints back to life. The transformation was extraordinary.
                  </p>
                </div>
              </div>
            </div>

            <div className="journey-step" data-aos="fade-right" data-aos-duration="1100">
              <div className="step-number">03</div>
              <div className="step-content">
                <div className="step-img-wrap food-img">
                  <img src="/assets/vk_thekuwa.png" alt="Heritage Kitchen" loading="lazy" />
                </div>
                <div className="step-text">
                  <h4>The Nourishment</h4>
                  <h3>Returning to Our Roots</h3>
                  <p>
                    A healing body demanded healing food. True wellness meant rejecting processed snacks 
                    and embracing the purity of ancestral recipes — handmade Thekuwa, crispy Nimki, 
                    and nourishing Ladoos, all crafted in pure Desi Ghee. Every batch is kneaded with 
                    the same dedication that healed a broken body.
                  </p>
                  <Link to="/shop" className="step-cta">Explore the Pantry →</Link>
                </div>
              </div>
            </div>

            <div className="journey-step reversed" data-aos="fade-left" data-aos-duration="1100">
              <div className="step-number">04</div>
              <div className="step-content">
                <div className="step-img-wrap">
                  <img src="/assets/placeholders/profile1.jpg" alt="Community" loading="lazy" />
                </div>
                <div className="step-text">
                  <h4>The Community</h4>
                  <h3>Growing Together</h3>
                  <p>
                    What started as a personal healing journey blossomed into a thriving community. 
                    Today, over a thousand students join Veena every morning — laughing, breathing, 
                    and beginning their days with joy. From school teachers to retirees, 
                    the community spans all ages and backgrounds, united by a simple belief: 
                    that wellness is a right, not a privilege.
                  </p>
                  <Link to="/sessions" className="step-cta">Join Our Community →</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY STRIP ── */}
      <section className="philosophy-strip">
        <div className="mag-container philosophy-inner">
          <div className="philosophy-quote" data-aos="zoom-in">
            <div className="quote-mark">"</div>
            <blockquote>
              Food that heals, not harms. Laughter that liberates, not escapes. 
              This is the Veena Kunwar way.
            </blockquote>
            <cite>— Veena Kunwar</cite>
          </div>
          <div className="philosophy-pillars" data-aos="fade-up" data-aos-delay="200">
            {[
              { icon: '🌾', title: 'No Maida. Ever.', desc: '100% whole wheat in every product' },
              { icon: '🍯', title: 'Pure Desi Ghee', desc: 'No palm oil. No shortcuts.' },
              { icon: '😄', title: 'Joy as Medicine', desc: 'Laughter is the best therapy' },
              { icon: '🤲', title: 'Made by Hand', desc: 'Every piece shaped with care' },
            ].map((p, i) => (
              <div className="philosophy-pillar" key={i}>
                <span className="pp-icon">{p.icon}</span>
                <strong>{p.title}</strong>
                <span>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="about-cta-section" data-aos="fade-up">
        <div className="mag-container text-center">
          <img src="/logo.png" alt="Veena Kunwar" className="about-cta-logo" />
          <h2>Ready to Start Your Journey?</h2>
          <p>Join our morning yoga community or order your first batch of pure homemade snacks.</p>
          <div className="about-cta-btns">
            <Link to="/sessions" className="btn-mag-solid">Join Yoga Sessions</Link>
            <Link to="/shop" className="btn-mag-outline">Shop Now</Link>
          </div>
        </div>
      </section>
      {/* ── YOUTUBE VIDEOS ── */}
      <section className="about-yt-wrap">
        <div className="mag-container">
          <YoutubeShorts limit={10} title="Watch Veena's Videos" />
        </div>
      </section>

    </div>
  )
}

export default About
