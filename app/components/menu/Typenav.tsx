'use client'
import { res_nav } from '@/lib/resturant_store'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Typenav = ({ category }: { category: string }) => {
  //
  const domrefs = useRef<{ [key: number]: HTMLLIElement | null }>({})
  const [openlist, setopenlist] = useState<{ [key: string]: boolean }>({})
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const handlerect = (id: number) => {
    const node = domrefs.current[id]
    if (node) {
      const rect = node.getBoundingClientRect()
      setDropdownPos({ top: rect.bottom, left: rect.left })
    }
  }

  useEffect(() => {
    const result = res_nav.reduce((acc: { [key: string]: boolean }, item) => {
      acc[item.id.toString()] = false
      return acc
    }, {})
    setopenlist(result)
    console.log(JSON.stringify(result))
  }, [])
  const handletoggle = (id: number) => {
    const ins = { ...openlist }
    for (const key in ins) {
      ins[key] = false
    }

    ins[id.toString()] = !openlist[id.toString()]
    setopenlist(ins)
  }

  return (
    <section className="flex bg-primary fullbg py-4 flex-row overflow-x-auto px-3 box-content items-center gap-2 lg:gap-3.5 scroll-hide">
      {res_nav.map((item) => (
        <li
          key={item.id}
          className={`list-none py-1.5 px-4 rounded-3xl shrink-0 relative`}
          onClick={() => {
            handletoggle(item.id)
            handlerect(item.id)
          }}
          onMouseEnter={() => {
            handletoggle(item.id)
            handlerect(item.id)
          }}
          onMouseLeave={() => handletoggle(item.id)}
          ref={(elm) => {
            domrefs.current[item.id] = elm
          }}
        >
          <Link
            href={
              item.title != 'All' ? `/menu?category=${encodeURIComponent(item.title)}` : '/menu'
            }
            className="font-bold text-xl text-white flex items-center gap-2"
          >
            <p>{item.title}</p>
            {item.title == 'All' ? (
              ''
            ) : openlist[item.id.toString()] ? (
              <FaChevronUp size={16} className="block" />
            ) : (
              <FaChevronDown size={16} className="block" />
            )}
          </Link>
          {item.title != 'All' &&
            openlist[item.id.toString()] &&
            createPortal(
              <ol
                className={`bg-black text-white px-3 py-2 rounded-lg space-y-1.5 font-medium text-size0 sm:text-size1 md:text-size2 lg:text-size3 absolute top-full left-0 z-[9999]`}
                style={{
                  position: 'fixed',
                  top: dropdownPos.top,
                  left: dropdownPos.left
                }}
              >
                <li className="hover:text-primary cursor-pointer">Smart Watch</li>
                <li className="hover:text-primary cursor-pointer">Wall TV</li>
                <li className="hover:text-primary cursor-pointer">Smart phone</li>
                <li className="hover:text-primary cursor-pointer">Frizz</li>
              </ol>,
              document.body
            )}
        </li>
      ))}
    </section>
  )
}

export default Typenav
