import { useEffect } from 'react'
import './SocialFeed.css'

function InstagramFeed({ title = "Follow Us on Instagram" }) {
  useEffect(() => {
    // Load EmbedSocial script if not already loaded
    if (!window.embedsocial) {
      const script = document.createElement('script')
      script.src = 'https://embedsocial.com/embedscript/ig.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <section className="social-feed-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="instagram-embed-wrapper">
          {/* Option 1: EmbedSocial Widget (Free tier available) */}
          <div 
            className="embedsocial-instagram-feed" 
            data-embed-id="your-embed-id"
            style={{ width: '100%', minHeight: '500px' }}
          >
            <p style={{ textAlign: 'center', padding: '2rem' }}>
              Instagram feed will appear here. 
              <br />
              <a 
                href="https://embedsocial.com/instagram-feed/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: 'var(--primary-blue)' }}
              >
                Set up your Instagram feed
              </a>
            </p>
          </div>

          {/* Option 2: Simple iframe embed (if you have embed code) */}
          {/* Uncomment and add your embed code:
          <iframe
            src="YOUR_INSTAGRAM_EMBED_URL"
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            allowTransparency="true"
            title="Instagram Feed"
          ></iframe>
          */}
        </div>
        
        <div className="social-link-fallback" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            📷 Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

export default InstagramFeed

