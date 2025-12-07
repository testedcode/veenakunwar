import { useState } from 'react'
import Card from '../Card'
import './ImageGrid.css'

function ImageGrid({ images, title = "Gallery", columns = 3 }) {
  const [selectedImage, setSelectedImage] = useState(null)

  if (!images || images.length === 0) {
    return (
      <section className="image-grid-section">
        <div className="container">
          <h2 className="section-title">{title}</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>
            No images available yet.
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="image-grid-section">
        <div className="container">
          <h2 className="section-title">{title}</h2>
          <div className={`image-grid grid-${columns}`}>
            {images.map((image, index) => (
              <div
                key={index}
                className="image-grid-item"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.url || image} 
                  alt={`${title} ${index + 1}`}
                  onError={(e) => {
                    e.target.src = '/assets/placeholders/profile1.jpg'
                  }}
                />
                <div className="image-overlay">
                  <span className="view-icon">🔍</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage.url || selectedImage} alt="Gallery" />
          </div>
        </div>
      )}
    </>
  )
}

export default ImageGrid

