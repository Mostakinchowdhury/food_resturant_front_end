import { product_type } from '@/type/item'
import { Route } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { poppins } from '../Navbar'
import Detailaddtocart from './Detailaddtocart'

const HeadSection = ({ product }: { product: product_type }) => {
  console.log('from singe')
  console.log(product)
  const isvideo: boolean =
    product.productimgs[0].file?.endsWith('.mp4') || product.productimgs[0].file?.endsWith('.mov')
  return (
    <div
      className={`flex flex-col md:flex-row items-stretch md:gap-10 gap-4 p-4 bg-white shadow-md rounded-lg ${poppins.className}`}
    >
      <div className="w-full md:w-1/2 flex-1 flex">
        {/* product image */}
        {product.productimgs.length > 0 ? (
          isvideo ? (
            <video
              src={product.productimgs[0]?.file}
              className="md:w-auto w-full object-cover rounded-2xl"
              controls
              autoPlay
              loop
            />
          ) : (
            <Image
              src={product.productimgs[0]?.file}
              alt="product"
              height={80}
              width={80}
              priority
              className="md:w-auto w-full object-cover rounded-2xl"
            />
          )
        ) : (
          <Image
            src={'/demo.jpg'}
            alt="product"
            height={40}
            width={40}
            priority
            className="md:w-auto w-full object-cover rounded-2xl"
          />
        )}
      </div>
      {/* detail */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 flex-1">
        <h1 className="text-size4 md:text-size6 font-bold text-txt2">{product.name}</h1>
        <h2 className="text-size3 text-txt font-medium -my-5">{product.category}</h2>
        <div className="flex justify-start items-center gap-1 mt-3">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((mi) => {
            if (mi <= Math.round(product.average_rating)) {
              return <FaStar color="#FC8A06" size={24} key={mi} />
            } else {
              return <FaRegStar color="#FC8A06" size={24} key={mi} />
            }
          })}
          <p className="text-txt text-size3 font-semibold ml-1">{`(${product.review_count})`}</p>
        </div>
        <p className="text-gray-600 text-size1 font-normal">{product.description}</p>
        <div className="flex items-center gap-4">
          <p className="text-gray-600 text-size4 font-semibold">
            Price:{' '}
            <span className="text-txt2 font-bold mx-2 text-size4">
              {product.price} {process.env.NEXT_PUBLIC_CURRENCY_NAME}
            </span>
            {product.max_price && (
              <del className="text-red-400 font-bold mx-2 text-size4">
                {product.max_price} {process.env.NEXT_PUBLIC_CURRENCY_NAME}
              </del>
            )}
          </p>
          {product.stock ? (
            <span className="text-sm text-primary">In Stock</span>
          ) : (
            <span className="text-sm text-red-500">Out of Stock</span>
          )}
        </div>
        <div>
          <h3 className="text-txt2 text-size3 font-semibold mb-2">Used Tags:</h3>
          <div className="flex justify-start items-center flex-wrap gap-2.5">
            {product.tags?.map((tg) => (
              <p
                className="p-2 rounded-sm border-[1px] border-gray-600 text-size0 font-normal cursor-pointer"
                key={tg.id}
              >
                <Link href={`/menu/?tag=${encodeURIComponent(tg.name)}` as Route}>{tg.name}</Link>
              </p>
            ))}
          </div>
        </div>
        <Detailaddtocart id={product.id} />
      </div>
    </div>
  )
}

export default HeadSection
