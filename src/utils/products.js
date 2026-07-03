/**
 * Normalizes product variants from Firestore/admin into the shape Shop expects.
 * Admin historically saved { size, price }; Shop expects { id, name, price }.
 */
export function normalizeVariants(variants, fallbackPrice) {
  if (!variants?.length) {
    if (fallbackPrice != null && fallbackPrice !== '') {
      return [{ id: 'default', name: 'Standard', price: Number(fallbackPrice) || 0 }]
    }
    return []
  }

  return variants.map((variant, index) => ({
    id: variant.id || `variant-${index}`,
    name: variant.name || variant.size || `Option ${index + 1}`,
    price: Number(variant.price ?? fallbackPrice) || 0,
  }))
}

export function normalizeProduct(product) {
  const variants = normalizeVariants(product.variants, product.price)
  return {
    ...product,
    variants,
    isAvailable: product.isAvailable !== false,
  }
}
