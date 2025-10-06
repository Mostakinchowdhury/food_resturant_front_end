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
import { RootState } from '@/lib/configstore'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { BsCartCheckFill } from 'react-icons/bs'
import { FaLocationDot } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { poppins } from './Navbar'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

function Promo() {
  const total_price = useSelector((state: RootState) => state.cart.cart?.total_price)
  const alladdress = useSelector((state: RootState) => state.profile.profile?.addresses)
  const [value, setvalue] = useState<string>(String(alladdress?.at(0)?.id))
  const addressObj = alladdress?.find((itm) => itm.id == parseInt(value))

  const currentadress = addressObj
    ? `${addressObj.city},${addressObj.street},${addressObj.country}`
    : 'Loading...'

  const total_quantity = useSelector((state: RootState) => state.cart.cart?.total_quantity)
  const profileimg =
    useSelector((state: RootState) => state.profile.profile?.profile_imag) ||
    '/deafaltprofile_square.jpg'
  const closeref = useRef<HTMLButtonElement | null>(null)
  const hanlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.setItem('currentadressid', value)
    closeref.current?.click()
  }

  useEffect(() => {
    const cai = localStorage.getItem('currentadressid')
    if (cai) {
      setvalue(cai)
    }
  }, [])

  return (
    <div
      className={`flexcontainer bg-bg2 border-l-[1px] border-b-[1px] border-gray-200 rounded-md box-border pl-4 hidden lg:flex`}
    >
      <div
        className={`flexcontainer gap-0 items-center ${poppins.className} text-txt font-normal text-size1`}
      >
        🌟 Get 50% Off your first order,
        <span className={`${poppins.className} text-primary font-bold text-size1 underline`}>
          Promo: ORDER5
        </span>
      </div>
      <div className="w-22 h-2 bg-transparent"></div>
      <div className={`flexcontainer2`}>
        <FaLocationDot />
        <p className={`${poppins.className} text-txt font-normal text-size1`}>{currentadress}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="cursor-pointer focus-visible:ring-0">
              change location
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] space-y-3">
            <form onSubmit={hanlesubmit} className="space-y-3">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-primary">Change your location</DialogTitle>
                <DialogDescription>
                  Make changes to your current location here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Select value={value} onValueChange={(val) => setvalue(val)}>
                    <SelectTrigger className="w-[180px] focus-visible:ring-0 focus:ring-0 ring-0 outline-0 focus:outline-0 focus-visible:border-0">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent className="focus-visible:ring-0 focus:ring-0 ring-0 outline-0 focus:outline-0 focus-visible:border-0">
                      <SelectGroup>
                        <SelectLabel>location</SelectLabel>
                        {alladdress?.map((itm) => (
                          <SelectItem
                            value={itm.id.toString()}
                            key={itm.id}
                          >{`${itm.city},${itm.street},${itm.country}`}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild className="cursor-pointer">
                  <Button variant="outline" ref={closeref}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-4 bg-accent rounded-2xl">
        <div className="flexcontainer2 gap-0 px-4 py-2 border-r-[1px] border-gray-400">
          <Link href={'/cart'}>
            <BsCartCheckFill size={44} color="#fff" />
          </Link>
        </div>
        <div className="flexcontainer2 gap-0 px-4 py-2 font-semibold text-size2 text-bg1 border-r-[1px] border-gray-400">
          {total_quantity || 0} items
        </div>
        <div className="flexcontainer2 gap-0 px-4 py-2 font-semibold text-size2 text-bg1 border-r-[1px] border-gray-400">
          {total_price || 0} GBP
        </div>
        <div className="flexcontainer2 gap-0 px-4 py-2 border-r-[1px] border-transparent">
          <Link href={'/profile'}>
            <Image
              src={profileimg}
              width={40}
              height={40}
              alt="user pic"
              className="cursor-pointer rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Promo
