import { overview } from '@/type/overview'
import axios from 'axios'

const Counterblock = async () => {
  try {
    const response = await axios.get<overview>(`${process.env.OVERVIEW}ov`)
    return (
      <div className="bg-primary h-[750px] lg:h-[158px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 content-center justify-between divide-y-[1px] md:divide-x-[0px] box-border divide-bg5 text-white rounded-2xl px-20 md:divide-y-[0px] md:px-0">
        {/* count box 1 */}
        <div className="flex justify-center lg:gap-8 gap-0 items-center pb-8 md:pb-0">
          <div className="flex-col justify-center items-center flex">
            <p className="font-light text-size8 text-white">{response.data.rider_count + '+'}</p>
            <p className="font-bold text-size4 text-white">Registered Riders</p>
          </div>
          <div className="lg:h-[100px] h-[1px] w-[0px] lg:w-[1px] bg-bg5" />
        </div>

        {/* count box 2 */}
        <div className="flex justify-center  items-center lg:gap-8 gap-0 pb-8 md:pb-0">
          <div className="flex flex-col justify-center items-center">
            <p className="font-light text-size8 text-white">{response.data.order_count}+</p>
            <p className="font-bold text-size4 text-white">Orders Delivered</p>
          </div>
          <div className="lg:h-[100px] h-[0px] w-[0px] lg:w-[1px] bg-bg5" />
        </div>

        {/* count box 3 */}
        <div className="flex justify-center lg:gap-8 gap-0 items-center pb-8 md:pb-0">
          <div className="flex flex-col justify-center items-center">
            <p className="font-light text-size8 text-white">{response.data.partner_count}+</p>
            <p className="font-bold text-size4 text-white">Buesness Partnered</p>
          </div>
          <div className="lg:h-[100px] h-[0px] w-[0px] lg:w-[1px] bg-bg5" />
        </div>

        {/* count box 4 */}
        <div className="flex justify-center items-center flex-col">
          <p className="font-light text-size8 text-white">{response.data.product_count}+</p>
          <p className="font-bold text-size4 text-white">Total Products</p>
        </div>
      </div>
    )
  } catch (err) {
    return (
      <div>
        <h1>Product not found</h1>
        <p>We couldn&apost find the product you were looking for.</p>
        <p className="text-red-500 ">Errors:{JSON.stringify(err)}</p>
      </div>
    )
  }
}

export default Counterblock
