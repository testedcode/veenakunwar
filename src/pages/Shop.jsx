import { useState, useMemo } from 'react'
import { useCollection } from '../hooks/useFirebase'
import { localImages } from '../utils/images'
import ProductDetailsModal from '../components/Shop/ProductDetailsModal'
import Loader from '../components/Loader'
import Button from '../components/Button'
import './Shop.css'

function Shop() {
  const { data: firebaseProducts, loading } = useCollection('products')
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  // Combine Firebase products with local products
  const products = useMemo(() => {
    return [...localImages.products, ...(firebaseProducts || [])]
  }, [firebaseProducts])

  return (
    <div className="shop-page">
      <section className="shop-hero-blast">
        <div className="container">
          <h1 className="animate-fade-up">Heritage Delicacies</h1>
          <p className="hero-subtitle animate-fade-up" style={{animationDelay: '0.2s'}}>
            Crafted with purity, tradition, and love. Explore our premium selection of authentic sweets and savories.
          </p>
        </div>
      </section>

      <section className="section shop-main-content">
        <div className="container">
          {loading && products.length === 0 ? (
            <Loader />
          ) : products.length > 0 ? (
            <div className="editorial-grid">
              {products.map((product, idx) => (
                <div key={product.id || idx} className={`editorial-card ${idx % 2 === 0 ? 'image-left' : 'image-right'}`}>
                  <div className="editorial-image-wrapper">
                    <img src={product.imageURL || '/thekuwa.jpg'} alt={product.name} />
                  </div>
                  <div className="editorial-info-wrapper">
                    <div className="editorial-content">
                      <h2 className="product-title">{product.name}</h2>
                      <p className="product-desc">{product.description}</p>
                      
                      {product.ingredients && (
                        <div className="ingredient-highlights">
                          {product.ingredients.slice(0, 3).map((ing, i) => (
                            <span key={i} className="ing-chip">{ing}</span>
                          ))}
                          {product.ingredients.length > 3 && <span className="ing-chip">+ more</span>}
                        </div>
                      )}
                      
                      <div className="editorial-actions">
                        <span className="price">From ₹{product.price}</span>
                        <Button variant="primary" onClick={() => setSelectedProduct(product)}>
                          Explore & Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products text-center">
              <p>No products available at the moment. Please check back soon!</p>
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
