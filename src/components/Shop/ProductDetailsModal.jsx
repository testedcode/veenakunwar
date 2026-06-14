import { useState } from 'react'
import Button from '../Button'
import OrderCheckoutModal from './OrderCheckoutModal'
import './ProductDetailsModal.css'

function ProductDetailsModal({ product, onClose }) {
  const [showCheckout, setShowCheckout] = useState(false)

  if (!product) return null

  // Ensure arrays exist to map over
  const ingredients = product.ingredients || []
  
  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        
        <div className="product-modal-grid">
          <div className="product-modal-image-col">
            <img src={product.imageURL || '/thekuwa.jpg'} alt={product.name} className="product-hero-image" />
            <div className="ingredients-card glossy-card">
              <h3>Pure Ingredients</h3>
              <ul className="ingredients-list">
                {ingredients.map((ing, i) => (
                  <li key={i}><span className="check-icon">✓</span> {ing}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="product-modal-info-col">
            <h2 className="product-title">{product.name}</h2>
            <div className="product-price-badge">Starting at ₹{product.price}</div>
            
            <div className="product-story-section">
              <h3>Our Heritage Story</h3>
              <p>{product.story || product.description}</p>
            </div>
            
            <div className="product-cta-section">
              <Button variant="primary" onClick={() => setShowCheckout(true)} style={{ width: '100%' }}>
                Order Now via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showCheckout && (
        <OrderCheckoutModal 
          product={product} 
          onClose={() => setShowCheckout(false)} 
        />
      )}
    </div>
  )
}

export default ProductDetailsModal
