import { poppins } from '@/components/Navbar'
import Subscriberform from './Subscriberform'
const Banner = () => {
  return (
    <div
      className={`h-[600px] bg-[url('/banner.png')] bg-no-repeat bg-cover bg-center relative ${poppins.className} pl-11 lg:flex items-center justify-start hidden`}
    >
      <div className="flex justify-center flex-col">
        <p className="text-white font-normal text-size2">
          Order Restaurant food, takeaway and groceries.
        </p>
        <h2 className="text-white font-bold text-size7">Feast Your Senses,</h2>
        <h2 className="text-primary font-bold text-size7">Fast and Fresh</h2>
        {/* <----form----> */}
        <Subscriberform />
        {/* <----form----> */}
      </div>
      {/* shap */}
      <div
        className={`bg-[url('/shape1.png')] bg-no-repeat bg-cover bg-center absolute h-[560px] bottom-0 right-0 w-[620px]`}
      ></div>
      {/* * banner_man */}
      <div
        className={`bg-[url('/banner_man.png')] bg-no-repeat bg-cover bg-center absolute h-[537px] bottom-0 left-1/2 -translate-x-[500px] w-[805px]`}
      ></div>

      {/* banner_man_frond */}

      <div
        className={`bg-[url('/banner_man_frond.png')] bg-no-repeat bg-cover bg-center absolute h-[541px] bottom-0 left-1/2 -translate-x-[160px] w-[465px]`}
      ></div>
      {/* flash messages */}
      {/* flash msg 1 */}
      <div
        className={`absolute h-[127px] top-24 right-24 w-[390px] bg-flash1 flexbox-2 box-border pt-[50px] pl-8`}
      >
        <p className="text-size0 font-semibold text-txt">We’ve Received your order!</p>
        <p className="text-size0 font-normal text-txt">Awaiting Restaurant acceptance </p>
      </div>
      {/* flash msg 2 */}
      <div
        className={`absolute h-[127px] top-[255px] right-0 w-[390px] bg-flash2 flexbox-2 box-border pt-[50px] pl-8`}
      >
        <p className="text-size0 font-semibold text-txt">Order Accepted! ✅</p>
        <p className="text-size0 font-normal text-txt">Your order will be delivered shortly </p>
      </div>
      {/* flash msg 3 */}
      <div
        className={`absolute h-[127px] top-[405px] right-12 w-[390px] bg-flash3 flexbox-2 box-border pt-[50px] pl-8`}
      ></div>
    </div>
  )
}
export default Banner
