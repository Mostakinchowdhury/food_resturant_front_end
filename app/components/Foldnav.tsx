'use client'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet'
import { logout } from '@/lib/authcreateslice'
import { RootState } from '@/lib/configstore'
import { menu } from '@/type/home'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaLocationDot } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { poppins } from './Navbar'

const Foldnav = ({ cls, action }: menu) => {
  const handleactive = () => {
    action((pre: boolean) => !pre)
  }
  const total_price = useSelector((state: RootState) => state.cart.cart?.total_price)
  const total_quantity = useSelector((state: RootState) => state.cart.cart?.total_quantity)
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()
  const pathname = usePathname()
  const profileimg =
    useSelector((state: RootState) => state.profile.profile?.profile_image) ||
    '/deafaltprofile_square.jpg'
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  return (
    <>
      <div className={`${cls} fullbg flex  items-center ${poppins.className}`}>
        <div className="p-4 grow">
          <Image src={'/logo.png'} alt="logo" width={154} height={38} />
        </div>
        <Sheet>
          <SheetContent>
            <SheetHeader>
              <SheetDescription className="py-12">
                <nav className="flexcontainer list-none space-y-4">
                  <li className="flexcontainer items-center">
                    <Link
                      href="/"
                      className={`${poppins.className} navlink ${
                        pathname === '/' ? 'bg-primary text-bg1' : ''
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="flexcontainer items-center">
                    <Link
                      href="/menu"
                      className={`${poppins.className} ${
                        pathname === '/menu' ? 'bg-primary text-bg1' : ''
                      }  navlink`}
                    >
                      {' '}
                      Browse Menu{' '}
                    </Link>
                  </li>
                  <li className="flexcontainer items-center">
                    <Link
                      href="/specialoffers"
                      className={`${poppins.className} navlink ${
                        pathname === '/specialoffers' ? 'bg-primary text-bg1' : ''
                      }`}
                    >
                      {' '}
                      Special Offers
                    </Link>
                  </li>
                  <li className="flexcontainer items-center">
                    <Link
                      href="/resturant"
                      className={`${poppins.className} navlink ${
                        pathname === '/restaurants' ? 'bg-primary text-bg1' : ''
                      }`}
                    >
                      Restaurants
                    </Link>
                  </li>
                  <li className="flexcontainer items-center">
                    <Link
                      href="/orders"
                      className={`${poppins.className} navlink ${
                        pathname === '/orders' ? 'bg-primary text-bg1' : ''
                      }`}
                    >
                      Track Order
                    </Link>
                  </li>
                  <li className="flexcontainer items-center">
                    <Link href={'/sign'}>
                      <Button
                        variant={'outline'}
                        className={`${poppins.className} navlink ${
                          pathname === '/sign' ? 'bg-primary text-txt2' : ''
                        } cursor-pointer`}
                        onClick={() => {
                          if (isAuthenticated) {
                            dispatch(logout())
                          }
                        }}
                      >
                        {isAuthenticated ? 'Logout' : 'Login/SignUp'}
                      </Button>
                    </Link>
                  </li>
                </nav>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>

          <SheetTrigger className="cursor-pointer">
            <div
              onClick={handleactive}
              className="p-4 cursor-pointer focus:outline-0 outline-0 active:outline-0"
            >
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
                className="rounded-full border-2 border-accent"
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
        <p className="font-normal text-size1 text-txt">Lution Street, N4G-00....</p>
      </div>
    </>
  )
}

export default Foldnav
