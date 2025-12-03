import { useState } from 'react'
import { openWhatsApp } from '../utils/whatsapp'
import { EMAIL, PHONE_NUMBER } from '../utils/constants'
import Card from '../components/Card'
import Button from '../components/Button'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this to EmailJS or a backend
    const mailtoLink = `mailto:${EMAIL}?subject=Contact from ${formData.name}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email + '\nPhone: ' + formData.phone)}`
    window.location.href = mailtoLink
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  const handleWhatsApp = () => {
    openWhatsApp('Hello! I would like to get in touch about Hasya Yoga sessions.')
  }

  return (
    <div className="contact">
      <section className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p className="hero-subtitle">We'd love to hear from you</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <Card className="info-card">
                <h2>Contact Information</h2>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <div>
                    <h4>Phone</h4>
                    <a href={`tel:+${PHONE_NUMBER}`}>+{PHONE_NUMBER}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <div>
                    <h4>Email</h4>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">💬</span>
                  <div>
                    <h4>WhatsApp</h4>
                    <button onClick={handleWhatsApp} className="whatsapp-link">
                      Send Message
                    </button>
                  </div>
                </div>
              </Card>

              <Card className="info-card">
                <h2>Quick Actions</h2>
                <div className="quick-actions">
                  <Button variant="primary" onClick={handleWhatsApp}>
                    💬 WhatsApp Us
                  </Button>
                  <a href="/sessions">
                    <Button variant="secondary">📅 View Sessions</Button>
                  </a>
                  <a href="/shop">
                    <Button variant="success">🛍️ Shop Products</Button>
                  </a>
                </div>
              </Card>
            </div>

            <div className="contact-form-container">
              <Card className="form-card">
                <h2>Send Us a Message</h2>
                {submitted ? (
                  <div className="success-message">
                    <p>✓ Thank you! Your message has been sent.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        placeholder="Your message here..."
                      ></textarea>
                    </div>
                    <Button type="submit" variant="primary" className="submit-btn">
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

