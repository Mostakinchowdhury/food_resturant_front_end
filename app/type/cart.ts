import { product_type } from "./item"

export interface CartItem {
  id: number
  cart: number
  price: number
  quantity: number
  product: number
  product_detail: product_type
  ischeaked: boolean
  added_at: string
  subtotal: number
}
export interface Cart {
  id: number
  user: number
  user_email: string
  created_at: string
  update_at: string
  items: CartItem[]
  total_price: number
  total_quantity: number
}

export interface intcart {
  cart: Cart | null
  isloading: boolean
  error: string
}
