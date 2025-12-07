import { FACEBOOK_URL } from '../../utils/constants'
import './SocialFeed.css'

function FacebookFeed({ 
  title = "Connect With Us on Facebook",
  pageUrl = FACEBOOK_URL,
  width = "100%",
  height = "600"
}) {
  // Facebook Page Plugin is FREE and works without API keys
  // Just need your Facebook page URL
  
  return (
    <section className="social-feed-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="facebook-embed-wrapper">
          {/* Facebook Page Plugin - FREE, no API key needed */}
          <iframe
            src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=${width}&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
            width={width}
            height={height}
            style={{ border: 'none', overflow: 'hidden', borderRadius: '20px' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Facebook Feed"
            loading="lazy"
          ></iframe>
        </div>
        
        <div className="social-link-fallback" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a
            href={pageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            📘 Like Our Facebook Page
          </a>
        </div>
      </div>
    </section>
  )
}

export default FacebookFeed
