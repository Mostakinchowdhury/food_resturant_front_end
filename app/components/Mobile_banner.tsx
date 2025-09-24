import Mobilesubscriber from './Mobilesubscriber'
const Mobile_banner = () => {
  return (
    <div className=" h-[283px] banner relative rounded-2xl flex flex-col justify-center items-center lg:hidden ">
      <p className="font-normal text-size0 text-white">
        Order Restaurant food, takeaway and groceries.
      </p>
      <h2 className="font-semibold text-[34px] text-white">Feast Your Senses,</h2>
      <h2 className="font-semibold text-[34px] text-primary">Fast and Fresh</h2>
      <Mobilesubscriber />
    </div>
  )
}

export default Mobile_banner
