// tags type
export type tags = {
  id: number
  name: string
  tag_author: string
}

// Product review type

export type productreview = {
  id: number
  user: string
  product: string
  rating: number
  comment: string
  created_at: string
  updated_at: string
}

// write product type

export type product_type = {
  id: number
  category: string
  name: string
  description: string
  price: string
  max_price: string | null
  stock: number
  productimgs: productimgs_type[]
  tags: tags[]
  created_at: string
  update_at: string
  reviews: productreview[]
  average_rating: number
  review_count: number
  addedtocard: number
  added_to_cart_count: number
}

export type productimgs_type = {
  id: number
  file: string
  product: number
}

export interface Category {
  id: number
  name: string
  description: string
  image: string
}

export interface SuperCategory {
  id: number
  category: Category[]
  title: string
}
