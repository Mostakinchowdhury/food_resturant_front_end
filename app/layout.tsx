import Footer from '@/components/Footer'
import Navbar, { poppins } from '@/components/Navbar'
import Promo from '@/components/Promo'
import { Providers } from '@/lib/Providers'
import type { Metadata } from 'next'
import { Toaster } from './components/ui/sonner'
import './globals.css'
//
export const metadata: Metadata = {
  title: 'OrderUK home page',
  description: "It's a food website you can order food",
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fc8a06' }, // light mode
    { media: '(prefers-color-scheme: dark)', color: '#fc8a06' } // dark mode
  ],
  icons: {
    icon: '/favicon.jpg'
  }
}

// const demoProduct = {
//   id: 101,
//   category: 'Burger',
//   name: 'Double Beef Burger',
//   description:
//     'The Double Beef Burger is the ultimate treat for burger lovers who crave bold flavors and hearty satisfaction. Crafted with care, this burger features not one, but two thick, juicy beef patties grilled to perfection, locking in their natural flavors. Each patty is seasoned with a secret blend of spices that delivers a smoky, savory taste in every bite.Layered between a soft, freshly baked brioche bun, the burger is complemented with crisp lettuce, ripe tomatoes, and caramelized onions that add a refreshing crunch and sweetness. A generous slice of melted cheddar cheese drapes over the patties, creating a rich and creamy balance against the meaty texture. To elevate the flavor, a tangy special house sauce is added, giving the burger a perfect blend of zest and creaminess.The Double Beef Burger isn’t just about taste—it’s also about experience.',
//   price: 580,
//   stock: 50,
//   image: 'https://example.com/images/double-beef-burger.jpg',
//   tag: [
//     {
//       id: 1,
//       name: 'Fast Food',
//       tag_author: 'admin@example.com'
//     },
//     {
//       id: 2,
//       name: 'Beef',
//       tag_author: 'chef@example.com'
//     }
//   ],
//   create_at: '2025-09-03T12:00:00Z',
//   update_at: '2025-09-03T14:30:00Z',
//   reviews: [
//     {
//       id: 1,
//       user: 'john.doe@example.com',
//       product: 'Double Beef Burger',
//       rating: 5,
//       comment:
//         'I recently had the chance to try the Double Beef Burger at this restaurant, and it was an amazing experience. The burger was large and beautifully stacked with two juicy beef patties cooked perfectly, seasoned just right, and bursting with flavor. The melted cheese added a creamy texture that paired well with the crisp lettuce, fresh tomatoes, and lightly pickled onions. The bun was soft yet sturdy enough to hold all the ingredients without getting soggy, making every bite enjoyable.The special sauce was a highlight – tangy, slightly smoky, and perfectly balanced with the savory beef. The fries served alongside were golden, crispy, and seasoned well, complementing the burger nicely. Every element of the dish felt carefully prepared, from the fresh ingredients to the attention to detail in presentation.The staff was friendly, attentive, and ensured the dining experience was smooth and pleasant. Overall, this burger was satisfying, flavorful, and a true delight for anyone who loves a hearty burger. It exceeded my expectations in taste, portion size, and presentation. I would highly recommend the Double Beef Burger to anyone looking for a delicious, filling, and memorable meal. Definitely a must-try for burger enthusiasts and a dish I will return for again.',
//       created_at: '2025-09-03T22:00:00Z',
//       updated_at: '2025-09-03T13:15:00Z'
//     },
//     {
//       id: 2,
//       user: 'jane.smith@example.com',
//       product: 'Double Beef Burger',
//       rating: 4,
//       comment:
//         'I  tried the Double Beef Burger, and it was absolutely delightful. The burger had two perfectly cooked beef patties, juicy and flavorful, with just the right amount of seasoning. The melted cheese added a creamy layer that paired well with the fresh lettuce, ripe tomatoes, and lightly pickled onions. The bun was soft yet sturdy enough to hold all the ingredients together, making it easy to eat without any mess.What stood out was the homemade sauce, tangy and slightly smoky, which enhanced the overall flavor of the burger. The fries served alongside were crisp on the outside and soft on the inside, making them a perfect complement. The presentation was neat, and the staff were friendly and attentive. Overall, this burger was satisfying, delicious, and worth every bite. I would highly recommend the Double Beef Burger to anyone craving a hearty, flavorful, and well-prepared meal.',
//       created_at: '2025-09-03T20:00:00Z',
//       updated_at: '2025-09-03T14:10:00Z'
//     }
//   ],
//   average_rating: 3.1,
//   review_count: 2,
//   addedtocard: 150
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fc8a06" />
      </head>
      <body
        className={`lg:px-[80px] px-[15px] md:px-[100px] space-y-6 ${poppins.className} select-text`}
      >
        <Providers>
          <Promo />
          <Navbar />
          {children}
          <Footer />
          <Toaster
            className="border-2 border-primary text-center"
            style={{
              border: '2px',
              borderColor: '#fc8a06'
            }}
            position="top-center"
            closeButton={true}
          />
        </Providers>
      </body>
    </html>
  )
}
