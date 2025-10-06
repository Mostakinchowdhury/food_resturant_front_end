export type Shop = {
  id: number
  name: string
  business_name: string
  business_address: string
  buesness_logo: string | null | number
  buesness_logo_url: string | null
  owner_photo: string | null | number
  owner_photo_url: string | null
  status: string
}

export type Shopdetail = {
  id: number
  name: string
  email: string
  phone_num: string
  business_name: string
  business_address: string
  business_type: string
  website: string | null
  description: string | null
  buesness_logo: string | null | number
  buesness_logo_url: string | null

  owner_photo: string | null | number
  owner_photo_url: string | null
  status: string
}
