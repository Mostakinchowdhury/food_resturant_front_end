'use client'

import LoadingLoader from '@/components/Loader'
import { ApplyRider } from '@/type/applyrider'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { IoCheckmarkDoneCircleSharp, IoLocationSharp } from 'react-icons/io5'
import { MdCancel, MdEmail, MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { toast } from 'sonner'

const ShopDetailPage = () => {
  const params = useParams()
  const { id } = params
  const [rider, setrider] = useState<ApplyRider | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRider()
  }, [id])

  const fetchRider = async () => {
    setLoading(true)
    try {
      const res = await axios.get<ApplyRider>(`${process.env.NEXT_PUBLIC_BACKEND_URL}riders/${id}/`)
      if (res.status < 199 || res.status > 299) {
        toast('Sorry fail to collect riders records')
        return
      }
      const data = res.data
      setrider(data)
    } catch (error) {
      toast(`Error fetching rider:${error as string}`)
    }
    setLoading(false)
  }

  if (loading) return <LoadingLoader text="Collecting..." />
  if (!rider) return <p className="p-4 text-center my-3">Rider not found.</p>

  return (
    <>
      <h1 className="font-extrabold text-size5 lg:text-size7 text-primary my-3 text-center">
        Rider Details
      </h1>
      <div className="bg-white rounded-xl shadow-md flex justify-center items-center flex-col space-y-8 w-fit mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mx-auto p-8">
          {/* Business Logo */}
          <div className="flex-shrink-0">
            {rider.photo ? (
              <Image
                src={rider.photo}
                alt={rider.name + "'s photo"}
                width={250}
                height={250}
                className="rounded-lg object-cover w-80 h-80"
              />
            ) : (
              <Image
                src={'/shoppic.jpg'}
                alt={rider.name + "'s photo"}
                width={250}
                height={250}
                className="rounded-lg object-cover size-80"
              />
            )}
          </div>

          {/* Shop Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2 text-gray-600 flex items-center gap-1.5">
              <span>
                <MdOutlineDriveFileRenameOutline />
              </span>
              <span>{rider.name} </span>
            </h1>
            <p className="text-gray-600 mb-1 flex items-center gap-1.5">
              <span>
                <MdEmail />
              </span>
              <span className="font-semibold">Email:</span> {rider.email}
            </p>
            <p className="text-gray-600 mb-1 flex items-center gap-1.5">
              <span>
                <FaPhoneSquareAlt />
              </span>
              <span className="font-semibold">Phone:</span> {rider.phone_num}
            </p>
            <p className="text-gray-600 mb-1 flex items-center gap-1.5">
              <span>
                <IoLocationSharp />
              </span>
              <span className="font-semibold">Working Area Address:</span>{' '}
              {rider.working_area_address}
            </p>
            <p className="text-gray-600 mb-1 flex items-center gap-1.5">
              <span>
                <IoLocationSharp />
              </span>
              <span className="font-semibold">Permanent Address:</span> {rider.permanent_address}
            </p>

            <p
              className={`mt-4 font-medium flex items-center gap-2 ${
                rider.status === 'PENDING'
                  ? 'text-yellow-500'
                  : rider.status === 'APPROVED'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              <span>
                {rider.status === 'PENDING' ? (
                  <GrStatusGoodSmall />
                ) : rider.status === 'APPROVED' ? (
                  <IoCheckmarkDoneCircleSharp />
                ) : (
                  <MdCancel />
                )}
              </span>
              Status: {rider.status}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShopDetailPage
