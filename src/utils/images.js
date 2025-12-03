// Local images configuration - no Firebase Storage needed!

export const localImages = {
  gallery: [
    {
      url: '/profile.jpg',
      name: 'profile.jpg'
    }
  ],
  products: [
    {
      name: 'Thekuwa',
      price: 299,
      description: 'Traditional thekuwa product',
      imageURL: '/thekuwa.jpg',
      qrURL: '/qrsample.jpg',
      whatsappMessage: 'Hello! I would like to order Thekuwa.'
    }
  ]
}

// Helper to get gallery images
export function getGalleryImages() {
  return localImages.gallery.map(img => ({
    url: img.url,
    name: img.name
  }))
}

// Helper to get product images
export function getProductImage(productName) {
  const product = localImages.products.find(p => 
    p.name.toLowerCase() === productName.toLowerCase()
  )
  return product ? product.imageURL : null
}

