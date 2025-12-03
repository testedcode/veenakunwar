import { FACEBOOK_URL, INSTAGRAM_URL, YOUTUBE_URL } from '../utils/constants'
import './Social.css'

function Social() {
  return (
    <div className="social">
      <section className="social-hero">
        <div className="container">
          <h1>Social Media Hub</h1>
          <p className="hero-subtitle">Connect with us on social media</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="social-sections">
            {/* Instagram Section */}
            <div className="social-section-card glossy-card">
              <div className="social-header">
                <span className="social-icon">📷</span>
                <h2>Instagram</h2>
              </div>
              <p className="social-description">
                Follow us on Instagram for daily inspiration, session highlights, and wellness tips.
              </p>
              <div className="social-embed-placeholder">
                <p>Instagram feed will be embedded here</p>
                <p className="social-note">To embed Instagram feed, you can use Instagram's embed API or a service like EmbedSocial</p>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Follow on Instagram
              </a>
            </div>

            {/* Facebook Section */}
            <div className="social-section-card glossy-card">
              <div className="social-header">
                <span className="social-icon">📘</span>
                <h2>Facebook</h2>
              </div>
              <p className="social-description">
                Join our Facebook community for updates, events, and to connect with fellow practitioners.
              </p>
              <div className="social-embed-placeholder">
                <p>Facebook page posts will be embedded here</p>
                <p className="social-note">To embed Facebook posts, use Facebook's Page Plugin or Social Media Embed widgets</p>
              </div>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Like on Facebook
              </a>
            </div>

            {/* YouTube Section */}
            <div className="social-section-card glossy-card">
              <div className="social-header">
                <span className="social-icon">📺</span>
                <h2>YouTube</h2>
              </div>
              <p className="social-description">
                Watch our video tutorials, session recordings, and wellness content on YouTube.
              </p>
              <div className="social-embed-placeholder">
                <p>YouTube videos will be embedded here</p>
                <p className="social-note">You can embed YouTube videos using iframe or YouTube's embed API</p>
              </div>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success"
              >
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-card glossy-card">
            <h2>Stay Connected</h2>
            <p>
              Follow us on all our social media platforms to stay updated with the latest sessions,
              wellness tips, and community events. Join our growing community of Hasya Yoga practitioners!
            </p>
            <div className="social-links-grid">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="social-link-item">
                <span className="social-link-icon">📷</span>
                <span>Instagram</span>
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="social-link-item">
                <span className="social-link-icon">📘</span>
                <span>Facebook</span>
              </a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="social-link-item">
                <span className="social-link-icon">📺</span>
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Social

