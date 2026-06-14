import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCollection } from '../hooks/useFirebase'
import { localImages } from '../utils/images'
import './Home.css'

function Home() {
  const { data: firebaseProducts } = useCollection('products')
  const featuredProducts = [...localImages.products, ...(firebaseProducts || [])].slice(0, 3)
  const scrollRef = useRef(null)

  useEffect(() => {
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
    <div className="home-radical" ref={scrollRef}>
      
      {/* Immersive Hero */}
      <section className="hero-organic organic-section">
        <div className="hero-bg-blob"></div>
        <div className="fluid-container hero-content" data-speed="0.3">
          <h1 className="hero-title">Breathe.<br/>Laugh.<br/>Nourish.</h1>
          <p className="hero-subtitle">A journey of healing through Hasya Yoga, <br/> and nourishing the soul with Heritage Foods.</p>
          <div className="hero-actions">
            <Link to="/about" className="btn-organic">Discover The Journey</Link>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Seamless Transition to Yoga */}
      <section className="yoga-flow organic-section">
        <div className="fluid-container">
          <div className="split-flow">
            <div className="flow-text" data-speed="0.1">
              <h2>The Healing Power of Laughter</h2>
              <p>
                Laughter Yoga isn't just an exercise; it's a medicine. By combining unconditional laughter with yogic breathing, 
                we oxygenate the body and mind, reducing stress and boosting immunity. It's how Veena conquered asthma and arthritis.
              </p>
              <Link to="/sessions" className="btn-solid">Join a Session</Link>
            </div>
            <div className="flow-image animate-float" data-speed="-0.1">
              <div className="blob-mask mask-1">
                <img src="/profile.jpg" alt="Yoga Session" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seamless Transition to Food */}
      <section className="food-flow organic-section">
        <div className="fluid-container">
          <div className="split-flow reverse">
            <div className="flow-text" data-speed="0.1">
              <h2>Nourishment from the Roots</h2>
              <p>
                True health extends beyond the mat. We rejected processed snacks and returned to our heritage. 
                Our homemade Thekwa and Nimki are crafted with Sudh Desi Ghee and boundless love—just like a mother's prescription for a healthy life.
              </p>
              <Link to="/shop" className="btn-solid">Explore the Pantry</Link>
            </div>
            <div className="flow-image animate-float" data-speed="-0.05" style={{animationDelay: '1s'}}>
              <div className="blob-mask mask-2">
                <img src="/thekuwa.jpg" alt="Heritage Foods" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Products Showcase */}
      <section className="products-flow organic-section">
        <div className="fluid-container">
          <h2 className="flow-title text-center" data-speed="0.2">Handcrafted with Love</h2>
          
          <div className="organic-products-track">
            {featuredProducts.map((product, idx) => (
              <div key={idx} className="organic-product-card" data-speed={idx % 2 === 0 ? "0.05" : "-0.05"}>
                <div className="product-img-wrap">
                  <img src={product.imageURL || '/thekuwa.jpg'} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <Link to="/shop" className="btn-organic">View</Link>
              </div>
            ))}
          </div>
          
        </div>
      </section>

    </div>
  )
}

export default Home
