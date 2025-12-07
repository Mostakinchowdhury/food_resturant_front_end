// Single Partner type
type Partner = {
  id: number
  name: string
  email: string
  phone_num: string
  business_name: string
  business_address: string
  business_type: string
  website: string
  description: string
  buesness_logo: string | null
  buesness_logo_url: string | null
  owner_photo: string | null
  owner_photo_url: string | null
  status: 'APPROVED' | 'PENDING' | 'REJECTED' // প্রয়োজনে enum করা যাবে
  created_at: string // ISO date string
  updated_at: string // ISO date string
  total_quantity: number
  total_products: number
}

// Root response type
export type TopPartnersResponse = {
  top_partners: Partner[]
  length: number
}
