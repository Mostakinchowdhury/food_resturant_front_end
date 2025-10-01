export type riderformdata = {
  name: string
  phone_num: string
  working_area_address: string
  permanent_address: string
  photo: string | File // <-- এখানে union টাইপ কর
}

