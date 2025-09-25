import { popular_category } from '@/lib/home_store'
import { Route } from 'next'
import Link from 'next/link'

const P_category = () => {
  return (
    <div className="space-y-6">
      {/* section title */}
      <h3 className="font-bold text-txt text-size2 lg:text-size5">
        Order.Uk’s Popular Categories <span className="hidden lg:inline">🤩</span>
      </h3>
      {/* foods container */}
      <section className="gridbox1">
        {popular_category.map((item) => (
          <div key={item.id} className="rounded-2xl overflow-hidden">
            {/* food img */}
            <Link href={item.href as Route}>
              <div
                style={{
                  backgroundImage: `url('${item.path}')`
                }}
                className="bg-no-repeat bg-center bg-cover w-full h-[161px] lg:[203px]"
              />
            </Link>
            {/* food detail */}
            <div className="bg-txt2 lg:py-4 py-3 px-4 lg:px-5 flex flex-col items-start justify-center gap-1">
              <h3 className="font-bold text-primary text-size0 md:text-size3">{item.name}</h3>
              <h4 className="font-normal text-size0 text-white md:">{item.resturant}</h4>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default P_category
