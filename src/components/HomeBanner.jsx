import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCollection } from '../hooks/useFirebase'
import './HomeBanner.css'

function HomeBanner() {
  const { data: banners, loading } = useCollection('banners')
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const activeBanners = banners.filter(b => b.active !== false)

  // Auto-advance
  useEffect(() => {
    if (activeBanners.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % activeBanners.length)
    }, 5000)
    return () => clearInterval(timerRef.current)
  }, [activeBanners.length])

  const goTo = (idx) => {
    clearInterval(timerRef.current)
    setCurrent(idx)
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % activeBanners.length)
    }, 5000)
  }

  const prev = () => goTo((current - 1 + activeBanners.length) % activeBanners.length)
  const next = () => goTo((current + 1) % activeBanners.length)

  if (loading) {
    return (
      <section className="home-banner-section hero-section" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(/assets/hero.jpg)' }}>
        <DefaultHeroContent />
      </section>
    )
  }

  if (activeBanners.length === 0) {
    return (
      <section className="home-banner-section hero-section" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(/assets/hero.jpg)' }}>
        <DefaultHeroContent />
      </section>
    )
  }

  return (
    <section className="home-banner-section" aria-label="Homepage banners">
      <div className="banner-track">
        {activeBanners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`banner-slide ${idx === current ? 'active' : ''}`}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,${banner.overlay ?? 0.55}), rgba(0,0,0,${(banner.overlay ?? 0.55) * 0.7})), url(${banner.imageURL})` }}
            aria-hidden={idx !== current}
          >
            <div className="banner-content mag-container text-center text-white">
              {banner.badge && <span className="banner-badge">{banner.badge}</span>}
              {banner.heading && (
                <h1 className="banner-heading" dangerouslySetInnerHTML={{ __html: banner.heading }} />
              )}
              {banner.subheading && (
                <p className="banner-subheading">{banner.subheading}</p>
              )}
              <div className="banner-actions">
                {banner.ctaText && banner.ctaLink && (
                  banner.ctaLink.startsWith('http') ? (
                    <a
                      href={banner.ctaLink}
                      className="btn-mag-solid hero-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {banner.ctaText}
                    </a>
                  ) : (
                    <Link to={banner.ctaLink} className="btn-mag-solid hero-btn">
                      {banner.ctaText}
                    </Link>
                  )
                )}
                {banner.cta2Text && banner.cta2Link && (
                  banner.cta2Link.startsWith('http') ? (
                    <a
                      href={banner.cta2Link}
                      className="btn-mag-outline hero-btn outline-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {banner.cta2Text}
                    </a>
                  ) : (
                    <Link to={banner.cta2Link} className="btn-mag-outline hero-btn outline-white">
                      {banner.cta2Text}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {activeBanners.length > 1 && (
        <>
          <button className="banner-arrow banner-arrow-left" onClick={prev} aria-label="Previous banner">
            &#8592;
          </button>
          <button className="banner-arrow banner-arrow-right" onClick={next} aria-label="Next banner">
            &#8594;
          </button>

          {/* Dots */}
          <div className="banner-dots" role="tablist" aria-label="Banner navigation">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                className={`banner-dot ${idx === current ? 'active' : ''}`}
                onClick={() => goTo(idx)}
                role="tab"
                aria-selected={idx === current}
                aria-label={`Go to banner ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

function DefaultHeroContent() {
  return (
    <div className="banner-content mag-container text-center text-white" data-aos="fade-up" data-aos-duration="1000">
      <h4 className="hero-subtitle">Est. 2024</h4>
      <h1 className="hero-title">Timeless Taste, <br />Uncompromised Health</h1>
      <p className="hero-desc">Discover heritage recipes handcrafted in pure Desi Ghee. No shortcuts. No maida.</p>
      <div className="hero-actions">
        <Link to="/shop" className="btn-mag-solid hero-btn">Khaana Order Karein</Link>
        <Link to="/sessions" className="btn-mag-outline hero-btn outline-white">Yoga Class Join Karein</Link>
      </div>
    </div>
  )
}

export default HomeBanner
