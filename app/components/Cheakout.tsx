'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AppDispatch, RootState } from '@/lib/configstore'
import api from '@/utils/api'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

export function Add_cheakout_Dialog({ granttotal }: { granttotal: number }) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  // formdata state
  const profile = useSelector((state: RootState) => state.profile.profile?.id)
  const adress = useSelector((state: RootState) => state.profile.profile?.addresses)

  // cities

  const citys = Array.from(
    new Set(adress?.map((i) => i.city?.trim().toLowerCase()).filter((c) => c))
  )
  // streets
  const streets = Array.from(
    new Set(adress?.map((i) => i.street?.trim().toLowerCase()).filter((c) => c))
  )
  // countrys
  const countrys = Array.from(
    new Set(adress?.map((i) => i.country?.trim().toLowerCase()).filter((c) => c))
  )

  // myphone

  const myphone = useSelector((state: RootState) => state.profile.profile?.phone_num)

  // formdata
  const [formdata, setformdata] = useState({
    profile: profile || 0,
    city: '',
    street: '',
    country: '',
    phone: '',
    is_cashon: false,
    amount: granttotal
  })
  // loading
  const [Loading, setLoading] = useState<boolean>(false)
  // handle change function
  const handlechange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.value
    if (name == 'phone') {
      setformdata((data) => ({
        ...data,
        [name]: value
          .split('')
          .filter((i) => /[0-9\+]/.test(i))
          .join('')
      }))
      return
    }
    setformdata((data) => ({ ...data, [name]: value }))
  }

  // handle submit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formdata)
    console.log('form submit')
    try {
      setLoading(true)
      const res = await api.post('http://127.0.0.1:8000/api/stripe-checkout/2/')
      const data = await res.data
      router.push(data.url)
    } catch (err) {
      toast(String(err), {
        action: { label: 'Undo', onClick: () => console.log('Undo') }
      })
    }
  }
  useEffect(() => {
    console.log(citys)
    console.log(myphone)
  })
  return (
    <Dialog>
      <DialogTrigger asChild className="flex justify-center items-center w-full">
        <Button
          className="w-full bg-primary cursor-pointer h-12 text-size3 text-white tracking-wider"
          size={'default'}
          onClick={() => {
            if (!(granttotal > 0)) {
              toast('Please select your cart item at first', {
                description:
                  'If you add to cart any product but do not cheaked it.that case you cannot purchace it'
              })
              return
            }
          }}
        >
          CHECKOUT NOW
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          {/* DialogHeader */}
          <DialogHeader className="mb-2">
            <DialogTitle>Place Order</DialogTitle>
            <DialogDescription>
              Place a new Order make sure you select atlist one item from cart.Click{' '}
              <span className="text-green-500 font-bold">Pay now or Cash on delivery</span> button
              when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">City</Label>
              <Input
                value={formdata.city || ''}
                name="city"
                required
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="write city"
                onChange={handlechange}
                type="text"
                list="citys"
              />
              {citys && (
                <datalist id="citys">
                  {citys.map((c, idx) => (
                    <option key={idx} value={c} />
                  ))}
                </datalist>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Street</Label>
              <Input
                value={formdata.street || ''}
                name="street"
                required
                list="streets"
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="write street"
                onChange={handlechange}
                type="text"
              />
              {streets && (
                <datalist id="streets">
                  {streets.map((c, idx) => (
                    <option key={idx} value={c} />
                  ))}
                </datalist>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Country</Label>
              <Input
                value={formdata.country || ''}
                name="country"
                list="countries"
                required
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="write country"
                onChange={handlechange}
                type="text"
              />
              {countrys && (
                <datalist id="countries">
                  {countrys.map((c, idx) => (
                    <option key={idx} value={c} />
                  ))}
                </datalist>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Phone number</Label>
              <Input
                value={formdata.phone || ''}
                name="phone"
                list="number"
                required
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="Enter phone number"
                onChange={handlechange}
                type="text"
              />
              <datalist id="number">
                <option value={myphone || '01*********'}></option>
              </datalist>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Select Payment Method</Label>
              <RadioGroup defaultValue={formdata.is_cashon ? 'Cash_on_delivery' : 'Online_payment'}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Online_payment"
                    id="Online_payment"
                    className="cursor-pointer"
                    onClick={() => setformdata((data) => ({ ...data, is_cashon: false }))}
                  />
                  <Label htmlFor="Online_payment" className="cursor-pointer">
                    Online Payment
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Cash_on_delivery"
                    className="cursor-pointer"
                    id="Cash_on_delivery"
                    onClick={() => setformdata((data) => ({ ...data, is_cashon: true }))}
                  />
                  <Label htmlFor="Cash_on_delivery" className="cursor-pointer">
                    Cash on Delivery
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
              {Loading ? 'Loading...' : formdata.is_cashon ? 'Cash on delivery' : 'Pay now'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
