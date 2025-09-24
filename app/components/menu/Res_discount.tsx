import { discount_data } from '@/lib/resturant_store'
import Image from 'next/image'

const Res_discount = () => {
  return (
    <section className="">
      {/* {.map((item) => (
        <div className=" h-[325px]  overflow-hidden px-" key={item.id}></div>
      ))} */}
      <ul className="flexcontainer lg:overflow-x-auto scroll-hide gap-5 overflow-clip w-full box-border p-2 items-stretch">
        {discount_data.map((item) => (
          <li key={item.id} className="list-none">
            <div
              className="h-[325px] lg:min-w-[496px] w-full pl-6 pb-6 lg:pr-3 pr-5 flex flex-col justify-between items-stretch bg-no-repeat bg-cover bg-center overflow-hidden box-border rounded-xl relative bg-clip-padding"
              style={{ backgroundImage: `url('${item.path}')` }}
            >
              {/* tag segment */}
              <div className="w-full">
                <div className="w-[88px] h-[66px] flex justify-center items-center bg-txt2 rounded-b-2xl ml-auto">
                  <p className="text-white text-size3 font-bold">{item.tag}</p>
                </div>
              </div>

              {/* heading segment */}
              <div className="flex flex-col gap-1.5">
                {/* h4 tag */}
                <h4 className="font-medium text-primary text-size3">{item.p}</h4>
                {/* h3 tag */}
                <h3 className="font-bold text-white text-size4">{item.h}</h3>
              </div>
              {/* plus places */}

              <div className="absolute w-[98px] h-[90px] rounded-tl-4xl bottom-0 right-0 flex justify-center items-center bg-[#FCEEEC]">
                <button className="flex justify-center items-center cursor-pointer outline-0 focus:outline-0 active:outline-0 focus:border-0 active:border-0">
                  <Image src={'/Plus.png'} alt="plus" width={49} height={49} className="block" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Res_discount
