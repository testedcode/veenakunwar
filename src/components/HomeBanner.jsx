import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCollection } from '../hooks/useFirebase'
import './HomeBanner.css'

// 10 default banners using locally available images
// These show when Admin hasn't added any banners yet
const DEFAULT_BANNERS = [
  {
    id: 'd1',
    imageURL: '/assets/hero.jpg',
    badge: 'Est. 2024',
    heading: 'Timeless Taste,<br/>Uncompromised Health',
    subheading: 'Discover heritage recipes handcrafted in pure Desi Ghee. No shortcuts. No Maida.',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
    cta2Text: 'Join Yoga',
    cta2Link: '/sessions',
    overlay: 0.55,
  },
  {
    id: 'd2',
    imageURL: '/assets/vk_thekuwa.png',
    badge: '🍪 Bestseller',
    heading: 'Authentic Thekuwa',
    subheading: 'Crispy, wholesome, made in pure Desi Ghee — just like your grandmother\'s recipe.',
    ctaText: 'Order Thekuwa',
    ctaLink: '/shop',
    overlay: 0.45,
  },
  {
    id: 'd3',
    imageURL: '/assets/vk_nimki.png',
    badge: '🌿 100% Whole Wheat',
    heading: 'Crispy Nimki,<br/>Zero Maida',
    subheading: 'Traditional spiced crackers fried in Desi Ghee. A snack you can feel good about.',
    ctaText: 'Try Nimki',
    ctaLink: '/shop',
    overlay: 0.45,
  },
  {
    id: 'd4',
    imageURL: '/assets/vk_ladoo.png',
    badge: '🍬 Pure Jaggery',
    heading: 'Dry Fruit Ladoos',
    subheading: 'No refined sugar. Sweetened naturally with Gud (Jaggery). Healthy never tasted so good.',
    ctaText: 'Order Ladoos',
    ctaLink: '/shop',
    overlay: 0.45,
  },
  {
    id: 'd5',
    imageURL: '/assets/yoga1.jpg',
    badge: '🧘 Free to Join',
    heading: 'Morning Hasya Yoga<br/>Sessions',
    subheading: 'Start your day with laughter, deep breathing & joy. Mon–Sat, 5 AM & 6 AM online.',
    ctaText: 'Get Zoom Link',
    ctaLink: '/sessions',
    cta2Text: 'Learn More',
    cta2Link: '/about',
    overlay: 0.6,
  },
  {
    id: 'd6',
    imageURL: '/assets/food4.jpg',
    badge: '❤️ Made with Love',
    heading: '"Food that heals,<br/>rather than harms."',
    subheading: 'Every bite from our kitchen is crafted by hand with pure ingredients and generations of tradition.',
    ctaText: 'Explore Our Story',
    ctaLink: '/about',
    overlay: 0.6,
  },
  {
    id: 'd7',
    imageURL: '/assets/vk_thekuwa_2.png',
    badge: '🎁 Gift Hampers',
    heading: 'Gift Pure Goodness',
    subheading: 'Send a hamper of traditional homemade snacks — the perfect gift for family and festivals.',
    ctaText: 'Order a Gift Box',
    ctaLink: '/shop',
    overlay: 0.45,
  },
  {
    id: 'd8',
    imageURL: '/assets/yoga2.jpg',
    badge: '🌅 Every Morning',
    heading: 'Transform Your<br/>Morning Routine',
    subheading: 'Join hundreds of people who start their day energized with Hasya Yoga by Veena Kunwar.',
    ctaText: 'Join the Community',
    ctaLink: '/sessions',
    overlay: 0.6,
  },
  {
    id: 'd9',
    imageURL: '/assets/vk_ladoo_2.png',
    badge: '🌾 No Maida. Ever.',
    heading: 'Eat Clean,<br/>Stay Healthy',
    subheading: 'All our products are made with 100% whole wheat and pure Desi Ghee. No compromise.',
    ctaText: 'See All Products',
    ctaLink: '/shop',
    overlay: 0.45,
  },
  {
    id: 'd10',
    imageURL: '/assets/food1.jpg',
    badge: '⭐ Special Offer',
    heading: 'Exclusive Deals<br/>This Season',
    subheading: 'Check out our latest offers on premium homemade snacks. Limited stock, pure quality.',
    ctaText: 'View Offers',
    ctaLink: '/offers',
    cta2Text: 'Shop All',
    cta2Link: '/shop',
    overlay: 0.55,
  },
]

function HomeBanner() {
  const { data: firestoreBanners, loading } = useCollection('banners')
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  // Use Firestore banners if available, else fall back to 10 defaults
  const activeBanners = !loading && firestoreBanners && firestoreBanners.filter(b => b.active !== false).length > 0
    ? firestoreBanners.filter(b => b.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0))
    : DEFAULT_BANNERS

  const startTimer = (banners) => {
    clearInterval(timerRef.current)
    if (banners.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length)
    }, 5000)
  }

  useEffect(() => {
    startTimer(activeBanners)
    return () => clearInterval(timerRef.current)
  }, [activeBanners.length])

  const goTo = (idx) => {
    setCurrent(idx)
    startTimer(activeBanners)
  }

  const prev = () => goTo((current - 1 + activeBanners.length) % activeBanners.length)
  const next = () => goTo((current + 1) % activeBanners.length)

  return (
    <section className="home-banner-section" aria-label="Homepage banners">
      <div className="banner-track">
        {activeBanners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`banner-slide ${idx === current ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,${banner.overlay ?? 0.55}), rgba(0,0,0,${(banner.overlay ?? 0.55) * 0.7})), url(${banner.imageURL})`,
            }}
            aria-hidden={idx !== current}
          >
            <div className="banner-content mag-container">
              {banner.badge && (
                <span className="banner-badge">{banner.badge}</span>
              )}
              {banner.heading && (
                <h1
                  className="banner-heading"
                  dangerouslySetInnerHTML={{ __html: banner.heading }}
                />
              )}
              {banner.subheading && (
                <p className="banner-subheading">{banner.subheading}</p>
              )}
              <div className="banner-actions">
                {banner.ctaText && banner.ctaLink && (
                  banner.ctaLink.startsWith('http') ? (
                    <a href={banner.ctaLink} className="btn-mag-solid hero-btn" target="_blank" rel="noopener noreferrer">
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
                    <a href={banner.cta2Link} className="btn-mag-outline hero-btn outline-white" target="_blank" rel="noopener noreferrer">
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

      {/* Prev / Next arrows */}
      {activeBanners.length > 1 && (
        <>
          <button className="banner-arrow banner-arrow-left" onClick={prev} aria-label="Previous banner">&#8592;</button>
          <button className="banner-arrow banner-arrow-right" onClick={next} aria-label="Next banner">&#8594;</button>

          {/* Dot indicators */}
          <div className="banner-dots" role="tablist">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                className={`banner-dot ${idx === current ? 'active' : ''}`}
                onClick={() => goTo(idx)}
                role="tab"
                aria-selected={idx === current}
                aria-label={`Banner ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default HomeBanner
