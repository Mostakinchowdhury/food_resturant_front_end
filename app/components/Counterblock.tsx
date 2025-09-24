const Counterblock = () => {
  return (
    <div className="bg-primary h-[750px] lg:h-[158px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 content-center justify-between divide-y-[1px] md:divide-x-[0px] box-border divide-bg5 text-white rounded-2xl px-20 md:divide-y-[0px] md:px-0">
      {/* count box 1 */}
      <div className="flex justify-center lg:gap-8 gap-0 items-center pb-8 md:pb-0">
        <div className="flex-col justify-center items-center flex">
          <p className="font-light text-size8 text-white">546+</p>
          <p className="font-bold text-size4 text-white">Registered Riders</p>
        </div>
        <div className="lg:h-[100px] h-[1px] w-[0px] lg:w-[1px] bg-bg5" />
      </div>

      {/* count box 2 */}
      <div className="flex justify-center  items-center lg:gap-8 gap-0 pb-8 md:pb-0">
        <div className="flex flex-col justify-center items-center">
          <p className="font-light text-size8 text-white">789,900+</p>
          <p className="font-bold text-size4 text-white">Orders Delivered</p>
        </div>
        <div className="lg:h-[100px] h-[0px] w-[0px] lg:w-[1px] bg-bg5" />
      </div>

      {/* count box 3 */}
      <div className="flex justify-center lg:gap-8 gap-0 items-center pb-8 md:pb-0">
        <div className="flex flex-col justify-center items-center">
          <p className="font-light text-size8 text-white">690+</p>
          <p className="font-bold text-size4 text-white">Restaurants Partnered</p>
        </div>
        <div className="lg:h-[100px] h-[0px] w-[0px] lg:w-[1px] bg-bg5" />
      </div>

      {/* count box 4 */}
      <div className="flex justify-center items-center flex-col">
        <p className="font-light text-size8 text-white">17,457+</p>
        <p className="font-bold text-size4 text-white">Food items</p>
      </div>
    </div>
  )
}

export default Counterblock
