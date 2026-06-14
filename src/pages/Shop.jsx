import { useState, useMemo, useEffect, useRef } from 'react'
import { useCollection } from '../hooks/useFirebase'
import { localImages } from '../utils/images'
import ProductDetailsModal from '../components/Shop/ProductDetailsModal'
import Loader from '../components/Loader'
import './Shop.css'

function Shop() {
  const { data: firebaseProducts, loading } = useCollection('products')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const trackRef = useRef(null)
  
  // Combine Firebase products with local products
  const products = useMemo(() => {
    return [...localImages.products, ...(firebaseProducts || [])]
  }, [firebaseProducts])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleWheel = (evt) => {
      // Map vertical scrolling to horizontal scrolling for desktop immersive feel
      if (evt.deltaY !== 0) {
        evt.preventDefault()
        track.scrollLeft += evt.deltaY * 2
      }
    }

    track.addEventListener('wheel', handleWheel, { passive: false })
    return () => track.removeEventListener('wheel', handleWheel)
  }, [products])

  return (
    <div className="shop-radical">
      {loading && products.length === 0 ? (
        <div className="shop-loader-wrapper">
          <Loader />
          <p>Preparing the kitchen...</p>
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="shop-hint">
            <span>Scroll Horizontally to Explore</span>
          </div>
          
          <div className="horizontal-track" ref={trackRef}>
            
            <div className="shop-intro-slide">
              <h1>Home Made <br/> With Love</h1>
              <p>Explore our heritage snacks, crafted meticulously using purely authentic ingredients.</p>
              <div className="swipe-arrow">→</div>
            </div>

            {products.map((product, idx) => (
              <div key={product.id || idx} className="product-fullscreen-slide">
                <div className="product-split">
                  <div className="product-image-side">
                    <img src={product.imageURL || '/thekuwa.jpg'} alt={product.name} />
                  </div>
                  <div className="product-info-side">
                    <h2 className="product-title">{product.name}</h2>
                    <p className="product-desc">{product.description}</p>
                    <div className="product-ingredients-minimal">
                      {product.ingredients?.map((ing, i) => (
                        <span key={i} className="ing-tag">{ing}</span>
                      ))}
                    </div>
                    <div className="product-action-row">
                      <span className="price">₹{product.price}</span>
                      <button className="btn-organic" onClick={() => setSelectedProduct(product)}>
                        View Details & Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="shop-outro-slide">
              <h2>More Delicacies <br/> Coming Soon</h2>
            </div>
            
          </div>
        </>
      ) : (
        <div className="no-products text-center">
          <p>The kitchen is currently resting. Please check back soon!</p>
        </div>
      )}

      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  )
}

export default Shop
