import { useEffect } from 'react'
import { INSTAGRAM_URL } from '../../utils/constants'
import './SocialFeed.css'

function InstagramFeed({ title = "Follow Us on Instagram", username = "veena_kunwar" }) {
  
  useEffect(() => {
    // Load SnapWidget script for Instagram feed (Free tier available)
    // Get your widget from: https://snapwidget.com/
    const existingScript = document.getElementById('snapwidget-script')
    if (!existingScript) {
      // SnapWidget loads via iframe, no script needed
      // Just need to add the iframe with your widget code
    }
  }, [])

  return (
    <section className="social-feed-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        
        {/* Option 1: SnapWidget Instagram Feed (Free - up to 20 posts including reels) */}
        <div className="instagram-embed-wrapper">
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center', 
            background: 'var(--bg-light)',
            borderRadius: '20px',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
              Instagram Feed & Reels
            </h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', maxWidth: '600px' }}>
              To show your Instagram feed and reels from <strong>@{username}</strong>, 
              get a free widget from SnapWidget:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <a
                href="https://snapwidget.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-block' }}
              >
                Get Free SnapWidget (Shows Reels)
              </a>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                Free tier: Up to 20 posts including reels
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '1rem' }}>
                After getting your widget, add the iframe code below in this file
              </p>
            </div>
          </div>
        </div>

        {/* Uncomment and add your SnapWidget iframe code here:
        <div className="instagram-embed-wrapper">
          <iframe
            src="YOUR_SNAPWIDGET_EMBED_URL_FROM_SNAPWIDGET.COM"
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            style={{ border: 'none', overflow: 'hidden', borderRadius: '20px' }}
            title="Instagram Feed"
            allow="encrypted-media"
          ></iframe>
        </div>
        */}

        {/* Option 2: Direct Instagram Profile Link with Reels Section */}
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
            Visit Our Instagram
          </h3>
          <div className="instagram-grid-fallback" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <a
                key={item}
                href={`${INSTAGRAM_URL}/reel/`}
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-post-placeholder"
                style={{
                  aspectRatio: '1',
                  background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎬</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>Reel {item}</span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="social-link-fallback" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            📷 Follow @{username} on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

export default InstagramFeed
