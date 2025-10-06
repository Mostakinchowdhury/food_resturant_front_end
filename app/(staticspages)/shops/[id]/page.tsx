'use client'

import LoadingLoader from '@/components/Loader'
import { Shopdetail } from '@/type/bueness'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CgWebsite } from 'react-icons/cg'
import { FaAudioDescription, FaPhoneSquareAlt } from 'react-icons/fa'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { IoCheckmarkDoneCircleSharp, IoLocationSharp } from 'react-icons/io5'
import { MdCancel, MdEmail, MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { SiBuefy } from 'react-icons/si'
import { toast } from 'sonner'

const ShopDetailPage = () => {
  const params = useParams()
  const { id } = params
  const [shop, setShop] = useState<Shopdetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchShop()
  }, [id])

  const fetchShop = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}shops/${id}/`)
      const data = res.data
      setShop(data)
    } catch (error) {
      toast(`Error fetching shops:${error as string}`)
    }
    setLoading(false)
  }

  if (loading) return <LoadingLoader text="Collecting..." />
  if (!shop) return <p className="p-4 text-center my-3">Shop not found.</p>

  return (
    <>
      <h1 className="font-extrabold text-size5 lg:text-size7 text-primary my-3 text-center">
        Shops Details
      </h1>
      <div className="bg-white rounded-xl shadow-md lg:flex justify-around p-8 items-start flex-col space-y-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Business Logo */}
          <div className="flex-shrink-0">
            {shop.buesness_logo ? (
              <Image
                src={shop.buesness_logo}
                alt={shop.business_name}
                width={250}
                height={250}
                className="rounded-lg object-cover"
              />
            ) : (
              <Image
                src={'/shoppic.jpg'}
                alt={shop.business_name}
                width={250}
                height={250}
                className="rounded-lg object-cover"
              />
            )}
          </div>

          {/* Shop Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{shop.business_name}</h1>
            <p className="text-gray-600 mb-1 flex items-center gap-1.5">
              <span>
                <MdOutlineDriveFileRenameOutline />
              </span>
              <span className="font-semibold">Owner:</span> {shop.name}{' '}
            </p>
            <p className="text-gray-600 mb-1 flex items-center gap-1.5">
              <span>
                <MdEmail />
              </span>
              <span className="font-semibold">Email:</span> {shop.email}
            </p>
            <p className="text-gray-600 mb-1 flex items-center gap-1.5">
              <span>
                <FaPhoneSquareAlt />
              </span>
              <span className="font-semibold">Phone:</span> {shop.phone_num}
            </p>
            <p className="text-gray-600 mb-1 flex items-center gap-1.5">
              <span>
                <IoLocationSharp />
              </span>
              <span className="font-semibold">Address:</span> {shop.business_address}
            </p>
            <p className="text-gray-600 mb-1 flex items-center gap-1.5">
              <span>
                <SiBuefy />
              </span>
              <span className="font-semibold">Type:</span> {shop.business_type}
            </p>
            {shop.website && (
              <p className="text-blue-600 mb-1 flex items-center gap-2">
                <span>
                  <CgWebsite />
                </span>
                <a href={shop.website} target="_blank" rel="noopener noreferrer">
                  {shop.website}
                </a>
              </p>
            )}
            <div className="flex items-center gap-2">
              <span>
                <FaAudioDescription />
              </span>
              <p className="text-gray-700 mt-2">{shop.description}</p>
            </div>

            <p
              className={`mt-4 font-medium flex items-center gap-2 ${
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
              Status: {shop.status}
            </p>
          </div>
        </div>

        {/* Owner Photo */}
        {shop.owner_photo && (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-2">Owner Photo</h2>
            <Image
              src={shop.owner_photo}
              alt={shop.name}
              width={150}
              height={150}
              className="rounded-full object-cover border-2 border-accent"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ShopDetailPage
