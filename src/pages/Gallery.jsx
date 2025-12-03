import { useState } from 'react'
import { getGalleryImages } from '../utils/images'
import Loader from '../components/Loader'
import './Gallery.css'

function Gallery() {
  // Use local images instead of Firebase Storage
  const urls = getGalleryImages()
  const loading = false
  const [selectedImage, setSelectedImage] = useState(null)

  const openLightbox = (image) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction) => {
    if (!selectedImage) return
    const currentIndex = urls.findIndex(img => img.url === selectedImage.url)
    let newIndex
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % urls.length
    } else {
      newIndex = (currentIndex - 1 + urls.length) % urls.length
    }
    setSelectedImage(urls[newIndex])
  }

  return (
    <div className="gallery">
      <section className="gallery-hero">
        <div className="container">
          <h1>Photo Gallery</h1>
          <p className="hero-subtitle">Moments of joy and wellness from our sessions</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <Loader />
          ) : urls.length > 0 ? (
            <div className="gallery-grid">
              {urls.map((item, index) => (
                <div
                  key={index}
                  className="gallery-item"
                  onClick={() => openLightbox(item)}
                >
                  <img src={item.url} alt={`Gallery ${index + 1}`} />
                  <div className="gallery-overlay">
                    <span className="gallery-icon">🔍</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-images">
              <p>Gallery images coming soon! Check back later.</p>
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('prev')
            }}
          >
            ‹
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt="Gallery" />
          </div>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('next')
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}

export default Gallery

