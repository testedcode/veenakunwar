import { FACEBOOK_URL, INSTAGRAM_URL, YOUTUBE_URL } from '../utils/constants'
import './Social.css'

function Social() {
  const mockPosts = [
    { id: 1, type: 'ig', text: "Morning laughter yoga session full of energy! 🧘‍♀️✨ #HasyaYoga #MorningVibes", img: "/profile.jpg" },
    { id: 2, type: 'fb', text: "Just prepared a fresh batch of Gur Thekwa. Pure desi ghee and love. ❤️", img: "/thekuwa.jpg" },
    { id: 3, type: 'ig', text: "Breath is life. Laughter is the medicine. Join us this weekend! 🌿", img: "/profile.jpg" },
    { id: 4, type: 'fb', text: "Our community is growing! Thank you for the overwhelming response to our heritage snacks.", img: "/thekuwa.jpg" },
  ]

  return (
    <div className="social-radical organic-section">
      <div className="fluid-container">
        
        <div className="social-header-split">
          <div className="social-title-area">
            <h1 className="hero-title">Live <br/> Community <br/> Stream</h1>
          </div>
          <div className="social-links-area">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-organic social-pill">Instagram</a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-organic social-pill">Facebook</a>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="btn-organic social-pill">YouTube</a>
          </div>
        </div>

        <div className="live-stream-grid">
          {mockPosts.map((post, idx) => (
            <a 
              key={post.id} 
              href={post.type === 'ig' ? INSTAGRAM_URL : FACEBOOK_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`stream-card type-${post.type}`}
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <div className="stream-image">
                <img src={post.img} alt="Post" />
                <div className={`platform-badge ${post.type}`}>
                  {post.type === 'ig' ? 'Instagram' : 'Facebook'}
                </div>
              </div>
              <div className="stream-content">
                <p>{post.text}</p>
                <span className="stream-action">View Post ↗</span>
              </div>
            </a>
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default Social
