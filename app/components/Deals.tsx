import { deals, deals_nav } from '@/lib/home_store'
import Link from 'next/link'

const Deals = ({ category }: { category: string }) => {
  return (
    <div className="space-y-6">
      {/* navigation section */}
      <section className="lg:flex justify-between items-center hidden">
        {/* title */}
        <h3 className="text-black text-size5 font-bold hidden lg:block">
          Up to -40% 🎊 Order.uk exclusive deals
        </h3>
        {/* navigation */}
        <nav className="flex justify-center items-center gap-4">
          {deals_nav.map((item) => (
            // href="/?category=shoes"
            <Link
              href={`/?category=${encodeURIComponent(item)}`}
              key={item}
              className={`py-2.5 px-4 rounded-3xl ${
                category === item ? 'border-[1px] border-primary' : ''
              }`}
            >
              <p className="font-semibold text-size2 text-black">{item}</p>
            </Link>
          ))}
        </nav>
      </section>
      {/* item section destop part */}
      <section className="hidden overflow-x-auto lg:flex items-center gap-4 ">
        {deals
          .filter((i) => {
            return i.type.toLowerCase() === category.toLowerCase()
          })
          .map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className="h-[325px] w-full pl-6 pb-6 pr-3 flex flex-col justify-between items-stretch bg-no-repeat bg-cover bg-center rounded-lg overflow-hidden box-border"
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
            </Link>
          ))}
      </section>
      {/* item section mobile part */}
      <section className="overflow-x-auto lg:hidden flex items-start gap-3 scroll scroll-hide">
        {deals
          .filter((i) => {
            return i.type.toLowerCase() === category.toLowerCase()
          })
          .map((item) => (
            <div key={item.id}>
              <Link href={item.href} className="h-[150px] w-[150px] block">
                <div
                  className="h-[150px] w-[150px] bg-no-repeat bg-cover bg-center rounded-lg overflow-hidden box-border relative"
                  style={{ backgroundImage: `url(${item.path})` }}
                >
                  <div
                    className="w-[46px] h-[38]
              bg-txt2 flex justify-center items-center absolute top-0 right-3"
                  >
                    <p className="font-bold text-size1 text-white">{item.tag}</p>
                  </div>
                </div>
                {/* tag name */}
              </Link>
              {/* detail's of deal's */}
              <div className="flex flex-col justify-start items-start gap-1.5 pl-3 mt-2">
                <h4 className="font-medium text-primary text-size0">{item.p}</h4>
                <h3 className="font-bold text-size1 text-txt2">{item.h}</h3>
              </div>
            </div>
          ))}
      </section>
    </div>
  )
}

export default Deals
