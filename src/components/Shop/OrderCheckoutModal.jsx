import { useState } from 'react'
import Button from '../Button'
import { openWhatsApp } from '../../utils/whatsapp'
import './OrderCheckoutModal.css'

function OrderCheckoutModal({ product, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    variant: product.variants?.[0]?.name || 'Standard',
    quantity: 1,
    notes: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleQuantity = (change) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + change)
    }))
  }

  const selectedVariantObj = product.variants?.find(v => v.name === formData.variant)
  const currentPrice = selectedVariantObj ? selectedVariantObj.price : product.price
  const totalAmount = currentPrice * formData.quantity

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // In a full implementation, you would save this to Firebase here
    // await addDoc(collection(db, 'orders'), { ...formData, productId: product.id, totalAmount, timestamp: new Date() })

    // Format WhatsApp Message
    const message = `Hello Veena Kunwar! 
I would like to place an order:
*Product*: ${product.name}
*Variant*: ${formData.variant}
*Quantity*: ${formData.quantity}
*Total Amount*: ₹${totalAmount}

*My Details*:
Name: ${formData.name}
Phone: ${formData.phone}
${formData.notes ? `Notes: ${formData.notes}` : ''}

Please confirm my order.`

    // Simulate short delay for "saving"
    setTimeout(() => {
      setIsSubmitting(false)
      openWhatsApp(message)
      onClose()
    }, 800)
  }

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <h2>Complete Your Order</h2>
        <p className="checkout-subtitle">Fill in details to proceed to WhatsApp</p>
        
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
          </div>
          
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Your Phone Number" />
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="form-group">
              <label>Select Variant</label>
              <div className="variant-options">
                {product.variants.map((v) => (
                  <label key={v.id} className={`variant-card ${formData.variant === v.name ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="variant" 
                      value={v.name} 
                      checked={formData.variant === v.name} 
                      onChange={handleChange} 
                      style={{ display: 'none' }}
                    />
                    <span className="v-name">{v.name}</span>
                    <span className="v-price">₹{v.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="form-group qty-group">
            <label>Quantity</label>
            <div className="qty-controls">
              <button type="button" className="qty-btn" onClick={() => handleQuantity(-1)}>-</button>
              <span className="qty-display">{formData.quantity}</span>
              <button type="button" className="qty-btn" onClick={() => handleQuantity(1)}>+</button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Additional Notes (Optional)</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} rows="2" placeholder="Any special instructions?"></textarea>
          </div>

          <div className="checkout-summary">
            <span>Total Amount:</span>
            <span className="total-price">₹{totalAmount}</span>
          </div>

          <Button type="submit" variant="success" disabled={isSubmitting} style={{ width: '100%', fontSize: '1.1rem' }}>
            {isSubmitting ? 'Processing...' : 'Confirm & Open WhatsApp'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default OrderCheckoutModal
