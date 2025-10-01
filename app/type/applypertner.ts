export type pertnerformdata = {
  name: string
  phone_num: string
  business_name: string
  business_address: string
  business_type: string
  website: string
  description: string
  buesness_logo: string | File
  owner_photo: string | File // <-- এখানে union টাইপ কর
}
