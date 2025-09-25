// order type

// {
//     "id": 13,
//     "": 1,
//     "": "chowdhurymostakin02@gmail.com",
//     "": 3,
//     "": "CASHANDPROCESSING",
//     "": "jagreb,rangpur,bangladesh",
//     "": "+0161179670345",
//     "": "2025-09-25T03:33:12.985931+06:00",
//     "": 26.42,
//     "": "9:Rangpuria  Poteto Samusa x 2 \n"
// }

export type ordertype = {
  id: number
  user: number
  user_email: string
  cart: number
  status: string
  address: string
  phone: string
  ordered_at: string
  total_amount: number
  orderitems_string: string
  amount: string
}
