'use client'
import { logout } from '@/lib/authcreateslice'
import { RootState } from '@/lib/configstore'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IoExit } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import Foldnav from './Foldnav'
import { Button } from './ui/button'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap'
})

function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const [active, setisactive] = useState<boolean>(false)
  return (
    <>
      <header className="lg:flexcontainer hidden lg:flex">
        <Image src="/logo.png" alt="app logo" width={215} height={53} />
        <div className="w-22 h-2 bg-transparent"></div>
        <nav className="flexcontainer list-none">
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
          {/* <li className="flexcontainer items-center">
            <Link
              href="/resturant"
              className={`${poppins.className} navlink ${
                pathname === '/restaurants' ? 'bg-primary text-bg1' : ''
              }`}
            >
              Restaurants
            </Link>
          </li> */}
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
        </nav>
        <Link href={'/sign'} className="flex items-center">
          <Button
            variant={'ghost'}
            size={'lg'}
            className={`${poppins.className} navlink ${
              pathname === '/sign' ? 'bg-primary text-white' : ''
            } cursor-pointer flex justify-center items-center text-size3 bg-accent font-semibold text-white hover:text-gray-300`}
            onClick={() => {
              if (isAuthenticated) {
                dispatch(logout())
              }
            }}
          >
            {' '}
            {!isAuthenticated ? <FaUserCircle /> : <IoExit />}
            {isAuthenticated ? 'Logout' : 'Login/SignUp'}
          </Button>
        </Link>
      </header>
      <Foldnav cls="divide-x-[2px]  divide-black lg:hidden" action={setisactive} />
    </>
  )
}

export default Navbar
