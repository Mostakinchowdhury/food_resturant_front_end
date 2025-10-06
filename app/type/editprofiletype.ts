export type formdata = {
  id: number
  phone_num: string
  country: string
  gender: string
  birth_date: Date | null
  bio: string
  profile_imag?: string | File
  profile_image?: string | File |number// <-- এখানে union টাইপ কর
}
export type formdata_setting = {
  id: number
  language: string
  theme: string
}

export type formdata_changepassword = {
  old_password: string
  new_password: string
  confirm_password: string
}
export type formdata_resetpassword = {
  password: string
  confirm_password: string
  token: string
  uidb64: string
}

// formdatat type for adress
export type formdata_adress = {
  id: number
  city: string
  street: string
  country: string
}
export type formdata_create_adress = {
  profile: number
  city: string
  street: string
  country: string
}
