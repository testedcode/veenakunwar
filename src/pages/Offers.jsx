import { useState } from 'react'
import './Offers.css'

function Offers() {
  const [revealed, setRevealed] = useState([false, false])

  const handleReveal = (index) => {
    const newRevealed = [...revealed]
    newRevealed[index] = true
    setRevealed(newRevealed)
  }

  const coupons = [
    { 
      code: 'VKHERITAGE10', 
      desc: 'Unlock 10% off the entire Heritage Pantry.', 
      minOrder: '₹1000' 
    },
    { 
      code: 'WELLNESSFIRST', 
      desc: 'Complimentary shipping on your first wellness order.', 
      minOrder: 'None' 
    }
  ]

  return (
    <div className="offers-page-vk">
      <section className="offers-hero-vk text-center">
        <div className="mag-container">
          <h4 className="vk-accent-text">The Inner Circle</h4>
          <h1>Exclusive Privileges</h1>
          <p>Tap to reveal your seasonal privileges.</p>
        </div>
      </section>

      <section className="offers-cards-section">
        <div className="mag-container">
          <div className="interactive-offers-grid">
            {coupons.map((c, i) => (
              <div 
                key={i} 
                className={`offer-mystery-card ${revealed[i] ? 'is-revealed' : ''}`}
                onClick={() => handleReveal(i)}
              >
                {!revealed[i] ? (
                  <div className="mystery-front">
                    <div className="mystery-icon">✦</div>
                    <h3>Reveal Offer</h3>
                    <p>Tap to unlock your privilege</p>
                  </div>
                ) : (
                  <div className="mystery-back">
                    <div className="mystery-icon">✓</div>
                    <h3>{c.code}</h3>
                    <p>{c.desc}</p>
                    <p className="min-order">Min Order: {c.minOrder}</p>
                    <button 
                      className="btn-mag-outline copy-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(c.code)
                        alert(`Copied ${c.code} to clipboard!`)
                      }}
                    >
                      Copy Code
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Offers
