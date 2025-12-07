import { useEffect, useState } from 'react'
import { INSTAGRAM_URL } from '../../utils/constants'
import './SocialFeed.css'

function InstagramFeed({ title = "Follow Us on Instagram", username = "" }) {
  const [embedCode, setEmbedCode] = useState('')

  // Option 1: Elfsight Instagram Feed (Free tier available)
  // Get your widget code from: https://elfsight.com/instagram-feed-instashow/
  useEffect(() => {
    // If you have Elfsight widget code, uncomment and add it:
    // const script = document.createElement('script')
    // script.src = 'https://apps.elfsight.com/p/platform.js'
    // script.defer = true
    // document.body.appendChild(script)
  }, [])

  return (
    <section className="social-feed-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        
        {/* Option 1: Elfsight Widget (Free tier - up to 6 posts) */}
        <div className="instagram-embed-wrapper">
          <div className="elfsight-app-your-widget-id" style={{ minHeight: '500px' }}>
            <div style={{ 
              padding: '3rem', 
              textAlign: 'center', 
              background: 'var(--bg-light)',
              borderRadius: '20px'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Instagram Feed
              </h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                To show your Instagram feed, use one of these free options:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <a
                  href="https://elfsight.com/instagram-feed-instashow/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ display: 'inline-block' }}
                >
                  Get Free Elfsight Widget
                </a>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                  Free tier: Up to 6 posts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Option 2: SnapWidget (Free tier available) */}
        {/* Uncomment and add your SnapWidget code:
        <div className="instagram-embed-wrapper">
          <iframe
            src="YOUR_SNAPWIDGET_EMBED_URL"
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            style={{ border: 'none', overflow: 'hidden' }}
            title="Instagram Feed"
          ></iframe>
        </div>
        */}

        {/* Option 3: Simple Instagram Profile Link Grid */}
        <div className="instagram-grid-fallback" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <a
              key={item}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-post-placeholder"
              style={{
                aspectRatio: '1',
                background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textDecoration: 'none',
                transition: 'transform 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span style={{ fontSize: '2rem' }}>📷</span>
            </a>
          ))}
        </div>
        
        <div className="social-link-fallback" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a
            href={INSTAGRAM_URL}
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
