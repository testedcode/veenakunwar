import { useState, useEffect } from 'react'
import { useCollection } from '../hooks/useFirebase'
import { useCart } from '../contexts/CartContext'
import Loader from '../components/Loader'
import './Shop.css'

function Shop() {
  const { data: products, loading } = useCollection('products')
  const { addToCart } = useCart()

  // Track selected variants for each product
  const [selectedVariants, setSelectedVariants] = useState({})

  useEffect(() => {
    // Initialize default variants
    if (products?.length > 0) {
      const defaults = {}
      products.forEach(p => {
        if (p.variants && p.variants.length > 0) {
          defaults[p.id] = p.variants[0]
        }
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
      <section className="shop-hero">
        <div className="mag-container text-center" data-aos="fade-up">
          <h4>The Heritage Pantry</h4>
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
                        <img src={product.imageURL || '/thekuwa.jpg'} alt={product.name} />
                      </div>
                    </div>
                    <div className="product-details-col">
                      <h2 className="product-title">{product.name}</h2>
                      <p className="product-desc">{product.description}</p>
                      
                      {product.ingredients && product.ingredients.length > 0 && (
                        <div className="ingredients-pills">
                          {product.ingredients.map((ing, i) => (
                            <span key={i} className="ing-pill">{ing}</span>
                          ))}
                        </div>
                      )}

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

                      <div className="price-and-action">
                        <div className="price-display">
                          {currentVariant ? (
                            <h3>₹{currentVariant.price}</h3>
                          ) : (
                            <h3>Select size for price</h3>
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
