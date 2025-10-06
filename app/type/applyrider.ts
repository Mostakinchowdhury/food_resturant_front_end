export type riderformdata = {
  name: string
  phone_num: string
  working_area_address: string
  permanent_address: string
  photo: string | File // <-- এখানে union টাইপ কর
}


export interface ApplyRider {
  id?: number // read-only
  name: string
  user: number | null // OneToOneField (User ID reference)
  email: string
  phone_num: string
  working_area_address: string
  permanent_address: string
  photo: string | null // Cloudinary URL
  created_at?: string // read-only (ISO date string)
  updated_at?: string // read-only (ISO date string)
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | string // depends on APPLY_CHOICE
}
