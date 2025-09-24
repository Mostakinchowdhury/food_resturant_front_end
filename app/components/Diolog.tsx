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
import { AppDispatch, RootState } from '@/lib/configstore'
import { createadress, fetchprofile } from '@/lib/profileslice'
import { formdata_create_adress } from '@/type/editprofiletype'
import countries from '@/utils/countrylist'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { IoCreate } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

export function Add_adress_Dialog() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  // formdata state
  const profile = useSelector((state: RootState) => state.profile.profile?.id)
  const adress = useSelector((state: RootState) => state.profile.profile?.addresses)
  const [formdata, setformdata] = useState<formdata_create_adress>({
    profile: profile || 0,
    city: '',
    street: '',
    country: ''
  })

  // handle change function
  const handlechange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    const value = e.target.value
    setformdata((data) => ({ ...data, [name]: value }))
  }

  // handle submit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formdata)
    console.log('form submit')
    if ((adress?.length || 0) >= 3) {
      toast('you have already 3 address', {
        action: { label: 'Undo', onClick: () => console.log('Undo') }
      })
      return
    }
    try {
      await dispatch(createadress(formdata)).unwrap()
      await dispatch(fetchprofile())
      toast('New address created successfully', {
        action: { label: 'Undo', onClick: () => console.log('Undo') }
      })
      router.push('/profile')
    } catch (err) {
      toast(String(err), {
        action: { label: 'Undo', onClick: () => console.log('Undo') }
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="flex justify-center items-center w-full">
        <Button className="cursor-pointer w-fit flex items-center mx-auto  text-white" size={'xlg'}>
          <span>
            <IoCreate />
          </span>{' '}
          Create New Address
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-2">
            <DialogTitle>Create adress</DialogTitle>
            <DialogDescription>
              Create a new adress make sure
              <span className="text-red-600 font-bold"> you can create maximum 3 address</span> for
              cheakout set up quickly . Click Create now button when you&apos;re done.
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
                placeholder="write your city"
                onChange={handlechange}
                type="text"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Street</Label>
              <Input
                value={formdata.street || ''}
                name="street"
                required
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="write your street"
                onChange={handlechange}
                type="text"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Country</Label>
              <Input
                value={formdata.country || ''}
                name="country"
                list="countries"
                required
                className="border-primary text-size2 focus-visible:ring-0 notudbtn w-full"
                placeholder="Update your country"
                onChange={handlechange}
                type="text"
              />
              <datalist id="countries">
                <datalist id="countries">
                  {countries.map((c, idx) => (
                    <option key={idx} value={c} />
                  ))}
                </datalist>
              </datalist>
            </div>
          </div>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
              Create now
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
