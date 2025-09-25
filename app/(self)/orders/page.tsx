'use client'
import LoadingLoader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { ordertype } from '@/type/order'
import api from '@/utils/api'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaCheckCircle, FaCircle, FaTimesCircle } from 'react-icons/fa'
import { toast } from 'sonner'

const Orderpage = () => {
  const [data, setdata] = useState<ordertype[] | null>(null)
  const [loading, setloading] = useState<boolean>(false)
  const fetchdata = async () => {
    setloading(true)
    try {
      const response = await api.get<ordertype[]>(`orders/`)
      if (response.data.length === 0) throw new Error('orders is empty')
      setdata(response.data)
      setloading(false)
    } catch (error) {
      setloading(false)
      if (error instanceof Error) {
        setloading(false)
        toast(error.message, {
          action: {
            label: 'Undo',
            onClick: () => {
              console.log('remove notice')
            }
          }
        })
      }
      toast('Something went wrong please contact with us', {
        action: {
          label: 'Undo',
          onClick: () => {
            console.log('remove notice')
          }
        }
      })
    }
  }

  useEffect(() => {
    fetchdata()
  }, [])
  useEffect(() => {
    console.log(data)
  }, [data])
  if (loading) {
    return <LoadingLoader />
  }
  return (
    <section className="space-y-3 lg:space-y-4">
      <h2 className="font-extrabold text-size5 lg:text-size7 text-primary">My Orders</h2>
      {data?.map((itm) => (
        <div
          className="grid grid-cols-[1fr_2fr_1fr] lg:grid-cols-7 items-center content-center gap-2 lg:gap-3 px-2.5 lg:px-3 py-2 lg:py-2.5 border-2 border-gray-500 text-gray-500 justify-center"
          key={itm.id}
        >
          {/* percel image */}
          <div className="flex justify-center items-center">
            <Image
              src={'/percel.png'}
              alt="percel img"
              width={80}
              height={80}
              className="object-center block"
            />
          </div>
          {/* items section */}
          <p className="font-medium text-size2 lg:text-size3 text-center lg:col-span-2">
            {itm.orderitems_string || 'loading...'}
          </p>
          {/* price section */}
          <p className="font-medium text-size2 lg:text-size3 text-center">
            {process.env.NEXT_PUBLIC_CURRENCY_SYMBLE}
            {itm.amount} {process.env.NEXT_PUBLIC_CURRENCY_NAME}
          </p>
          {/* order id */}
          <p className="font-medium text-size2 lg:text-size3 text-center">Order ID:#{itm.id}</p>
          {/* order stutus */}
          <div className="font-bold text-size2 lg:text-size3 flex gap-1 items-center justify-center text-txt2">
            {itm.status == 'CANCELLED' ? (
              <FaTimesCircle color="red" className="text-center" />
            ) : itm.status == 'PENDING' ? (
              <FaCircle color="yellow" />
            ) : (
              <FaCheckCircle color="green" />
            )}
            <p>
              {itm.status == 'CANCELLED'
                ? 'Cancelled'
                : itm.status == 'PENDING'
                ? 'Pending'
                : itm.status == 'PAIDANDPROCESSING'
                ? 'Paid'
                : itm.status == 'CASHANDPROCESSING'
                ? 'Cashon delivery'
                : 'Delivered'}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Button className="cursor-pointer" size={'xlg'}>
              Track Now
            </Button>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Orderpage
