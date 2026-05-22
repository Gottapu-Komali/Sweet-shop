/* src/lib/cart.ts */
import { useEffect, useState } from 'react'
import type { Product, ProductVariant } from './products'
import { catalog } from './products'

export type CartItem = {
  productId: string
  variantId: string
  qty: number
}

export type CartLine = {
  key: string
  product: Product
  variant: ProductVariant
  qty: number
  lineTotal: number
}

// Storage key for localStorage
const STORAGE_KEY = 'shf_cart_v2'

// Helper to get current cart array
function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

// Save cart to storage and notify listeners
function setCart(cart: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  // Dispatch a storage event to trigger listeners
  window.dispatchEvent(new Event('storage'))
}

// Simple pub/sub via storage event
export const cart = {
  add(productId: string, variantId: string, qty = 1) {
    const cart = getCart()
    const existing = cart.find(c => c.productId === productId && c.variantId === variantId)
    if (existing) {
      existing.qty += qty
    } else {
      cart.push({ productId, variantId, qty })
    }
    setCart(cart)
  },
  setQty(productId: string, variantId: string, qty: number) {
    const cart = getCart()
    const idx = cart.findIndex(c => c.productId === productId && c.variantId === variantId)
    if (idx >= 0) {
      if (qty <= 0) {
        cart.splice(idx, 1)
      } else {
        cart[idx].qty = qty
      }
      setCart(cart)
    }
  },
  remove(productId: string, variantId: string) {
    const cart = getCart()
    const filtered = cart.filter(c => !(c.productId === productId && c.variantId === variantId))
    setCart(filtered)
  },
  clear() {
    setCart([])
  },
}

// Hook returning raw cart items
export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => getCart())

  useEffect(() => {
    const handleStorage = () => setItems(getCart())
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return items
}

// Hook returning resolved lines, subtotal, count
export function useCartLines() {
  const items = useCart()
  const products = getCatalog() // from products.ts
  const lines: CartLine[] = []
  let subtotal = 0
  items.forEach(item => {
    const product = products.find(p => p.id === item.productId)
    const variant = product?.variants.find(v => v.id === item.variantId)
    if (product && variant) {
      const lineTotal = variant.price * item.qty
      subtotal += lineTotal
      lines.push({
        key: `${item.productId}::${item.variantId}`,
        product,
        variant,
        qty: item.qty,
        lineTotal,
      })
    }
  })
  const count = items.reduce((sum, i) => sum + i.qty, 0)
  return { lines, subtotal, count }
}

function getCatalog() {
  return catalog
}
