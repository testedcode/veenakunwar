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
      id: 'prod-1',
      name: 'Heritage Thekwa',
      price: 299,
      description: 'Traditional handcrafted Thekwa made with authentic recipes and premium ingredients. A crispy, sweet delight perfect for tea time.',
      imageURL: '/thekuwa.jpg', // Placeholder, using user's existing image if available or generate one
      qrURL: '/qrsample.jpg',
      story: "Thekwa is more than just a sweet; it's a piece of our heritage. Prepared with utmost devotion and purity, our Thekwa carries the essence of traditional festivals. We handcraft each piece using age-old techniques passed down through generations, ensuring every bite takes you on a nostalgic journey home.",
      ingredients: ['Premium Whole Wheat Flour', 'Sudh Desi Ghee', 'Dry Fruits', 'Cardamom', 'Fennel Seeds'],
      variants: [
        { id: 'v1', name: 'With Sugar', price: 299 },
        { id: 'v2', name: 'With Gud (Jaggery)', price: 349 }
      ],
      whatsappMessage: 'Hello! I would like to order Heritage Thekwa.'
    },
    {
      id: 'prod-2',
      name: 'Flour Nimki',
      price: 199,
      description: 'Crispy, savory bites made with pure flour and select spices. A perfect companion for your evening tea.',
      imageURL: '/assets/placeholders/gallery1.jpg', // Use a placeholder until user uploads real
      qrURL: '/qrsample.jpg',
      story: "Our Flour Nimki is the ultimate savory treat. Kneaded with the perfect blend of spices and deep-fried in premium oil/ghee to a golden crispness, these diamond-shaped wonders are an irresistible snack. They represent the simple joys of sharing a hot cup of tea with loved ones.",
      ingredients: ['Refined Wheat Flour', 'Sudh Desi Ghee', 'Ajwain (Carom Seeds)', 'Rock Salt'],
      variants: [
        { id: 'v3', name: 'Standard Pack (250g)', price: 199 },
        { id: 'v4', name: 'Family Pack (500g)', price: 380 }
      ],
      whatsappMessage: 'Hello! I would like to order Flour Nimki.'
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
