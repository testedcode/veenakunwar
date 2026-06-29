import { useState, useEffect } from 'react'
import { useCollection } from '../hooks/useFirebase'
import { useCart } from '../contexts/CartContext'
import Loader from '../components/Loader'
import './Shop.css'

function ImageCarousel({ images, productName }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return <img src="/thekuwa.jpg" alt={productName} />
  }

  const nextImg = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImg = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="carousel-container">
      <img src={images[currentIndex]} alt={`${productName} - view ${currentIndex + 1}`} />
      
      {images.length > 1 && (
        <>
          <button className="carousel-btn left" onClick={prevImg}>‹</button>
          <button className="carousel-btn right" onClick={nextImg}>›</button>
          
          <div className="carousel-dots">
            {images.map((_, i) => (
              <span key={i} className={`dot ${i === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(i)}></span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function Shop() {
  const { data: products, loading } = useCollection('products')
  const { addToCart } = useCart()
  const [selectedVariants, setSelectedVariants] = useState({})

  useEffect(() => {
    if (products?.length > 0) {
      const defaults = {}
      products.forEach(p => {
        if (p.variants && p.variants.length > 0) defaults[p.id] = p.variants[0]
      })
      setSelectedVariants(defaults)
    }
  }, [products])

  const handleVariantChange = (productId, variant) => {
    setSelectedVariants(prev => ({ ...prev, [productId]: variant }))
  }

  const handleAddToCart = (product) => {
    const variant = selectedVariants[product.id]
    if (variant) {
      addToCart(product, variant, 1)
    } else {
      alert("Please select a size variant first.")
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
          ) : (
            <div className="products-showcase">
              {products?.map((product, index) => {
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

                      <div className="discount-callout">
                        <p>🔥 <strong>Bulk Offer:</strong> Buy 1KG for 5% OFF, Buy 2KG for 10% OFF at checkout!</p>
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
