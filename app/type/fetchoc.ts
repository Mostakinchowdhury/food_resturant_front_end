export type CategoryResponse = {
  categories: string[]
  max_discount: number
}

export type Offer = {
  id: number
  category: string
  productimgs: string
  name: string
  discount_percent: number
  avr_discount: number
}

export type OfferResponse = {
  offers: Offer[]
  length: number
}
