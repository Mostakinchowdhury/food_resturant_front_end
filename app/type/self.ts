//
// address type

export type address = {
  id: number
  street: string
  city: string
  country: string
  created_at: string
}
// optional adress
export type optionaladdress = {
  id: number
  street?: string
  city?: string
  country?: string
}

export type createaddress_type = {
  street: string
  city: string
  country: string
}

// profile type

export type profile = {
  id: number
  addresses: address[]
  phone_num: null | string
  country: string
  bio: null | string
  gender: string
  birth_date: null | string
  profile_image: null | string | number
  profile_imag: null | string
  user: number
}
// optional profile
export type optionalprofile = {
  id: number
  phone_num?: null | string
  country?: string
  bio?: null | string
  gender?: string
  birth_date?: null | string
  profile_image?: null | string
  user?: number
}

// settings type

export type settings = {
  id: number
  theme: string
  language: string
  setting_adding_time: string
  setting_update_time: string
  user: number
}

// optional settings

export type optionalsettings = {
  id: number
  theme?: string
  language?: string
  setting_adding_time?: string
  setting_update_time?: string
  user?: number
}

// user type
