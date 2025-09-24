import Image from 'next/image'
import Link from 'next/link'
import { poppins } from './Navbar'
import Social from './Social'
import Subscribeform from './Subscribeform'
const Footer = () => {
  return (
    <div className={`lg:h-[440px] h-auto bg-bg3 box-content fullbg ${poppins.className} `}>
      {/* top side */}
      <section
        className={`flexcontainer lg:h-[367px] fullbg bg-bg3 h-[950px] gap-10 p-14 box-content justify-between items-start lg:items-center lg:py-0`}
      >
        {/* box1 */}
        <div className="flexbox-3 lg:items-start space-y-4 items-center mx-auto">
          {/* site logo */}
          <Image src={'/logo.png'} alt="site logo" width={268} height={66} />
          {/* apk store */}
          <div className="grid grid-cols-2 justify-center content-start space-x-1">
            <a href="#" download={'orderUK_ios.apk'}>
              <Image src={'/appstore.png'} alt="appstore" width={180} height={53} />
            </a>
            <a href="#" download={'orderUK_anddroid.apk'}>
              <Image src={'/playstore.png'} alt="playstore" width={180} height={53} />
            </a>
          </div>
          {/* txt part */}
          <div className="font-normal text-size1 text-txt">
            Company # 490039-445, Registered with <br />
            House of companies.
          </div>
        </div>
        {/* box2 */}
        <div className="flexbox-3 lg:items-start space-y-3 items-center mx-auto">
          <p className="text-size3 font-bold text-txt2">Get Exclusive Deals in your Inbox</p>
          {/* form */}
          <Subscribeform />
          {/* social icon */}
          <Social />
        </div>
        {/* box3 */}
        <div className="flexbox-3 items-start space-y-3">
          <p className="text-size3 font-bold text-txt2">Legal Pages</p>
          <div className="flexbox-3 items-start space-y-3">
            <Link href={'/terms_and_conditions'}>
              <p className="font-normal text-size1 text-txt underline">Terms and conditions</p>
            </Link>
            <Link href={'/privacy'}>
              <p className="font-normal text-size1 text-txt underline">Privacy</p>
            </Link>
            <Link href={'/cookies'}>
              <p className="font-normal text-size1 text-txt underline">Cookies</p>
            </Link>
            <Link href={'/modern_slavery_statement'}>
              <p className="font-normal text-size1 text-txt underline">Modern Slavery Statement</p>
            </Link>
          </div>
        </div>
        {/* box4 */}
        <div className="flexbox-3 items-start space-y-3">
          <p className="text-size3 font-bold text-txt2">Important Links</p>
          <div className="flexbox-3 items-start space-y-3">
            <Link href={'/get_help'}>
              <p className="font-normal text-size1 text-txt underline">Get help</p>
            </Link>
            <Link href={'#'}>
              <p className="font-normal text-size1 text-txt underline">Add your restaurant</p>
            </Link>
            <Link href={'#'}>
              <p className="font-normal text-size1 text-txt underline">Sign up to deliver</p>
            </Link>
            <Link href={'#'}>
              <p className="font-normal text-size1 text-txt underline">Create a business account</p>
            </Link>
          </div>
        </div>
      </section>
      {/* bottom */}
      <section className="flexcontainer lg:h-[73px] bg-txt2 fullbg justify-center h-[83px] lg:justify-between">
        <p className="text-size1 font-normal text-white">
          Order.uk Copyright 2024, All Rights Reserved.
        </p>
        <div className="flex items-center gap-2.5">
          <Link href={'https://www.facebook.com/mostakin.chowdhury.58'}>
            <Image
              src={'/mypic.jpg'}
              width={35}
              height={35}
              alt="developer photo"
              className="object-cover rounded-full border-2 border-accent"
            />
          </Link>
          <p className="text-size1 font-normal text-white">Developed by Mostakin Chowdhury</p>
        </div>
        <div className="space-x-3.5 flexcontainer lg:flex hidden">
          <Link href={'/privacy'}>
            <p className="text-size1 font-normal text-white">Privacy Policy</p>
          </Link>
          <Link href={'/terms_and_conditions'}>
            <p className="text-size1 font-normal text-white">Terms</p>
          </Link>
          <Link href={'#'}>
            {' '}
            <p className="text-size1 font-normal text-white">Pricing</p>
          </Link>
          <Link href={'#'}>
            <p className="text-size1 font-normal text-white">
              Do not sell or share my personal information
            </p>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Footer
