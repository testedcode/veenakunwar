import './Offers.css'

function Offers() {
  const coupons = [
    { code: 'FESTIVE10', desc: 'Get 10% off on all Heritage Snacks for the festival season!', minOrder: '₹500' },
    { code: 'WELCOME5', desc: 'New to our pantry? Take 5% off your first order.', minOrder: 'None' }
  ]

  return (
    <div className="offers-page">
      <section className="mag-section hero-mag-section text-center">
        <div className="mag-container">
          <h4>Exclusive</h4>
          <h1>Offers & Discounts</h1>
          <p>Treat yourself to health and heritage with these seasonal offers.</p>
        </div>
      </section>

      <section className="mag-section">
        <div className="mag-container">
          <div className="grid-2-col">
            {coupons.map((c, i) => (
              <div key={i} className="coupon-card">
                <div className="coupon-header">
                  <h3>{c.code}</h3>
                </div>
                <div className="coupon-body">
                  <p>{c.desc}</p>
                  <p className="min-order">Min. Order: {c.minOrder}</p>
                  <button 
                    className="btn-mag-outline" 
                    onClick={() => {
                      navigator.clipboard.writeText(c.code)
                      alert(`Copied ${c.code} to clipboard!`)
                    }}
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Offers
