import './Gallery.css'

function Gallery() {
  // Hardcoded stock images so it's not empty, admin can replace later.
  const images = [
    '/assets/hero.jpg',
    '/assets/food1.jpg',
    '/assets/yoga1.jpg',
    '/assets/food2.jpg',
    '/assets/yoga2.jpg',
    '/assets/food4.jpg'
  ]

  return (
    <div className="gallery-page">
      <section className="mag-section hero-mag-section text-center">
        <div className="mag-container" data-aos="fade-up">
          <h4>Visuals</h4>
          <h1>A Glimpse of Joy & Heritage</h1>
          <p>Explore the moments that make Hasya Yoga and our Heritage Pantry special.</p>
        </div>
      </section>

      <section className="mag-section" style={{ paddingTop: 0 }}>
        <div className="mag-container">
          <div className="masonry-grid">
            {images.map((src, i) => (
              <div key={i} className="masonry-item" data-aos="zoom-in" data-aos-delay={(i % 3) * 100}>
                <img src={src} alt={`Gallery visual ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery
