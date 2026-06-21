import { useState } from 'react'
import { useStorage } from '../hooks/useFirebase'
import Loader from '../components/Loader'
import './Gallery.css'

function Gallery() {
  const { urls, loading } = useStorage('gallery')
  const [selectedImage, setSelectedImage] = useState(null)

  const openLightbox = (image) => setSelectedImage(image)
  const closeLightbox = () => setSelectedImage(null)

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
    <div className="gallery-magazine">
      <section className="mag-section gallery-hero">
        <div className="mag-container text-center">
          <h4>Visual Archive</h4>
          <h1>Gallery</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            A structured collection capturing the essence of Hasya Yoga and the purity of our Heritage Kitchen.
          </p>
        </div>
      </section>

      <section className="mag-section">
        <div className="mag-container">
          {loading ? (
            <div className="text-center" style={{ padding: '4rem 0' }}>
              <Loader />
            </div>
          ) : urls.length > 0 ? (
            <div className="mag-masonry-grid">
              {urls.map((item, index) => (
                <div 
                  key={index} 
                  className="mag-masonry-item"
                  onClick={() => openLightbox(item)}
                >
                  <div className="mag-image-frame">
                    <img src={item.url} alt={`Gallery ${index + 1}`} loading="lazy" />
                    <div className="mag-masonry-overlay">
                      <span>View</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center" style={{ padding: '4rem 0' }}>
              <p>The visual archive is currently empty.</p>
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="mag-lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          
          <button 
            className="lightbox-nav prev" 
            onClick={(e) => { e.stopPropagation(); navigateImage('prev') }}
          >
            Prev
          </button>
          
          <div className="lightbox-content-wrap" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt="Gallery Expanded" />
          </div>
          
          <button 
            className="lightbox-nav next" 
            onClick={(e) => { e.stopPropagation(); navigateImage('next') }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Gallery
