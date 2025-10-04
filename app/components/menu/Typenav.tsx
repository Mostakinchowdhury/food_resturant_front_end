'use client'
import { res_nav } from '@/lib/resturant_store'
import { SuperCategory } from '@/type/item'
import axios from 'axios'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { toast } from 'sonner'
import LoadingLoader from '../Loader'

const Typenav = () => {
  //
  const [loading, setloading] = useState<boolean>(true)
  const [supercategories, setsupercategories] = useState<SuperCategory[]>([])
  const domrefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
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

  const fetchsupercaategory = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}supercategories/`)
      if (response.status === 200) {
        setsupercategories(response.data)
        setloading(false)
      } else {
        setloading(false)
        toast(`Failed to load categories`, {
          style: { background: 'red', color: 'white' },
          action: { label: 'Retry', onClick: fetchsupercaategory }
        })
      }
    } catch (error) {
      setloading(false)
      toast(`${error as string} Failed to load categories`, {
        style: { background: 'red', color: 'white' },
        action: { label: 'Retry', onClick: fetchsupercaategory }
      })
    }
  }, [])
  useEffect(() => {
    fetchsupercaategory()
  }, [fetchsupercaategory])
  if (loading) {
    return <LoadingLoader text="FETCHING..." />
  }
  return (
    <section className="flex bg-primary fullbg py-4 flex-row overflow-x-auto px-3 box-content items-center gap-2 lg:gap-3.5 scroll-hide">
      <Link className="font-bold text-xl text-white flex items-center gap-2" href="/menu">
        <p>All</p>
      </Link>
      {supercategories.map((item) => (
        <div
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
          <div className="font-bold text-xl text-white flex items-center gap-2">
            <p>{item.title}</p>
            {item.title == 'All' ? (
              ''
            ) : openlist[item.id.toString()] ? (
              <FaChevronUp size={16} className="block" />
            ) : (
              <FaChevronDown size={16} className="block" />
            )}
          </div>
          {item.title != 'All' &&
            openlist[item.id.toString()] &&
            typeof window !== 'undefined' &&
            createPortal(
              <ol
                className={`bg-black text-white px-3 py-2 rounded-lg space-y-1.5 font-medium text-size0 sm:text-size1 md:text-size2 lg:text-size3 absolute top-full left-0 z-[9999]`}
                style={{
                  position: 'fixed',
                  top: dropdownPos.top,
                  left: dropdownPos.left
                }}
              >
                {item.category.length < 1 ? (
                  <li>No category found</li>
                ) : (
                  item.category.map((cat) => (
                    <li className="hover:text-primary cursor-pointer" key={cat.id}>
                      <Link href={`/menu?category=${encodeURIComponent(cat.name)}`}>
                        {cat.name}
                      </Link>
                    </li>
                  ))
                )}
              </ol>,
              document.body
            )}
        </div>
      ))}
    </section>
  )
}

export default Typenav
