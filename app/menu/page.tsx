// Typenav

import { poppins } from '@/components/Navbar'
import Products from '@/components/menu/Products'
import Search from '@/components/menu/Search'
import Typenav from '@/components/menu/Typenav'
import { product_type } from '@/type/item'

export const revalidate = 100
export const metadata = {
  title: 'Restaurant Offers',
  description: 'Find the best restaurant offers and discounts'
}
export default async function ResturantPage({
  searchParams
}: {
  searchParams: { category?: string; search?: string; tag?: string }
}) {
  const category = searchParams.category || 'All'
  const qcategory = searchParams.category || ''
  const serch = searchParams.search || ''
  const tag = searchParams.tag || ''
  let url = `${process.env.BACKEND_URL}products/?search=${serch}`
  if (qcategory) {
    url += `&category=${qcategory}`
  }
  if (tag) {
    url += `&tag=${tag}`
  }
  const respons = await fetch(url)
  const { results }: { results: product_type[] } = await respons.json()
  if (!respons.ok) {
    throw new Error('Failed to fetch data')
  }
  try {
    return (
      <div className={`${poppins.className} space-y-7`}>
        <Search />
        <Typenav category={category} />
        <Products category={category} products={results} />
      </div>
    )
  } catch (error) {
    return (
      <div className="text-center text-red-500">Failed to load data {JSON.stringify(error)}</div>
    )
  }
}
