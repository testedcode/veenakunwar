import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('vk_cart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [discount, setDiscount] = useState({ code: '', amount: 0, percentage: 0 })

  useEffect(() => {
    localStorage.setItem('vk_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, variant, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.productId === product.id && item.variantId === variant.id
      )

      if (existingItemIndex >= 0) {
        const newCart = [...prevCart]
        newCart[existingItemIndex].quantity += quantity
        return newCart
      } else {
        return [...prevCart, {
          productId: product.id,
          productName: product.name,
          imageURL: product.imageURL,
          variantId: variant.id,
          variantName: variant.name,
          price: variant.price,
          quantity
        }]
      }
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (productId, variantId) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.productId === productId && item.variantId === variantId)
    ))
  }

  const updateQuantity = (productId, variantId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId)
      return
    }
    setCart(prevCart => prevCart.map(item => {
      if (item.productId === productId && item.variantId === variantId) {
        return { ...item, quantity }
      }
      return item
    }))
  }

  const clearCart = () => {
    setCart([])
    setDiscount({ code: '', amount: 0, percentage: 0 })
  }

  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  
  // Calculate discount amount based on percentage
  const discountAmount = discount.percentage > 0 
    ? Math.round(cartSubtotal * (discount.percentage / 100))
    : discount.amount

  const cartTotal = Math.max(0, cartSubtotal - discountAmount)

  const applyCoupon = (code, percentage, fixedAmount = 0) => {
    setDiscount({ code, percentage, amount: fixedAmount })
  }

  const removeCoupon = () => {
    setDiscount({ code: '', amount: 0, percentage: 0 })
  }

  const value = {
    cart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    discountCode: discount.code,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    setIsCartOpen,
    applyCoupon,
    removeCoupon
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
