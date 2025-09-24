import { partner } from '@/lib/home_store'
import Link from 'next/link'

const Partnerwithus = () => {
  return (
    <div className="flexcontainer gap-3">
      {partner.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              backgroundImage: `url('${item.path}')`
            }}
            className="h-[220px]  w-full lg:h-[420] bg-no-repeat bg-cover bg-center pl-10 lg:pl-16 flex flex-col justify-between items-start box-border pb-5 lg:pb-10 lg:rounded-2xl rounded-lg"
          >
            <div className="bg-white rounded-b-lg  w-[191px] h-[33px] lg:w-[288px] lg:h-[63px] flex justify-center items-center">
              <p className="font-bold text-size0 text-txt2 lg:text-size3">{item.tag}</p>
            </div>
            {/* downpart */}
            <div className="flexbox-3 items-start">
              {/* h3 */}
              <h3 className="text-size2 lg:text-size3 text-primary font-medium ">{item.p}</h3>
              {/* h2 */}
              <h2 className="text-size2 text-bg1 font-bold lg:text-size6">{item.h}</h2>
              <Link
                href={item.href}
                className="w-[119px] h-[29px] bg-primary rounded-3xl lg:w-[205px] lg:h-[52px] flex justify-center items-center mt-3"
              >
                <p className="font-medium text-xs text-white lg:text-size3 text-center">
                  Get Started
                </p>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Partnerwithus
