'use client'
import { addToCart, fetchCart } from '@/lib/cartslice'
import { AppDispatch } from '@/lib/configstore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

const Addtocart = ({ id }: { id: number }) => {
  const dispath = useDispatch<AppDispatch>()
  const router = useRouter()
  return (
    <div className="w-[88px] h-[81px] rounded-tl-4xl flex justify-center items-center bg-[#FCEEEC] relative z-50">
      <button
        className="flex justify-center items-center cursor-pointer outline-0 focus:outline-0 active:outline-0 focus:border-0 active:border-0"
        onClick={() => {
          dispath(addToCart(id))
          dispath(fetchCart())
          router.push('/cart')
        }}
      >
        <Image src={'/Plus.png'} alt="plus" width={49} height={49} className="block" />
      </button>
    </div>
  )
}

export default Addtocart
