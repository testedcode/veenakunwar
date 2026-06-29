import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import './CartDrawer.css'

function CartDrawer() {
  const { 
    cart, isCartOpen, toggleCart, cartSubtotal, cartTotal, 
    discountAmount, applyCoupon, removeCoupon, discountCode,
    updateQuantity, removeFromCart, clearCart
  } = useCart()

  const [couponInput, setCouponInput] = useState('')
  const [checkoutStep, setCheckoutStep] = useState('cart') // 'cart', 'payment', 'receipt'
  
  // Dummy UPI Details (Admin can change these in code or DB later)
  const upiId = "7318047971@paytm"
  const payeeName = "Veena Kunwar"
  
  const handleApplyCoupon = () => {
    // Basic mock coupon logic. In real app, check against Firebase Coupons collection.
    if (couponInput.toUpperCase() === 'FESTIVE10') {
      applyCoupon('FESTIVE10', 10)
    } else {
      alert("Invalid or expired coupon code.")
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) return
    setCheckoutStep('payment')
  }

  const handlePaymentDone = () => {
    setCheckoutStep('receipt')
  }

  const getOrderSummaryText = () => {
    let text = `*New Order - Veena Kunwar Heritage Snacks*\n\n`
    cart.forEach(item => {
      text += `- ${item.productName} (${item.variantName}) x${item.quantity} : ₹${item.price * item.quantity}\n`
    })
    text += `\n*Subtotal:* ₹${cartSubtotal}`
    if (discountAmount > 0) text += `\n*Discount (${discountCode}):* -₹${discountAmount}`
    text += `\n*Total Paid:* ₹${cartTotal}\n\n`
    text += `Payment has been completed via UPI. Please confirm my order.`
    return encodeURIComponent(text)
  }

  const generateUPIUrl = () => {
    // Standard UPI intent URI
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${cartTotal}&cu=INR`
  }

  if (!isCartOpen) return null

  return (
    <>
      <div className="cart-overlay" onClick={toggleCart}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        
        <div className="cart-header">
          <h2>{checkoutStep === 'cart' ? 'Your Pantry' : checkoutStep === 'payment' ? 'Complete Payment' : 'Receipt'}</h2>
          <button className="close-btn" onClick={toggleCart}>×</button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your pantry is empty.</p>
              <button className="btn-mag-outline" onClick={toggleCart}>Continue Shopping</button>
            </div>
          ) : (
            <>
              {checkoutStep === 'cart' && (
                <div className="cart-items-step">
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={`${item.productId}-${item.variantId}`} className="cart-item">
                        <img src={item.imageURL || '/thekuwa.jpg'} alt={item.productName} />
                        <div className="cart-item-details">
                          <h4>{item.productName}</h4>
                          <p className="variant-name">{item.variantName}</p>
                          <div className="quantity-controls">
                            <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}>+</button>
                          </div>
                        </div>
                        <div className="cart-item-price">
                          <p>₹{item.price * item.quantity}</p>
                          <button className="remove-item" onClick={() => removeFromCart(item.productId, item.variantId)}>Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="coupon-section">
                    {discountCode ? (
                      <div className="active-coupon">
                        <p>Coupon <strong>{discountCode}</strong> applied!</p>
                        <button onClick={removeCoupon}>Remove</button>
                      </div>
                    ) : (
                      <div className="apply-coupon-box">
                        <input 
                          type="text" 
                          placeholder="Enter Coupon Code" 
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                        />
                        <button onClick={handleApplyCoupon}>Apply</button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {checkoutStep === 'payment' && (
                <div className="payment-step">
                  <p className="payment-instructions">Advance payment is required to confirm your order of handmade heritage snacks.</p>
                  
                  <div className="qr-container">
                    {/* Placeholder for actual generated QR. In real app use a library like qrcode.react */}
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generateUPIUrl())}`} alt="UPI QR Code" className="payment-qr" />
                    <p className="upi-id">UPI ID: {upiId}</p>
                  </div>

                  <div className="upi-apps">
                    <a href={generateUPIUrl()} className="upi-btn gpay">Pay with GPay / UPI App</a>
                  </div>

                  <button className="btn-mag-solid full-width confirm-paid-btn" onClick={handlePaymentDone}>
                    I Have Paid ₹{cartTotal}
                  </button>
                  <button className="btn-mag-outline full-width mt-2" onClick={() => setCheckoutStep('cart')}>
                    Back to Cart
                  </button>
                </div>
              )}

              {checkoutStep === 'receipt' && (
                <div className="receipt-step">
                  <div className="success-icon">✓</div>
                  <h3>Thank you for your order!</h3>
                  <p>Please send this generated receipt to our WhatsApp to finalize your delivery details.</p>
                  
                  <div className="receipt-actions">
                    <a 
                      href={`https://wa.me/917318047971?text=${getOrderSummaryText()}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-mag-solid full-width whatsapp-btn"
                      onClick={() => { clearCart(); toggleCart(); }}
                    >
                      Send Receipt via WhatsApp
                    </a>
                    
                    <a 
                      href={`mailto:veenakunwar@gmail.com?subject=New Order Completed&body=${getOrderSummaryText()}`}
                      className="btn-mag-outline full-width mt-2"
                      onClick={() => { clearCart(); toggleCart(); }}
                    >
                      Email Receipt
                    </a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {cart.length > 0 && checkoutStep === 'cart' && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
            <button className="btn-mag-solid checkout-btn" onClick={handleCheckout}>
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer
