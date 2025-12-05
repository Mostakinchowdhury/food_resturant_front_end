'use client'
import { CategoryResponse, Offer, OfferResponse } from '@/type/fetchoc'
import axios from 'axios'
import { Route } from 'next'
import Link from 'next/link'
import React, { useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import Blurload from './Blurload'

const Deals = () => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [products, setProducts] = React.useState<Offer[]>([])
  const [categoryes, setCategoryes] = React.useState<string[]>([])
  const [categorye, setCategorye] = React.useState<string>('')
  const [Max, setMax] = React.useState<number>(0)
  const handleproductfetch = useCallback(async () => {
    setLoading(true)
    try {
      const { data: data_p } = await axios.get<OfferResponse>(
        `${process.env.NEXT_PUBLIC_OVERVIEW}outh/?category=${encodeURIComponent(categorye)}`
      )
      const { offers } = data_p
      setProducts(offers)
    } catch (e) {
      console.log(e)
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }, [categorye])
  const handlecategoryfetch = async () => {
    try {
      const { data } = await axios.get<CategoryResponse>(`${process.env.NEXT_PUBLIC_OVERVIEW}oc/`)
      const { categories, max_discount } = data
      setCategoryes(categories)
      setMax(max_discount)
      setCategorye(categories[0])
    } catch (e) {
      console.log(e)
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    handlecategoryfetch()
  }, [])
  useEffect(() => {
    handleproductfetch()
  }, [categorye, handleproductfetch])
  return (
    <div className="space-y-6">
      {loading && <Blurload text="Loading Deals..." />}
      {/* navigation section */}
      <section className="lg:flex justify-between items-center hidden">
        {/* title */}
        <h3 className="text-black text-size5 font-bold hidden lg:block">
          Up to {Max}% 🎊 Order.uk exclusive deals
        </h3>
        {/* navigation */}
        <nav className="flex justify-center items-center gap-4">
          {categoryes.length > 0 ? (
            categoryes.map((item) => (
              // href="/?category=shoes"
              <li
                key={item}
                className={`py-2.5 px-4 rounded-3xl list-none select-none cursor-pointer ${
                  categorye === item ? 'border-[1px] border-primary' : ''
                }`}
                onClick={() => setCategorye(item)}
              >
                <p className="font-semibold text-size2 text-black">{item}</p>
              </li>
            ))
          ) : (
            <p>No category found...</p>
          )}
        </nav>
      </section>
      {/* item section destop part */}
      <section className="hidden overflow-x-auto lg:flex items-center gap-4 ">
        {products.length <= 0 ? (
          <p>No deals found...</p>
        ) : products.filter((i) => {
            return i.category.toLowerCase() === categorye.toLowerCase()
          }).length <= 0 ? (
          <p>No deals found for this category...</p>
        ) : (
          products
            .filter((i) => {
              return i.category.toLowerCase() === categorye.toLowerCase()
            })
            .map((item) => (
              <Link
                href={`/menu/${encodeURIComponent(item.id)}` as Route}
                key={item.id}
                className="h-[325px] w-full pl-6 pb-6 pr-3 flex flex-col justify-between items-stretch bg-no-repeat bg-cover bg-center rounded-lg overflow-hidden box-border"
                // style={{
                //   backgroundImage: `url('/img.png')`
                // }}
                style={{
                  backgroundImage: item.productimgs
                    ? `url('${item.productimgs}')`
                    : `url('/img.png')`
                }}
              >
                {/* tag segment */}
                <div className="w-full">
                  <div className="w-[88px] h-[66px] flex justify-center items-center bg-txt2 rounded-b-2xl ml-auto">
                    <p className="text-white text-size3 font-bold">
                      {Math.ceil(item.discount_percent).toString().concat('%')}
                    </p>
                  </div>
                </div>

                {/* heading segment */}
                <div className="flex flex-col gap-1.5">
                  {/* h4 tag */}
                  <h4 className="font-medium text-primary text-size3">{item.category}</h4>
                  {/* h3 tag */}
                  <h3 className="font-bold text-white text-size4">{item.name}</h3>
                </div>
              </Link>
            ))
        )}
      </section>
      {/* item section mobile part */}
      <section className="overflow-x-auto lg:hidden flex items-start gap-3 scroll scroll-hide">
        {products.length <= 0 ? (
          <p>No deals found...</p>
        ) : products.filter((i) => {
            return i.category.toLowerCase() === categorye.toLowerCase()
          }).length <= 0 ? (
          <p>No deals found for this category...</p>
        ) : (
          products
            .filter((i) => {
              return i.category.toLowerCase() === categorye.toLowerCase()
            })
            .map((item) => (
              <div key={item.id}>
                <Link
                  href={`/menu?category=${encodeURIComponent(item.category)}` as Route}
                  className="h-[150px] w-[150px] block"
                >
                  <div
                    className="h-[150px] w-[150px] bg-no-repeat bg-cover bg-center rounded-lg overflow-hidden box-border relative"
                    style={{
                      backgroundImage: item.productimgs
                        ? `url('${item.productimgs}')`
                        : `url('/img.png')`
                    }}
                  >
                    <div
                      className="w-[46px] h-[38]
              bg-txt2 flex justify-center items-center absolute top-0 right-3"
                    >
                      <p className="font-bold text-size1 text-white">
                        {Math.ceil(item.discount_percent)}
                      </p>
                    </div>
                  </div>
                  {/* tag name */}
                </Link>
                {/* detail's of deal's */}
                <div className="flex flex-col justify-start items-start gap-1.5 pl-3 mt-2">
                  <h4 className="font-medium text-primary text-size0">{item.category}</h4>
                  <h3 className="font-bold text-size1 text-txt2">{item.name}</h3>
                </div>
              </div>
            ))
        )}
      </section>
    </div>
  )
}

export default Deals
