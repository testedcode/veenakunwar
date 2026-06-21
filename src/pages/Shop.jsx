import { useState, useMemo } from 'react'
import { useCollection } from '../hooks/useFirebase'
import { localImages } from '../utils/images'
import ProductDetailsModal from '../components/Shop/ProductDetailsModal'
import Loader from '../components/Loader'
import './Shop.css'

function Shop() {
  const { data: firebaseProducts, loading } = useCollection('products')
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  // Combine Firebase products with local products
  const products = useMemo(() => {
    return [...localImages.products, ...(firebaseProducts || [])]
  }, [firebaseProducts])

  return (
    <div className="shop-magazine">
      
      <section className="mag-section shop-hero">
        <div className="mag-container text-center">
          <h4>The Heritage Pantry</h4>
          <h1>Home Made <br/> With Love</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>Explore our heritage snacks, crafted meticulously using purely authentic ingredients like Sudh Desi Ghee.</p>
        </div>
      </section>

      <section className="mag-section">
        <div className="mag-container">
          {loading && products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <Loader />
              <p>Preparing the kitchen...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="lookbook-grid">
              {products.map((product, idx) => {
                // Every 3rd item is a large hero lookbook item
                const isHero = idx % 3 === 0;
                
                if (isHero) {
                  return (
                    <div key={product.id || idx} className="lookbook-hero-item">
                      <div className="grid-2-col">
                        <div className="mag-image-frame">
                          <img src={product.imageURL || '/thekuwa.jpg'} alt={product.name} />
                        </div>
                        <div className="lookbook-hero-info">
                          <h4>Featured</h4>
                          <h2>{product.name}</h2>
                          <p>{product.description}</p>
                          <div className="lookbook-ingredients">
                            {product.ingredients?.map((ing, i) => (
                              <span key={i} className="ing-label">{ing}</span>
                            ))}
                          </div>
                          <p className="price">₹{product.price}</p>
                          <button className="btn-mag-solid" onClick={() => setSelectedProduct(product)}>
                            Order Now
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div key={product.id || idx} className="lookbook-standard-item">
                      <div className="mag-image-frame" style={{ aspectRatio: '1/1' }}>
                        <img src={product.imageURL || '/thekuwa.jpg'} alt={product.name} />
                      </div>
                      <div className="lookbook-standard-info">
                        <h3>{product.name}</h3>
                        <p className="price">₹{product.price}</p>
                        <button className="btn-mag-outline" onClick={() => setSelectedProduct(product)}>
                          View Details
                        </button>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          ) : (
            <div className="text-center" style={{ padding: '4rem 0' }}>
              <p>The kitchen is currently resting. Please check back soon!</p>
            </div>
          )}
        </div>
      </section>

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
