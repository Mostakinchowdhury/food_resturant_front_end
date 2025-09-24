// create a cheakout Page
'use client'
import Carttable from '@/components/cartcom/Carttable'
import LoadingLoader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RootState } from '@/lib/configstore'
import api from '@/utils/api'
import { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const CartPage = () => {
  const totalPrice = useSelector((state: RootState) =>
    parseFloat(state.cart.cart?.total_price?.toFixed(2) || '0')
  )
  const [code, setcode] = useState<string>('')
  const [discount, setdiscount] = useState<number>(0)
  const granttotal =
    (totalPrice || 0) > 0
      ? parseFloat(
          (
            (totalPrice || 0) +
            1.2 -
            (typeof totalPrice !== 'undefined' ? totalPrice * (discount / 100) : 0)
          ).toFixed(2)
        )
      : 0

  const handlepromo = (e: ChangeEvent<HTMLInputElement>) => {
    setcode(e.target.value)
  }
  // loading state
  const [loading, setloading] = useState<boolean>(false)

  // handle change

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setloading(true)
    console.log(code)
    try {
      const response = await api.post<object>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}promocodes/apply/`,
        { code },
        {
          validateStatus: () => true
        }
      )
      if (!(response.status == 200 || response.status == 201)) {
        setloading(false)
        console.log(response.data)
        toast(Object.values(response.data).flat()[0], {
          action: {
            label: 'Undo',
            onClick: () => {
              console.log('remove notice')
            }
          }
        })
        return
      }
      setloading(false)
      setdiscount(response.data?.discount_percent || 0)
      toast(Object.values(response.data).flat()[0], {
        action: {
          label: 'Undo',
          onClick: () => {
            console.log('remove notice')
          }
        }
      })
    } catch (error) {
      setloading(false)
      console.log()
      if (error instanceof Error) {
        toast(error.message, {
          action: {
            label: 'Undo',
            onClick: () => {
              console.log('remove notice')
            }
          }
        })
      } else {
        toast('Sorry something went wrong please contact with us', {
          action: {
            label: 'Undo',
            onClick: () => {
              console.log('remove notice')
            }
          }
        })
      }
    }
  }
  if (loading) {
    return <LoadingLoader />
  }
  return (
    <div className="flex flex-col lg:flex-row items-start gap-3 lg:gap-12">
      {' '}
      <div className="grow">
        <Carttable />
      </div>
      <div className="flex flex-col gap-3 items-start shrink-0">
        <p className="text-txt2 font-medium ">If you have a promo code enter it here</p>
        {/* fromo code section */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2 items-center bg-gray-200 rounded-lg">
            <Input
              value={code}
              onChange={handlepromo}
              className="border-0 outline-0 focus:outline-0 active:outline-0 focus:border-0 bg-transparent grow text-size0 font-medium text-txt2 placeholder:text-txt2 placeholder:font-normal pr-0 selection:bg-transparent ring-0 focus:ring-0 focus-visible:ring-0"
              placeholder="Enter your promocode"
            />
            <Button type="submit" className="cursor-pointer">
              Submit
            </Button>
          </div>
          {discount > 0 && (
            <p className="text-primary font-medium mt-2">✅ {discount}% Discount Claimed</p>
          )}
        </form>
        {/* pricing section */}
        <div className="border-2 border-gray-500 rounded-lg p-4 flex flex-col gap-3 w-98 mt-3">
          <div className="flex justify-between items-center w-full">
            <p className="text-size3 font-medium text-gray-400">Subtotal</p>
            <p className="text-size4 font-semibold text-txt2">£{totalPrice || 0}</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-size3 font-medium text-gray-400">Discount</p>
            <p className="text-size4 font-semibold text-txt2">
              £
              {parseFloat(
                (typeof totalPrice !== 'undefined' ? totalPrice * (discount / 100) : 0).toFixed(2)
              )}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-size3 font-medium text-gray-400">Delivery charge</p>
            <p className="text-size4 font-semibold text-txt2">£1.2</p>
          </div>
          <div className="w-full h-0.5 bg-gray-400" />
          <div className="flex justify-between items-center w-full">
            <p className="text-size3 font-semibold text-txt2">Grand total</p>
            <p className="text-size4 font-semibold text-txt2">£{granttotal}</p>
          </div>
          {/* cheakout button */}
          <Button
            className="w-full bg-primary cursor-pointer h-12 text-size3 text-white tracking-wider"
            size={'default'}
            onClick={() => {
              if (!(granttotal > 0)) {
                toast('Please select your cart item at first', {
                  description:
                    'If you add to cart any product but do not cheaked it.that case you cannot purchace it'
                })
              }
            }}
          >
            CHECKOUT NOW
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartPage

