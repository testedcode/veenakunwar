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

  // Merge Firebase testimonials with fallback static ones
  const staticTestimonials = [
    {
      id: 'st1',
      text: 'Thekuwa bilkul waise hi bana hai jaise nani ke haath ka hota tha. Shuddh ghee, koi mitti-namak nahi. Ek dum asli swad!',
      author: 'Anjali M.'
    },
    {
      id: 'st2',
      text: 'Veena ji ki Hasya Yoga ne meri subah badal di. Dry fruit ladoos ke saath daily routine ab bahut better hai!',
      author: 'Rajesh S.'
    },
    {
      id: 'st3',
      text: 'Ek asli brand jisme sach mein asli cheezein milti hain. Nimki itni crispy aur fresh thi – zaroor le ke dekhein!',
      author: 'Priya K.'
    },
    {
      id: 'st4',
      text: 'Saalon baad itne achhe quality ke snacks khaye. Packing bhi premium thi aur swad yaadein taza kar gaya. Paisa vasool!',
      author: 'Suman T.'
    },
  ]

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : staticTestimonials

  return (
    <div className="home-animated">
      {/* Dynamic Hero Banners from Admin */}
      <HomeBanner />

      {/* Value Propositions */}
      <section className="values-section" aria-labelledby="values-heading">
        <div className="mag-container">
          <h2 id="values-heading" className="sr-only">Our Values</h2>
          <div className="values-grid">
            <div className="value-card" data-aos="fade-up" data-aos-delay="100">
              <div className="value-icon" aria-hidden="true">🌾</div>
              <h3>100% Gehun ka Atta</h3>
              <p>Maida bilkul nahi. Har ek cheez mein fiber aur poshan bhari gehun ki atta hi hoti hai.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="200">
              <div className="value-icon" aria-hidden="true">🍯</div>
              <h3>Shuddh Desi Ghee</h3>
              <p>Palm oil nahi. Sirf asli Desi Ghee mein bana khaana – swad aur sehat dono ke liye.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="300">
              <div className="value-icon" aria-hidden="true">🌿</div>
              <h3>Koi Refined Sugar Nahi</h3>
              <p>Gud (Jaggery) wale options choose karein – poora refined sugar free mitha khaana.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="400">
              <div className="value-icon" aria-hidden="true">❤️</div>
              <h3>Haath se Banaya, Pyaar se</h3>
              <p>Har ek cheez haath se bani hai – peedhiyon ki paraampara aur mamta ke saath.</p>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact Image Break */}
      <section className="image-break" style={{ backgroundImage: 'url(/assets/food4.jpg)' }} data-aos="fade-in" aria-label="Quote banner">
        <div className="image-break-overlay">
          <h2>"Woh khaana jo sehat deta hai, bimaar nahi karta."</h2>
        </div>
      </section>

      {/* Yoga & Wellness CTA */}
      <section className="wellness-section" aria-labelledby="yoga-heading">
        <div className="mag-container">
          <div className="grid-2-col align-center">
            <div className="wellness-content" data-aos="fade-right">
              <span className="section-tag">Holistic Health</span>
              <h2 id="yoga-heading">Hasya Yoga Sessions</h2>
              <p>Sirf khaana hi nahi – mann ka sukoon bhi zaroori hai. Roz subah hamare energetic community ke saath join karein. Hasi, gehri saans aur yoga ke saath din ki shuruaat karein.</p>

              <div className="schedule-box" aria-label="Yoga schedule">
                <p><strong>🗓️ Somwar – Shanivaar</strong></p>
                <div className="time-tags">
                  <span className="time-tag">5:00 AM – 6:00 AM</span>
                  <span className="time-tag">6:00 AM – 7:00 AM</span>
                </div>
              </div>

              <Link to="/sessions" className="btn-mag-solid mt-4">Zoom Link Dekhein</Link>
            </div>
            <div className="wellness-image" data-aos="fade-left">
              <img src="/assets/yoga1.jpg" alt="Hasya Yoga morning session with Veena Kunwar" className="rounded-image shadow-lg" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Testimonials */}
      <section className="testimonials-section-vk" data-aos="fade-up" aria-labelledby="testimonials-heading">
        <div className="mag-container text-center">
          <h4 className="vk-accent-text">Hamare Grahak</h4>
          <h2 id="testimonials-heading">Dil ki Baatein</h2>
          <div className="testimonials-carousel-wrapper">
            <Swiper
              modules={[Autoplay, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="testimonial-swiper"
              a11y={{ prevSlideMessage: 'Previous testimonial', nextSlideMessage: 'Next testimonial' }}
            >
              {displayTestimonials.map((t) => (
                <SwiperSlide key={t.id || t.author}>
                  <div className="testimonial-card">
                    <div className="stars" aria-label="5 stars">★★★★★</div>
                    <p>"{t.text}"</p>
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
