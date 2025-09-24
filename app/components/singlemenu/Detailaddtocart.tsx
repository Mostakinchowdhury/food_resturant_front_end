'use client'
import { addToCart, fetchCart } from '@/lib/cartslice'
import { AppDispatch } from '@/lib/configstore'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

const Detailaddtocart = ({ id }: { id: number }) => {
  const dispath = useDispatch<AppDispatch>()
  const router = useRouter()
  return (
    <button
      className="px-4 py-3 bg-primary text-white rounded-md hover:bg-orange-600 transition cursor-pointer text-size3 font-bold md:text-size4"
      onClick={() => {
        dispath(addToCart(id))
        dispath(fetchCart())
        router.push('/cart')
      }}
    >
      Add to Cart
    </button>
  )
}

export default Detailaddtocart
