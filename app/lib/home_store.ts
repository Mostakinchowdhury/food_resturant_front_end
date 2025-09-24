import { deals_type, fac_step_type, faq, partNer, popular_category_type, popular_res } from '@/type/home'

export const partner: partNer[] = [
  {
    id: 1,
    tag: 'Earn more with lower fees',
    p: 'Signup as a business',
    h: 'Partner with us',
    path: '/partner1.png',
    href: '#'
  },
  {
    id: 2,
    tag: 'Avail exclusive perks',
    p: 'Signup as a rider',
    h: 'Ride with us',
    path: '/partner2.png',
    href: '#'
  }
]

// popular pr
export const pr: popular_res[] = [
  {
    id: 1,
    path: '/pr1.png',
    ms: [122, 156],
    ps: [238, 266],
    href: '#'
  },
  {
    id: 2,
    path: '/pr2.png',
    ms: [122, 156],
    ps: [238, 266],
    href: '#'
  },
  {
    id: 3,
    path: '/pr3.png',
    ms: [122, 156],
    ps: [238, 266],
    href: '#'
  },
  {
    id: 4,
    path: '/pr4.png',
    ms: [122, 156],
    ps: [238, 266],
    href: '#'
  },
  {
    id: 5,
    path: '/pr5.png',
    ms: [122, 156],
    ps: [238, 266],
    href: '#'
  },
  {
    id: 6,
    path: '/pr6.png',
    ms: [122, 156],
    ps: [238, 266],
    href: '#'
  }
]


// popular_category

export const popular_category: popular_category_type[] = [
  {
    id: 1,
    name: 'Burgers & Fast food',
    path: '/food1.png',
    resturant: '21 Restaurants',
    href: '#'
  },
  {
    id: 2,
    name: 'Salads',
    path: '/food2.png',
    resturant: '32 Restaurants',
    href: '#'
  },
  {
    id: 3,
    name: 'Pasta & Casuals',
    path: '/food3.png',
    resturant: '4 Restaurants',
    href: '#'
  },
  {
    id: 4,
    name: 'Pizza',
    path: '/food4.png',
    resturant: '32 Restaurants',
    href: '#'
  },
  {
    id: 5,
    name: 'Breakfast',
    path: '/food5.png',
    resturant: '4 Restaurants',
    href: '#'
  },
  {
    id: 6,
    name: 'Soups',
    path: '/food6.png',
    resturant: '32 Restaurants',
    href: '#'
  }
]


// deals_type store

export const deals: deals_type[] = [
  {
    id: 1,
    path: '/deals1.png',
    tag: '-40%',
    p: 'Restaurant',
    h: 'Chef Burgers London',
    href: '#',
    type: 'Pizza & Fast food'
  },
  {
    id: 2,
    path: '/deals2.png',
    tag: '-20%',
    p: 'Restaurant',
    h: 'Grand Ai Cafe London',
    href: '#',
    type: 'Pizza & Fast food'
  },
  {
    id: 3,
    path: '/deals3.png',
    tag: '-17%',
    p: 'Restaurant',
    h: 'Butterbrot Caf’e London',
    href: '#',
    type: 'Pizza & Fast food'
  }
]

// deals nav

export const deals_nav:string[] = ['Vegan','Sushi', 'Pizza & Fast food','others']



// FAQ

export const faq_nav: faq[] = [
  {
    id: 1,
    title: 'How does Order.UK work?',
    description:
      'Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!'
  },
  {
    id: 2,
    title: 'What payment methods are accepted?',
    description:''
  },
  {
    id: 3,
    title: 'Can I track my order in real-time?',
    description:''
  },
  {
    id: 4,
    title: 'Are there any special discounts or promotions available?',
    description:''
  },
  {
    id: 5,
    title: 'Is Order.UK available in my area?',
    description:''
  }
]

// faq steps

export const faq_steps: fac_step_type[] = [
  {
    id: 1,
    h: 'Place an Order!',
    p: 'Place order through our website or Mobile app',
    path: '/How does Order.UK work1.png',
    fac: 'How does Order.UK work?'
  },
  {
    id: 2,
    h: 'Track Progress',
    p: 'Your can track your order status with delivery time',
    path: '/How does Order.UK work2.png',
    fac: 'How does Order.UK work?'
  },
  {
    id: 3,
    h: 'Get your Order!',
    p: 'Receive your order at a lighting fast speed!',
    path: '/How does Order.UK work3.png',
    fac: 'How does Order.UK work?'
  }
]

