'use client'
import { useRef } from 'react'
import { CiClock2 } from 'react-icons/ci'
import { FaStar } from 'react-icons/fa'
import 'swiper/css'

import { testimonials } from '@/lib/resturant_store'
import Image from 'next/image'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Testimonial = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)
  return (
    <section className="space-y-3 lg:space-y-4 fullbg bg-bg5 py-8">
      {/* top part */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-black text-size5 lg:text-size6">Customer Reviews</h3>
        {/* buttons for navigation */}
        <div className="flex items-center gap-3">
          <button
            className="w-[75px] h-[75px] bg-primary cursor-pointer rounded-full flex justify-center items-center"
            ref={prevRef}
          >
            <FaAngleLeft className="text-black" color="#000000" size={36} />
          </button>
          <button
            className="w-[75px] h-[75px] bg-primary cursor-pointer rounded-full flex justify-center items-center"
            ref={nextRef}
          >
            <FaAngleRight className="text-black" color="#000000" size={36} />
          </button>
        </div>
      </div>
      {/* swiper card part */}

      <Swiper
        modules={[Navigation]}
        // প্রথমে null দাও, পরে init-এ রেফারেন্স বসাবে (React ref timing issue ফিক্স)
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        onInit={(swiper) => {
          swiper.navigation.init()
          swiper.navigation.update()
        }}
        loop={true}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col gap-4 items-stretch bg-white p-4 rounded-lg">
              {/* heading part */}
              <div className="flex justify-between items-center gap-2">
                {/* heading left */}
                <div className="divide-primary divide-x-4 flex gap-2 items-center">
                  <div>
                    <Image
                      src={item.img}
                      alt="testimonial image"
                      width={54}
                      height={54}
                      className="block  mr-1.5"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-txt2 text-size3">{item.name}</p>
                    <p className="font-normal text-primary text-size2">{item.location}</p>
                  </div>
                </div>
                {/* heading right */}
                <div className="flex flex-col items-end gap-2.5 ">
                  {/* star */}
                  <div className="flex gap-1 items-center">
                    {Array.from({ length: item.star }, (_, i) => i + 1).map((mi) => (
                      <FaStar color="#FC8A06" size={17} key={mi} />
                    ))}
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <CiClock2 />
                    <p>{item.date}</p>
                  </div>
                </div>
              </div>
              {/* message part */}
              <p className="font-normal text-black text-size2">{item.msg}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Testimonial
