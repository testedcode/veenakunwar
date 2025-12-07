import { useEffect } from "react"
import { FACEBOOK_URL } from '../../utils/constants'
import "./SocialFeed.css"

export default function FacebookFeed({ title = "Facebook Updates" }) {
  useEffect(() => {
    // Load Facebook SDK only once
    if (!window.FB) {
      const script = document.createElement("script")
      script.async = true
      script.defer = true
      script.crossOrigin = "anonymous"
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0"
      document.body.appendChild(script)

      // Initialize FB when script loads
      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse()
        }
      }
    } else {
      // If FB SDK already loaded, just parse
      window.FB.XFBML.parse()
    }
  }, [])

  return (
    <section className="facebook-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="fb-page-wrapper">
          <div
            className="fb-page"
            data-href={FACEBOOK_URL}
            data-tabs="timeline"
            data-width="100%"
            data-height="650"
            data-small-header="true"
            data-hide-cover="false"
            data-adapt-container-width="true"
            data-show-facepile="true"
          ></div>
        </div>
        <div className="social-link-fallback" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a
            href={FACEBOOK_URL}
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
