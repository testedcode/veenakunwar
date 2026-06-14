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
    <div className="gallery-radical">
      <section className="gallery-organic-hero organic-section">
        <div className="fluid-container text-center">
          <h1 className="hero-title">Visual Symphony</h1>
          <p className="hero-subtitle" style={{color: 'var(--text-light)', margin: '0 auto'}}>
            Moments of joy, deep breathing, and heritage celebrations captured in time.
          </p>
        </div>
      </section>

      <section className="gallery-masonry-section organic-section">
        <div className="fluid-container">
          {loading ? (
            <div className="loader-organic"></div>
          ) : urls.length > 0 ? (
            <div className="masonry-grid">
              {urls.map((item, index) => (
                <div 
                  key={index} 
                  className={`masonry-item ${index % 3 === 0 ? 'large' : 'small'}`} 
                  onClick={() => openLightbox(item)}
                >
                  <div className="masonry-img-wrap">
                    <img src={item.url} alt={`Gallery ${index + 1}`} loading="lazy" />
                    <div className="masonry-overlay">
                      <span className="expand-icon">Expand</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-images text-center">
              <p>Visual moments are being collected. Check back later.</p>
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="cinematic-lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          
          <button 
            className="lightbox-nav prev" 
            onClick={(e) => { e.stopPropagation(); navigateImage('prev') }}
          >
            ‹
          </button>
          
          <div className="lightbox-content-wrap" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.url} alt="Gallery Expanded" />
          </div>
          
          <button 
            className="lightbox-nav next" 
            onClick={(e) => { e.stopPropagation(); navigateImage('next') }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}

export default Gallery
