import { useState } from 'react'
import { Link } from 'react-router-dom'
import { openWhatsApp } from '../utils/whatsapp'
import { EMAIL, FACEBOOK_URL, INSTAGRAM_URL, YOUTUBE_URL } from '../utils/constants'
import './Contact.css'

const PHONE_1 = '7566631777'
const PHONE_2 = '9770477731'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState('')

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:${EMAIL}?subject=Contact from ${formData.name}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email + '\nPhone: ' + formData.phone)}`
    window.location.href = mailtoLink
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 4000)
  }

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero-vk" aria-label="Contact page header">
        <div className="contact-hero-bg" />
        <div className="contact-hero-content mag-container">
          <div className="contact-logo-wrap" data-aos="zoom-in" data-aos-duration="800">
            <img src="/logo.png" alt="Veena Kunwar" className="contact-logo" />
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <span className="contact-eyebrow">Get In Touch</span>
            <h1 className="contact-hero-title">We'd Love to<br/>Hear from You</h1>
            <p className="contact-hero-sub">
              Questions about our snacks, yoga sessions, or just want to say hello? Reach out any time!
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="contact-body mag-container">

        {/* Left — info cards */}
        <div className="contact-info-col" data-aos="fade-right">

          {/* Phone & WhatsApp */}
          <div className="contact-info-card">
            <div className="info-card-icon">📱</div>
            <div className="info-card-body">
              <h3>Call or WhatsApp Us</h3>
              <div className="phone-entries">
                <div className="phone-entry">
                  <a href={`tel:+91${PHONE_1}`} className="phone-link">+91 {PHONE_1}</a>
                  <div className="phone-actions">
                    <a href={`tel:+91${PHONE_1}`} className="action-btn call-btn" aria-label="Call">📞 Call</a>
                    <a
                      href={`https://wa.me/91${PHONE_1}?text=${encodeURIComponent('Hello Veena ji! I would like to enquire about your products and yoga sessions.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn wa-btn"
                      aria-label="WhatsApp"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
                <div className="phone-divider" />
                <div className="phone-entry">
                  <a href={`tel:+91${PHONE_2}`} className="phone-link">+91 {PHONE_2}</a>
                  <div className="phone-actions">
                    <a href={`tel:+91${PHONE_2}`} className="action-btn call-btn" aria-label="Call">📞 Call</a>
                    <a
                      href={`https://wa.me/91${PHONE_2}?text=${encodeURIComponent('Hello Veena ji! I would like to enquire about your products and yoga sessions.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn wa-btn"
                      aria-label="WhatsApp"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="contact-info-card">
            <div className="info-card-icon">✉️</div>
            <div className="info-card-body">
              <h3>Email</h3>
              <a href={`mailto:${EMAIL}`} className="contact-email-link">{EMAIL}</a>
            </div>
          </div>

          {/* Quick links */}
          <div className="contact-info-card">
            <div className="info-card-icon">⚡</div>
            <div className="info-card-body">
              <h3>Quick Links</h3>
              <div className="quick-links">
                <Link to="/shop" className="quick-link">🛒 Shop Products</Link>
                <Link to="/sessions" className="quick-link">🧘 Yoga Sessions</Link>
                <Link to="/offers" className="quick-link">🎁 Special Offers</Link>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="contact-info-card">
            <div className="info-card-icon">🌐</div>
            <div className="info-card-body">
              <h3>Follow Us</h3>
              <div className="contact-socials">
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="social-pill facebook">Facebook</a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="social-pill instagram">Instagram</a>
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="social-pill youtube">YouTube</a>
              </div>
            </div>
          </div>

        </div>

        {/* Right — contact form */}
        <div className="contact-form-col" data-aos="fade-left" data-aos-delay="150">
          <div className="contact-form-card">
            <div className="form-card-header">
              <h2>Send a Message</h2>
              <p>We'll get back to you within 24 hours.</p>
            </div>

            {submitted ? (
              <div className="contact-success">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className={`cf-group ${focused === 'name' ? 'focused' : ''} ${formData.name ? 'has-value' : ''}`}>
                  <input
                    type="text"
                    id="cf-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    required
                    autoComplete="name"
                  />
                  <label htmlFor="cf-name">Your Name *</label>
                  <span className="cf-bar" />
                </div>

                <div className={`cf-group ${focused === 'email' ? 'focused' : ''} ${formData.email ? 'has-value' : ''}`}>
                  <input
                    type="email"
                    id="cf-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    required
                    autoComplete="email"
                  />
                  <label htmlFor="cf-email">Email Address *</label>
                  <span className="cf-bar" />
                </div>

                <div className={`cf-group ${focused === 'phone' ? 'focused' : ''} ${formData.phone ? 'has-value' : ''}`}>
                  <input
                    type="tel"
                    id="cf-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused('')}
                    autoComplete="tel"
                  />
                  <label htmlFor="cf-phone">Phone Number</label>
                  <span className="cf-bar" />
                </div>

                <div className={`cf-group cf-group-textarea ${focused === 'message' ? 'focused' : ''} ${formData.message ? 'has-value' : ''}`}>
                  <textarea
                    id="cf-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    required
                    rows="5"
                  />
                  <label htmlFor="cf-message">Your Message *</label>
                  <span className="cf-bar" />
                </div>

                <button type="submit" className="cf-submit">
                  Send Message
                  <svg className="cf-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
