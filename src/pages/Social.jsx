import { FACEBOOK_URL, INSTAGRAM_URL, YOUTUBE_URL } from '../utils/constants'
import './Social.css'

function Social() {
  const mockPosts = [
    { id: 1, type: 'ig', text: "Morning laughter yoga session full of energy! 🧘‍♀️✨", img: "/profile.jpg", handle: "@hasyayoga" },
    { id: 2, type: 'fb', text: "Just prepared a fresh batch of Gur Thekwa. Pure desi ghee and love. ❤️", img: "/thekuwa.jpg", handle: "Hasya Yoga by Veena" },
    { id: 3, type: 'ig', text: "Breath is life. Laughter is the medicine. Join us this weekend! 🌿", img: "/profile.jpg", handle: "@hasyayoga" },
    { id: 4, type: 'fb', text: "Our community is growing! Thank you for the overwhelming response.", img: "/thekuwa.jpg", handle: "Hasya Yoga by Veena" },
  ]

  return (
    <div className="social-magazine">
      <section className="mag-section social-hero">
        <div className="mag-container text-center">
          <h4>Community Feed</h4>
          <h1>Stay Connected</h1>
          <div className="social-mag-links">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-mag-outline">Instagram</a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-mag-solid">Facebook</a>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="btn-mag-outline">YouTube</a>
          </div>
        </div>
      </section>

      <section className="mag-section">
        <div className="mag-container">
          <div className="grid-2-col">
            {mockPosts.map((post) => (
              <a 
                key={post.id} 
                href={post.type === 'ig' ? INSTAGRAM_URL : FACEBOOK_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mag-social-card"
              >
                <div className="mag-image-frame social-img-frame">
                  <img src={post.img} alt="Social Post" />
                  <div className="social-badge">
                    {post.type === 'ig' ? 'Instagram' : 'Facebook'}
                  </div>
                </div>
                <div className="mag-social-content">
                  <h4>{post.handle}</h4>
                  <p>{post.text}</p>
                  <span className="mag-link">View Original Post</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Social
