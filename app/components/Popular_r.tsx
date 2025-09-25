import { pr } from '@/lib/home_store';
import { popular_res } from '@/type/home'
import { Route } from 'next';
import Link from 'next/link';

const Popular_r = () => {

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-size2 text-black md:text-size5">Popular Restaurants</h3>
      {/* mapping with popular resturant */}
      <div className="overflow-x-auto scroll-smooth flex gap-3 scroll-hide w-full px-3">
        {pr.map((item: popular_res) => (
          <Link href={item.href as Route} key={item.id} className={`w-${item.ms[0]}px h-${item.ms[1]}px`}>
            <div
              style={{
                backgroundImage: `url(${item.path})`
              }}
              className="w-[122px] h-[156px] lg:w-[238px] lg:h-[266px] bg-no-repeat bg-center bg-cover"
            ></div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Popular_r
