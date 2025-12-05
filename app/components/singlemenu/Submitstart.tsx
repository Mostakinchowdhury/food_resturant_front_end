import api from '@/utils/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { toast } from 'sonner'
import Blurload from '../Blurload'
import { Button } from '../ui/button'

export default function Submitstart({ productid }: { productid: number }) {
  const [rating, setrating] = useState<number>(0)
  const [loading, setloading] = useState<boolean>(false)
  const router = useRouter()
  const handlesubmit = async () => {
    setloading(true)
    // submit rating to backend
    try {
      const response = await api.post(
        `productrating/`,
        {
          product: productid,
          rating: rating
        },
        {
          validateStatus: (status) => status >= 200 && status < 500
        }
      )
      if (response.status !== 201) {
        const backendMsg =
          response.data?.error || (response.data as string) || 'Something went wrong'
        toast.error(backendMsg)
        return
      }
      toast.success(`Rating submission succesfully ${response.data as string}`, { duration: 2000 })
      setTimeout(() => {
        router.push(`/menu/${productid}`)
      }, 2000)
    } catch (e) {
      toast.error(`Error submitting rating :${e as string}`)
    } finally {
      setloading(false)
    }
  }
  return (
    <div className="my-4 flex items-center justify-between">
      {loading && <Blurload text="Star Sending..." />}
      <div className="flex justify-start items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((mi) => {
          if (mi <= rating) {
            return (
              <FaStar
                color="#FC8A06"
                size={28}
                className="cursor-pointer"
                key={mi}
                onClick={() => {
                  setrating(mi)
                }}
              />
            )
          } else {
            return (
              <FaRegStar
                color="#FC8A06"
                size={28}
                className="cursor-pointer"
                key={mi}
                onClick={() => {
                  setrating(mi)
                }}
              />
            )
          }
        })}
      </div>
      <Button className="text-lg font-bold px-8 h-[50px]" onClick={handlesubmit}>
        Sent Rating
      </Button>
    </div>
  )
}
