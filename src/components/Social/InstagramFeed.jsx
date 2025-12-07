import React from "react"
import "./SocialFeed.css"

// Instagram post embed URLs - Replace POST_ID with actual post IDs from veena_kunwar profile
// To get post IDs: Visit instagram.com/veena_kunwar, click on a post, copy the URL
// Example: instagram.com/p/ABC123XYZ/ → use "ABC123XYZ" as POST_ID
const posts = [
  "https://www.instagram.com/p/POST_ID_1/embed",
  "https://www.instagram.com/p/POST_ID_2/embed",
  "https://www.instagram.com/p/POST_ID_3/embed",
  "https://www.instagram.com/p/POST_ID_4/embed",
  "https://www.instagram.com/p/POST_ID_5/embed",
  "https://www.instagram.com/p/POST_ID_6/embed",
]

export default function InstagramFeed({ title = "Instagram Highlights" }) {
  return (
    <section className="instagram-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="insta-grid">
          {posts.map((url, index) => (
            <div key={index} className="insta-post-wrapper">
              <iframe
                src={url}
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="encrypted-media"
                title={`Instagram post ${index + 1}`}
                loading="lazy"
              ></iframe>
            </div>
          ))}
        </div>
        <div className="social-link-fallback" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a
            href="https://www.instagram.com/veena_kunwar"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            📷 Follow @veena_kunwar on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
