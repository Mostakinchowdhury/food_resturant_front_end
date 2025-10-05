import { product_type } from '@/type/item'
import { titleCase } from '@/utils/menu'
import Link from 'next/link'
import Addtocart from '../Addtocart'

const RelatedProduct = async ({ products }: { products: product_type }) => {
  // addedtocard

  try {
    const response = await fetch(
      `${process.env.Backend_URL}products?category=${products.category}&ordering=-added_to_cart_count`
    )

    const jresponse: { results: product_type[] } = await response.json()
    const response_data =
      jresponse.results.filter((item) => item.id !== products.id).length > 5
        ? jresponse.results.filter((item) => item.id !== products.id).slice(0, 5)
        : jresponse.results.filter((item) => item.id !== products.id)

    // sorted by addedtocard
    const sortedProducts = response_data.sort((a, b) => b.addedtocard - a.addedtocard)

    return (
      <section className="md:space-y-3.5 space-y-3">
        <div className="flex items-stretch overflow-x-auto gap-5 scroll-hide justify-stretch">
          {/* item card */}
          {sortedProducts.map((items) => (
            <div
              className="p-6 flex justify-between items-center gap-2 rounded-lg  border-[rgba(0,0,0,0.1)] min-h-[245px] border-[1px] shrink-0 max-w-[90vw] md:max-w-[45vw] lg:max-w-[30vw] shadow-md"
              key={items.id}
            >
              {/* details */}
              {/* name */}
              <div className="flex flex-col justify-between items-start min-h-[240px]">
                <h2 className="font-semibold text-black text-[20px]">{titleCase(items.name)}</h2>
                {/* description */}
                <p className="font-normal text-size1 text-black">
                  {items.description.length > 90
                    ? items.description.slice(0, 90) + '...'
                    : items.description}
                </p>
                {/* price */}
                <h3 className="font-bold text-size3 text-txt2">
                  {process.env.NEXT_PUBLIC_CURRENCY_SYMBLE}
                  {items.price} {process.env.NEXT_PUBLIC_CURRENCY_NAME} <br />
                  {items.max_price && (
                    <del className="font-bold text-size3 text-red-400">
                      {process.env.NEXT_PUBLIC_CURRENCY_SYMBLE}
                      {items.max_price} {process.env.NEXT_PUBLIC_CURRENCY_NAME}
                    </del>
                  )}
                </h3>
              </div>
              {/* image */}
              <Link href={`/menu/${items.id}`} className="h-full cursor-pointer">
                {items.productimgs[
                  0] ? 
                    (items.productimgs[0].file.endsWith('.mp4') || items.productimgs[0].file.endsWith('.mov')) ? (
                      <video
                        src={items.productimgs[0].file}
                        className="h-full w-[205px] overflow-hidden rounded-xl object-cover"
                        controls
                        autoPlay
                        loop
                        muted
                      />
                    ) : (
                      <div
                  className="h-full w-[205px]
               overflow-hidden rounded-xl bg-center bg-cover bg-no-repeat box-border justify-end flex items-end shrink-0 relative"
                  style={{
                    backgroundImage:`url(${encodeURI(items.productimgs[0].file)})`,
                    width: '205px'
                  }}
                >
                  {/* plus place */}
                  <Addtocart id={items.id} />
                </div>)
                 :(
                     <div
                  className="h-full w-[205px]
               overflow-hidden rounded-xl bg-center bg-cover bg-no-repeat box-border justify-end flex items-end shrink-0 relative"
                  style={{
                    backgroundImage:`url('/demo.jpg')`,
                    width: '205px'
                  }}
                >
                  {/* plus place */}
                  <Addtocart id={items.id} />
                </div>)
                  }

              </Link>
            </div>
          ))}
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error fetching related products:', error)
    return null
  }
}

export default RelatedProduct
