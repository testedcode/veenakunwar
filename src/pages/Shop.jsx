import { useState, useMemo } from 'react'
import { useCollection } from '../hooks/useFirebase'
import { openWhatsApp, formatProductOrder } from '../utils/whatsapp'
import { localImages } from '../utils/images'
import Card from '../components/Card'
import Loader from '../components/Loader'
import Button from '../components/Button'
import './Shop.css'

function Shop() {
  const { data: firebaseProducts, loading } = useCollection('products')
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  // Combine Firebase products with local products
  const products = useMemo(() => {
    const localProducts = localImages.products.map((product, index) => ({
      id: `local-${index}`,
      ...product
    }))
    return [...localProducts, ...(firebaseProducts || [])]
  }, [firebaseProducts])

  const handleOrder = (product) => {
    const message = product.whatsappMessage || formatProductOrder(product)
    openWhatsApp(message)
  }

  const handleViewQR = (product) => {
    setSelectedProduct(product)
  }

  const closeQRModal = () => {
    setSelectedProduct(null)
  }

  return (
    <div className="shop">
      <section className="shop-hero">
        <div className="container">
          <h1>Wellness Products</h1>
          <p className="hero-subtitle">Carefully curated products to support your wellness journey</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading && products.length === 0 ? (
            <Loader />
          ) : products.length > 0 ? (
            <div className="products-grid">
              {products.map((product) => (
                <Card key={product.id} className="product-card">
                  {product.imageURL && (
                    <div className="product-image">
                      <img src={product.imageURL} alt={product.name} />
                    </div>
                  )}
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-price">₹{product.price}</p>
                    {product.description && (
                      <p className="product-description">{product.description}</p>
                    )}
                    <div className="product-actions">
                      <Button
                        variant="success"
                        onClick={() => handleOrder(product)}
                      >
                        Order via WhatsApp
                      </Button>
                      {product.qrURL && (
                        <Button
                          variant="secondary"
                          onClick={() => handleViewQR(product)}
                        >
                          View QR Code
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products available at the moment. Please check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {selectedProduct && selectedProduct.qrURL && (
        <div className="qr-modal" onClick={closeQRModal}>
          <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="qr-modal-close" onClick={closeQRModal}>×</button>
            <h3>Payment QR Code</h3>
            <p className="qr-product-name">{selectedProduct.name}</p>
            <p className="qr-product-price">₹{selectedProduct.price}</p>
            <div className="qr-image-container">
              <img src={selectedProduct.qrURL} alt="Payment QR Code" />
            </div>
            <p className="qr-instruction">Scan this QR code to make payment</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Shop

