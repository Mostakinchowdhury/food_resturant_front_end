'use client'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { logout } from '@/lib/authcreateslice'
import { RootState } from '@/lib/configstore'
import { menu } from '@/type/home'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaChevronRight } from 'react-icons/fa'
import { FaLocationDot, FaTruckPickup } from 'react-icons/fa6'
import { IoIosCloseCircle, IoIosHome } from 'react-icons/io'
import { IoLogIn, IoLogOut } from 'react-icons/io5'

import { clearCart } from '@/lib/cartslice'
import { clearprofile } from '@/lib/profileslice'
import { clearsetting } from '@/lib/settingslice'
import { clearuser } from '@/lib/userslice'
import { LuSquareMenu } from 'react-icons/lu'
import { MdLocalOffer } from 'react-icons/md'
import { RiEBike2Fill } from 'react-icons/ri'
import { SiShopee } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { poppins } from './Navbar'

const Foldnav = ({ cls }: menu) => {
  const alladdress = useSelector((state: RootState) => state.profile.profile?.addresses)
  const add2 = alladdress?.at(0)
  const adress = add2 ? `${add2?.city},${add2?.street},${add2?.country}` : 'Not set'
  const total_price = useSelector((state: RootState) => state.cart.cart?.total_price)
  const total_quantity = useSelector((state: RootState) => state.cart.cart?.total_quantity)
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()
  const pathname = usePathname()
  const profileimg =
    useSelector((state: RootState) => state.profile.profile?.profile_imag) ||
    '/deafaltprofile_square.jpg'
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  return (
    <>
      <div className={`${cls} fullbg flex  items-center ${poppins.className}`}>
        <div className="p-4 grow">
          <Link href={'/'}>
            <Image src={'/logo.png'} alt="logo" width={154} height={38} />
          </Link>
        </div>
        <Sheet>
          <SheetContent className="h-full">
            <SheetHeader className="h-full">
              <SheetTitle className="hidden">Menu</SheetTitle>
              {/* sheet close */}
              <SheetClose asChild>
                <button className="p-4 absolute top-2 left-2 cursor-pointer active:border-o active:outline-0 focus:outline-0 outline-0">
                  <IoIosCloseCircle size={32} />
                </button>
              </SheetClose>
              <SheetDescription className="py-16 h-full">
                <nav className="flexcontainer list-none h-full">
                  <ul className="space-y-6 flex flex-col h-full w-full">
                    <li className="flexcontainer items-center mb-8">
                      <Link href="/" className={`${poppins.className} navlink `}>
                        <Image
                          src="/logo.png"
                          alt="app logo"
                          width={215}
                          height={53}
                          className="max-w-full"
                        />
                      </Link>
                    </li>
                    <li className="flexcontainer items-center">
                      <Link
                        href="/"
                        className={`${
                          poppins.className
                        } navlink flex items-center justify-between w-full max-w-3/4 px-3 ${
                          pathname === '/' ? 'bg-primary text-bg1' : 'bg-gray-300'
                        }`}
                      >
                        <IoIosHome size={25} className="block" />
                        <p>Home</p>
                        <FaChevronRight className="block" />
                      </Link>
                    </li>
                    <li className="flexcontainer items-center">
                      <Link
                        href="/menu"
                        className={`${
                          poppins.className
                        }  flex items-center justify-between w-full gap-2 max-w-3/4 px-3 ${
                          pathname === '/menu' ? 'bg-primary text-bg1' : 'bg-gray-300'
                        }  navlink`}
                      >
                        <LuSquareMenu size={25} className="block" />
                        <p>Browse Menu</p>
                        <FaChevronRight className="block" />
                      </Link>
                    </li>
                    <li className="flexcontainer items-center">
                      <Link
                        href="/specialoffers"
                        className={`${
                          poppins.className
                        } navlink  flex items-center justify-between w-full max-w-3/4 px-3 ${
                          pathname === '/specialoffers' ? 'bg-primary text-bg1' : 'bg-gray-300'
                        }`}
                      >
                        <MdLocalOffer size={25} className="block" />
                        <p>Special Offers</p>
                        <FaChevronRight className="block" />
                      </Link>
                    </li>
                    <li className="flexcontainer items-center">
                      <Link
                        href="/shops"
                        className={`${
                          poppins.className
                        } navlink  flex items-center justify-between w-full max-w-3/4 px-3 ${
                          pathname === '/shops' ? 'bg-primary text-bg1' : 'bg-gray-300'
                        }`}
                      >
                        <SiShopee size={25} className="block" />
                        <p>Shops</p>
                        <FaChevronRight className="block" />
                      </Link>
                    </li>
                    <li className="flexcontainer items-center">
                      <Link
                        href="/riders"
                        className={`${
                          poppins.className
                        } navlink  flex items-center justify-between w-full max-w-3/4 px-3 ${
                          pathname === '/riders' ? 'bg-primary text-bg1' : 'bg-gray-300'
                        }`}
                      >
                        <RiEBike2Fill size={25} className="block" />
                        <p>Delivery Riders</p>
                        <FaChevronRight className="block" />
                      </Link>
                    </li>
                    <li className="flexcontainer items-center">
                      <Link
                        href="/orders"
                        className={`${
                          poppins.className
                        } navlink  flex items-center justify-between w-full max-w-3/4 px-3 ${
                          pathname === '/orders' ? 'bg-primary text-bg1' : 'bg-gray-300'
                        }`}
                      >
                        <FaTruckPickup size={25} className="block" />
                        <p>Track Order</p>
                        <FaChevronRight className="block" />
                      </Link>
                    </li>
                  </ul>
                  <li className="flexcontainer items-center">
                    <Link href={'/sign'}>
                      <Button
                        variant={'destructive'}
                        className={`${
                          poppins.className
                        } navlink  flex items-center justify-between w-full ${
                          pathname === '/sign' ? 'bg-primary text-txt2' : ''
                        } cursor-pointer`}
                        onClick={() => {
                          if (isAuthenticated) {
                            dispatch(logout())
                            dispatch(clearprofile())
                            dispatch(clearuser())
                            dispatch(clearCart())
                            dispatch(clearsetting())
                          }
                        }}
                      >
                        {isAuthenticated ? (
                          <IoLogOut size={25} className="block" />
                        ) : (
                          <IoLogIn size={25} className="block" />
                        )}
                        {isAuthenticated ? <p>Logout</p> : <p>Login/SignUp</p>}
                      </Button>
                    </Link>
                  </li>
                </nav>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>

          <SheetTrigger className="cursor-pointer active:border-o active:outline-0 focus:outline-0 outline-0 focus-visible:ring-0 focus-visible:outline-0 focus-visible:border-0">
            <div className="p-4 cursor-pointer focus:outline-0 outline-0 active:outline-0">
              <Image src={'/Menu.png'} alt="menu" width={65} height={65} />
            </div>
          </SheetTrigger>
        </Sheet>
      </div>
      {/* GBP Part */}
      <div className={`fullcontainer h-[77px] -mt-10 flex just ${poppins.className} lg:hidden`}>
        <div className="bg-primary justify-items-start p-4 items-center grow">
          <div className="flex gap-4 items-center ">
            <Link href={'/profile'}>
              <Image
                src={profileimg}
                alt="aycan"
                width={44}
                height={44}
                className="rounded-full border-2 border-accent size-11 object-cover"
              />
            </Link>
            <p className="font-semibold text-size1 text-white">
              {user?.first_name ? `${user.first_name} ${user.last_name}` : 'Username'}
            </p>
          </div>
        </div>
        <div className="bg-accent justify-items-start p-4 items-center grow">
          <div className="flex gap-5 items-center">
            <div className="relative p-1">
              <Link href={'/cart'}>
                <Image src={'/Shopping Basket.png'} alt="aycan" width={44} height={44} />
              </Link>
              <div className="absolute top-[-6px] right-[-6px] rounded-full w-6 h-6 bg-primary flex justify-center items-center text-sizehalf border-[1px] px-2 text-white">
                {total_quantity || 0}
              </div>
            </div>
            <p className="font-semibold text-size2 text-white">GBP {total_price || 0}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-end lg:hidden">
        <FaLocationDot size={25} />
        <p className="font-normal text-size1 text-txt">{adress}</p>
      </div>
    </>
  )
}

export default Foldnav
