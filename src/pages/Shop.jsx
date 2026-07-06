import { useState, useEffect, useRef, useMemo } from 'react'
import { useCollection } from '../hooks/useFirebase'
import { useCart } from '../contexts/CartContext'
import { normalizeProduct } from '../utils/products'
import Loader from '../components/Loader'
import './Shop.css'

function ImageCarousel({ images, productName }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timerRef = useRef(null)

  const validImages = (images || []).filter(Boolean)

  const goTo = (idx) => {
    if (isAnimating || idx === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(idx)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-advance every 3.5 seconds
  useEffect(() => {
    if (validImages.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % validImages.length)
    }, 3500)
    return () => clearInterval(timerRef.current)
  }, [validImages.length])

  const pause = () => clearInterval(timerRef.current)
  const resume = () => {
    if (validImages.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % validImages.length)
    }, 3500)
  }

  if (validImages.length === 0) {
    return (
      <div className="carousel-container">
        <img src="/thekuwa.jpg" alt={productName} className="carousel-main-img" />
      </div>
    )
  }

  return (
    <div className="carousel-container" onMouseEnter={pause} onMouseLeave={resume}>
      {/* Main image */}
      <div className="carousel-main">
        {validImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${productName} – view ${i + 1}`}
            className={`carousel-main-img ${i === currentIndex ? 'active' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}

        {validImages.length > 1 && (
          <>
            <button
              className="carousel-btn left"
              onClick={() => goTo((currentIndex - 1 + validImages.length) % validImages.length)}
              aria-label="Previous image"
            >&#8249;</button>
            <button
              className="carousel-btn right"
              onClick={() => goTo((currentIndex + 1) % validImages.length)}
              aria-label="Next image"
            >&#8250;</button>

            {/* Counter badge */}
            <div className="carousel-counter">{currentIndex + 1} / {validImages.length}</div>
          </>
        )}
      </div>

      {/* Thumbnails strip */}
      {validImages.length > 1 && (
        <div className="carousel-thumbs">
          {validImages.map((src, i) => (
            <button
              key={i}
              className={`carousel-thumb ${i === currentIndex ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={src} alt={`${productName} thumbnail ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Shop() {
  const { data: products, loading, error } = useCollection('products')
  const { addToCart } = useCart()
  const [selectedVariants, setSelectedVariants] = useState({})

  const normalizedProducts = useMemo(
    () => (products || []).map(normalizeProduct),
    [products]
  )

  useEffect(() => {
    if (normalizedProducts.length > 0) {
      const defaults = {}
      normalizedProducts.forEach((product) => {
        if (product.variants.length > 0) {
          defaults[product.id] = product.variants[0]
        }
      })
      setSelectedVariants(defaults)
    }
  }, [normalizedProducts])

  const handleVariantChange = (productId, variant) => {
    setSelectedVariants(prev => ({ ...prev, [productId]: variant }))
  }

  const handleAddToCart = (product) => {
    const variant = selectedVariants[product.id]
    if (variant) {
      addToCart(product, variant, 1)
    } else {
      alert('Please select a size variant first.')
    }
  }

  return (
    <div className="shop-animated">
      <section className="shop-hero" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/assets/food1.jpg)' }}>
        <div className="mag-container text-center text-white" data-aos="fade-up">
          <h4 style={{color: '#fff'}}>The Heritage Pantry</h4>
          <h1>Pure Ingredients, <br/> Timeless Taste</h1>
          <p>Handmade in pure Desi Ghee. No Maida. No Preservatives.</p>
        </div>
      </section>

      <section className="shop-products-section">
        <div className="mag-container">
          {loading ? (
            <div className="text-center py-5"><Loader /></div>
          ) : error ? (
            <div className="shop-status-message shop-status-error">
              <h3>Shop is temporarily unavailable</h3>
              <p>{error}</p>
              <p className="shop-status-hint">Backend: Firebase Firestore (not Supabase). After Firestore is created, add products at <strong>/admin</strong>.</p>
            </div>
          ) : normalizedProducts.length === 0 ? (
            <div className="shop-status-message">
              <h3>No products listed yet</h3>
              <p>Sign in at <strong>/admin</strong>, open the Products tab, and add items with at least one size/price variant.</p>
            </div>
          ) : (
            <div className="products-showcase">
              {normalizedProducts.map((product, index) => {
                const currentVariant = selectedVariants[product.id]
                const isReversed = index % 2 !== 0

                return (
                  <div key={product.id} className={`product-row ${isReversed ? 'reversed' : ''}`} data-aos="fade-up">
                    <div className="product-image-col">
                      <div className="shop-img-wrapper">
                        {/* New Multi-Image Support */}
                        <ImageCarousel images={product.imageURLs || [product.imageURL]} productName={product.name} />
                      </div>
                    </div>
                    
                    <div className="product-details-col">
                      {product.badges && product.badges.length > 0 && (
                        <div className="health-badges">
                          {product.badges.map((b, i) => (
                            <span key={i} className="health-badge">✓ {b}</span>
                          ))}
                        </div>
                      )}
                      
                      <h2 className="product-title">{product.name}</h2>
                      <p className="product-desc">{product.description}</p>
                      
                      <div className="variant-selector">
                        <h4>Select Size:</h4>
                        <div className="variant-options">
                          {product.variants?.map(v => (
                            <button
                              key={v.id}
                              className={`variant-btn ${currentVariant?.id === v.id ? 'active' : ''}`}
                              onClick={() => handleVariantChange(product.id, v)}
                            >
                              {v.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="discount-banner">
                        <span>✦ Complimentary Shipping on Orders Over ₹1500</span>
                      </div>

                      <div className="price-and-action">
                        <div className="price-display">
                          {currentVariant ? (
                            <h3>₹{currentVariant.price}</h3>
                          ) : (
                            <h3>Select size</h3>
                          )}
                        </div>
                        <button 
                          className="btn-mag-solid add-to-cart-btn"
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.isAvailable}
                        >
                          {product.isAvailable ? 'Add to Pantry' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Shop
