import HeadSection from '@/components/singlemenu/Headsection'
import RelatedProduct from '@/components/singlemenu/Related_product'
import Reviews from '@/components/singlemenu/Reviews'
import { product_type } from '@/type/item'
import { Metadata } from 'next'

export const revalidate = 900

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const { id } = await params
    const response = await fetch(`${process.env.BACKEND_URL}products/${parseInt(id)}`)
    const product = await response.json()
    return {
      title: product.name,
      description: product.description
    }
  } catch (error) {
    console.error('Error fetching product metadata:', error)
    return {
      title: 'Product not found',
      description: 'Unable to fetch product details'
    }
  }
}

// genaret static params for SSG
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}products/}`)
    const products = await response.json()
    return (products?.results || []).map((product: { id: number }) => ({
      id: product.id.toString()
    }))
  } catch (error) {
    console.error('Error fetching products for static params:', error)
    return []
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const response = await fetch(`${process.env.BACKEND_URL}products/${parseInt(id)}`)
    const result: product_type = await response.json()
    console.log(result)
    return (
      <>
        <HeadSection product={result} />
        <RelatedProduct products={result} />
        <Reviews product={result} />
      </>
    )
  } catch (error) {
    return (
      <div>
        <h1>Product not found</h1>
        <p>We couldn&apost find the product you were looking for.</p>
        <p className="text-red-500 ">Errors:{JSON.stringify(error)}</p>
      </div>
    )
  }
}
