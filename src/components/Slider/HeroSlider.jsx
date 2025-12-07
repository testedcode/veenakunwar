import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { useCollection } from '../../hooks/useFirebase'
import { sliderData, defaultBanner } from './sliderData'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './HeroSlider.css'

function HeroSlider() {
  const { data: firebaseBanners, loading } = useCollection('banners')
  const [banners, setBanners] = useState(sliderData)

  useEffect(() => {
    // Use Firebase banners if available, otherwise use local data
    if (firebaseBanners && firebaseBanners.length > 0) {
      const formattedBanners = firebaseBanners.map(banner => ({
        id: banner.id,
        image: banner.imageUrl || banner.image || defaultBanner.image,
        title: banner.title || defaultBanner.title,
        subtitle: banner.subtitle || banner.description || defaultBanner.subtitle,
        buttonText: banner.buttonText || banner.ctaText || defaultBanner.buttonText,
        buttonLink: banner.actionUrl || banner.buttonLink || banner.link || defaultBanner.buttonLink
      }))
      setBanners(formattedBanners)
    } else if (!loading) {
      // Use local data if Firebase has no banners
      setBanners(sliderData)
    }
  }, [firebaseBanners, loading])

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="hero-swiper"
      >
        {banners.map((slide) => (
          <SwiperSlide key={slide.id || slide.image}>
            <div 
              className="slide-content"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="slide-overlay">
                <div className="container">
                  <div className="slide-text">
                    <h1 className="slide-title">{slide.title}</h1>
                    <p className="slide-subtitle">{slide.subtitle}</p>
                    <Link to={slide.buttonLink} className="slide-button">
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HeroSlider

