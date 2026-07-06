import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'
import { useCollection } from '../hooks/useFirebase'
import HomeBanner from '../components/HomeBanner'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import './Home.css'

function Home() {
  const { data: testimonials } = useCollection('testimonials')

  const staticTestimonials = [
    {
      id: 'st1',
      text: '"The Thekuwa tastes exactly like my grandmother used to make. Pure ghee, no artificial sweetness. A true masterpiece."',
      author: 'Anjali M.'
    },
    {
      id: 'st2',
      text: '"Veena\'s morning Hasya Yoga sessions completely transformed my mornings. Combined with the dry fruit ladoos, my daily routine has never been better."',
      author: 'Rajesh S.'
    },
    {
      id: 'st3',
      text: '"Finally a brand that actually uses real ingredients. The spiced nimki is so crisp and fresh. Highly recommended!"',
      author: 'Priya K.'
    },
    {
      id: 'st4',
      text: '"The best quality snacks I\'ve had in years. The packaging is premium and the taste is nostalgic. Worth every penny."',
      author: 'Suman T.'
    },
  ]

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : staticTestimonials

  return (
    <div className="home-animated">

      {/* Dynamic Hero Banners — managed from Admin */}
      <HomeBanner />

      {/* Value Propositions */}
      <section className="values-section" aria-labelledby="values-heading">
        <div className="mag-container">
          <h2 id="values-heading" className="section-eyebrow text-center">Why Choose Us</h2>
          <div className="values-grid">
            <div className="value-card" data-aos="fade-up" data-aos-delay="100">
              <div className="value-icon" aria-hidden="true">🌾</div>
              <h3>100% Whole Wheat</h3>
              <p>We absolutely refuse to use Maida. Every bite is rich in fiber and wholesome nutrition.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="200">
              <div className="value-icon" aria-hidden="true">🍯</div>
              <h3>Pure Desi Ghee</h3>
              <p>No Palm Oil. We fry and bake exclusively in traditional Desi Ghee for authentic taste and health.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="300">
              <div className="value-icon" aria-hidden="true">🌿</div>
              <h3>No Refined Sugar</h3>
              <p>Choose our premium Jaggery (Gud) variants for a completely refined-sugar-free delight.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="400">
              <div className="value-icon" aria-hidden="true">❤️</div>
              <h3>Handmade with Love</h3>
              <p>Every single piece is shaped by hand, preserving the heritage of generations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact Image Break */}
      <section
        className="image-break"
        style={{ backgroundImage: 'url(/assets/food4.jpg)' }}
        data-aos="fade-in"
        aria-label="Brand quote"
      >
        <div className="image-break-overlay">
          <h2>"Food that heals, rather than harms."</h2>
        </div>
      </section>

      {/* Yoga & Wellness CTA */}
      <section className="wellness-section" aria-labelledby="yoga-heading">
        <div className="mag-container">
          <div className="grid-2-col align-center">
            <div className="wellness-content" data-aos="fade-right">
              <span className="section-tag">Holistic Health</span>
              <h2 id="yoga-heading">Hasya Yoga Sessions</h2>
              <p>Physical health is only half the journey. Join our vibrant community every morning to start your day with joy, deep breathing, and laughter.</p>

              <div className="schedule-box" aria-label="Yoga schedule">
                <p><strong>🗓️ Mon – Sat</strong></p>
                <div className="time-tags">
                  <span className="time-tag">5:00 AM – 6:00 AM</span>
                  <span className="time-tag">6:00 AM – 7:00 AM</span>
                </div>
              </div>

              <Link to="/sessions" className="btn-mag-solid mt-4">View Zoom Links</Link>
            </div>
            <div className="wellness-image" data-aos="fade-left">
              <img
                src="/assets/yoga1.jpg"
                alt="Hasya Yoga morning session with Veena Kunwar"
                className="rounded-image shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section-vk" data-aos="fade-up" aria-labelledby="testimonials-heading">
        <div className="mag-container text-center">
          <h4 className="vk-accent-text">Community</h4>
          <h2 id="testimonials-heading">Words from the Heart</h2>
          <div className="testimonials-carousel-wrapper">
            <Swiper
              modules={[Autoplay, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="testimonial-swiper"
            >
              {displayTestimonials.map((t) => (
                <SwiperSlide key={t.id || t.author}>
                  <div className="testimonial-card">
                    <div className="stars" aria-label="5 stars">★★★★★</div>
                    <p>{t.text}</p>
                    <h4>— {t.author}</h4>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
