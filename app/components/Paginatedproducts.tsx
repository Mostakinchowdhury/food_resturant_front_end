'use client'

import { productimgs_type } from '@/type/item'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Paginatedimgs({ imgs }: { imgs: productimgs_type[] }) {
  const sortedimgs = imgs.sort((a, b) => {
    const isImageA = a.file_url.endsWith('.png') || a.file_url.endsWith('.jpg')
    const isImageB = b.file_url.endsWith('.png') || b.file_url.endsWith('.jpg')

    if (isImageA && !isImageB) return -1
    if (!isImageA && isImageB) return 1
    return 0
  })

  return (
    <div className="w-full mx-auto">
      {imgs.length > 0 ? (
        <>
          <Swiper
            spaceBetween={30}
            pagination={{
              el: '.custom-pagination',
              clickable: true
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {sortedimgs.map((i, index) => (
              <SwiperSlide key={index} className="!flex justify-center items-center">
                {i.file_url.endsWith('.mp4') || i.file_url.endsWith('.mov') ? (
                  <video
                    src={i.file_url}
                    className="lg:w-[600px] lg:h-[600px] md:w-[400px] md:h-[400px] w-[300px] h-[300px] object-cover rounded-2xl block"
                    controls
                    loop
                  />
                ) : (
                  <Image
                    src={i.file_url}
                    alt="product"
                    height={400}
                    width={400}
                    className="lg:w-[600px] lg:h-[600px] md:w-[400px] md:h-[400px] w-[300px] h-[300px] object-cover rounded-2xl block"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination Swiper-এর বাইরে */}
          <div className="custom-pagination mt-4 flex justify-center"></div>
        </>
      ) : (
        <Image
          src={'/demo.jpg'}
          alt="product"
          height={400}
          width={400}
          className="w-full object-cover rounded-2xl"
        />
      )}
    </div>
  )
}
