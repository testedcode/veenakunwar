import './Offers.css'

function Faq() {
  return (
    <div className="offers-page">
      <section className="mag-section hero-mag-section text-center">
        <div className="mag-container">
          <h4>Delivery & Terms</h4>
          <h1>FAQ</h1>
          <p>Everything you need to know about ordering our heritage snacks.</p>
        </div>
      </section>

      <section className="mag-section">
        <div className="mag-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--mag-accent)' }}>Payment Terms</h3>
            <p style={{ fontSize: '1.1rem' }}>
              We currently only accept <strong>Advance Payments</strong> via UPI (GPay, PhonePe, Cred, BHIM). We do not offer Cash on Delivery (COD) to ensure the freshness of our handmade, made-to-order snacks.
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--mag-accent)' }}>Delivery Timeline</h3>
            <p style={{ fontSize: '1.1rem' }}>
              Every batch is prepared fresh upon order confirmation. Please allow 2-3 days for preparation, and standard shipping times (3-5 business days) for delivery.
            </p>
          </div>

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--mag-accent)' }}>Storage Instructions</h3>
            <p style={{ fontSize: '1.1rem' }}>
              Since we use absolutely <strong>no preservatives</strong>, please store your Thekwa and Nimki in an <strong>air-tight container</strong> in a dry place. Consume within 3-4 weeks for the best taste and crispness.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Faq
