import './SocialFeed.css'

function FacebookFeed({ 
  title = "Connect With Us on Facebook",
  pageUrl = "https://www.facebook.com/profile.php?id=61557064283280",
  width = "100%",
  height = "600"
}) {
  return (
    <section className="social-feed-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="facebook-embed-wrapper">
          {/* Facebook Page Plugin */}
          <iframe
            src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=${width}&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
            width={width}
            height={height}
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Facebook Feed"
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

