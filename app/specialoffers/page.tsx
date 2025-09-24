// Typenav

import { poppins } from '@/components/Navbar'
import Products from '@/components/menu/Products'
import Search from '@/components/menu/Search'
import { product_type } from '@/type/item'

export const revalidate = 3600 / 36
export const metadata = {
  title: 'Restaurant Offers',
  description: 'Find the best restaurant offers and discounts'
}
export default async function ResturantPage() {
  const url = `${process.env.BACKEND_URL}products/discount_items/`
  const respons = await fetch(url)
  const { results }: { results: product_type[] } = await respons.json()
  if (!respons.ok) {
    throw new Error('Failed to fetch data')
  }
  try {
    return (
      <div className={`${poppins.className} space-y-7`}>
        <h2 className="text-primary text-size5 lg:text-size6 font-extrabold text-center">
          Special Offers for You
        </h2>
        <Search />
        <Products products={results} />
      </div>
    )
  } catch (error) {
    return (
      <div className="text-center text-red-500">Failed to load data {JSON.stringify(error)}</div>
    )
  }
}
