import { PHONE_NUMBER } from './constants'

export function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message)
  const url = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`
  window.open(url, '_blank')
}

export function formatProductOrder(product) {
  return `Hello! I would like to order:\n\nProduct: ${product.name}\nPrice: ₹${product.price}\n\nPlease confirm availability.`
}

