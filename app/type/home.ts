export type social = {
  name: string
  path: string
  link: string
  size: number
}
export type menu = {
  cls: string
}
// {
//       id: 1,
//       path: '/pr1.png',
//       ms: [122, 156],
//       ps: [238, 266]
//     }
export type popular_res = {
  id: number
  path: string
  ms: number[]
  ps: number[]
  href: string
}

// //  {
//     id: 1,
//     tag: 'Earn more with lower fees',
//     p: 'Signup as a business',
//     h: 'Partner with us'
//   }

export type partNer = {
  id: number
  tag: string
  p: string
  h: string
  path: string
  href: string
}

export type popular_category_type = {
  id: number
  path: string
  name: string
  resturant: string
  href: string
}

// deals_type type

export type deals_type = {
  id: number
  tag: string
  p: string
  h: string
  path: string
  href: string
  type: string
}

// FAG

export type faq = {
  id: number
  title: string
  description: string
}

// faq step

export type fac_step_type = {
  id: number
  h: string
  p: string
  path: string
  fac: string
}
