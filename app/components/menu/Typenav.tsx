import { res_nav } from '@/lib/resturant_store'
import Link from 'next/link'

const Typenav = ({ category }: { category: string }) => {
  //
  return (
    <section className="flexcontainer hidden md:flex bg-primary fullbg py-4">
      {res_nav.map((item) => (
        <li
          key={item.id}
          className={`list-none py-1.5 px-4 rounded-3xl ${
            item.title.toLowerCase() === category.toLowerCase() ? 'bg-txt2' : ''
          }`}
        >
          <Link
            href={
              item.title != 'All' ? `/menu?category=${encodeURIComponent(item.title)}` : '/menu'
            }
            className="font-bold text-xl text-white"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </section>
  )
}

export default Typenav
