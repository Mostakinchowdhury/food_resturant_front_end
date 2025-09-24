// {
//     "id": 1,
//     "email": "chowdhurymostakin02@gmail.com",
//     "first_name": "mostakin",
//     "last_name": "chowdhury"
// }

// user type declare
export type usertype = {
  id: number
  email: string
  first_name: string
  last_name: string
  is_staff: boolean
  is_superuser: boolean
}

// optionaluser type declare

export type optionalusertype = {
  id: number
  first_name?: string
  last_name?: string
}
