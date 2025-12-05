export interface ProductReviewType {
  id: number
  product: number
  product_name: string
  user: number // email
  user_email:string
  comment: string
  rated: number
  created_at: string // ISO date string
  updated_at: string // ISO date string
}
