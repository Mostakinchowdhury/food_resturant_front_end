'use client'

import LoadingLoader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Shop } from '@/type/bueness'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaShopLock } from 'react-icons/fa6'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { IoCheckmarkDoneCircleSharp, IoLocationSharp } from 'react-icons/io5'
import { MdCancel } from 'react-icons/md'
import { toast } from 'sonner'

const ShopsPage = () => {
  const [shops, setShops] = useState<Shop[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchShops('')
  }, [])

  const fetchShops = async (search: string) => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}shops?search=${encodeURIComponent(search)}`
      ) // DRF endpoint
      const data = res.data
      setShops(data)
    } catch (error) {
      toast(`Error fetching shops:${error as string}`)
    }
    setLoading(false)
  }

  return (
    <div className="py-4 mx-auto">
      <h1 className="font-extrabold text-size5 lg:text-size7 text-primary my-3 text-center">
        Shops List
      </h1>

      {/* Search Input */}
      <div className="flex gap-2 items-center justify-center bg-gray-100 rounded-2xl">
        <Input
          type="text"
          placeholder="Search by name or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 rounded-lg focus:outline-none focus-visible:outline-0 focus-visible:border-0 focus-visible:ring-0 border-0 focus:border-0 focus:ring-0 focus:outline-0 shadow-none lg:text-2xl lg:placeholder:text-2xl font-semibold text-txt2"
        />
        <Button
          className="focus-visible:outline-0 focus-visible:border-0 focus-visible:ring-0 active:bg-amber-800 hover:bg-amber-400 py-[26px] tracking-wider text-lg lg:text-2xl lg:py-8 px-8"
          onClick={() => fetchShops(searchTerm)}
        >
          Search
        </Button>
      </div>

      {loading ? (
        <LoadingLoader text="Shop Fetching" />
      ) : shops.length === 0 ? (
        <p className="text-center my-6">No shops found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="rounded-xl p-2 flex flex-col items-center shadow hover:shadow-lg transition bg-gray-100 py-4"
            >
              <Link href={`/shops/${shop.id}`}>
                {shop.buesness_logo ? (
                  <Image
                    src={shop.buesness_logo}
                    alt={shop.business_name}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover mb-4 border-2 border-accent"
                  />
                ) : (
                  //
                  <Image
                    src={'/shoppic.jpg'}
                    alt={shop.business_name}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover mb-4 border-2 border-accent"
                  />
                )}
              </Link>
              <h2 className="text-lg font-bold flex items-center gap-1.5">
                <span>
                  <FaShopLock />
                </span>
                <span>{shop.business_name}</span>
              </h2>
              <p className="text-sm font-medium flex items-center gap-2 text-txt2">
                <span>
                  <span>
                    <IoLocationSharp />
                  </span>
                </span>
                <span>{shop.business_address}</span>
              </p>
              <p
                className={`mt-2 font-medium flex items-center gap-2 ${
                  shop.status === 'PENDING'
                    ? 'text-yellow-500'
                    : shop.status === 'APPROVED'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                <span>
                  {shop.status === 'PENDING' ? (
                    <GrStatusGoodSmall />
                  ) : shop.status === 'APPROVED' ? (
                    <IoCheckmarkDoneCircleSharp />
                  ) : (
                    <MdCancel />
                  )}
                </span>
                {shop.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ShopsPage
