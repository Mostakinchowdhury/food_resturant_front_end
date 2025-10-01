import { product_type } from '@/type/item'
import { titleCase } from '@/utils/menu'
import Link from 'next/link'
import { ReactNode } from 'react'
import Addtocart from '../Addtocart'
// items

const Products = ({ category, products }: { category?: string; products: product_type[] }) => {
  // console.log(products);
  return (
    <section className="md:space-y-3.5 space-y-3 box-border">
      {category && <h3 className="font-bold text-black text-size5 lg:text-size6">{category}</h3>}
      <div className="gridbox2 lg:grid-cols-3 justify-between gap-6">
        {/* item card */}
        {products.length > 0 ? (
          products.map(
            (items: product_type): ReactNode => (
              <div
                className="p-6 flex justify-between items-center gap-2 rounded-lg drop-shadow-product  border-[rgba(0,0,0,0.1)] min-h-[245px] border-[1px]"
                style={{ boxShadow: '0 0 14px 4px rgba(0,0,0,0.1)' }}
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
                <Link href={`/menu/${items.id}`} className="cursor-pointer h-full">
                  <div
                    className="h-full w-[205px]
        overflow-hidden rounded-xl bg-center bg-cover bg-no-repeat box-border justify-end flex items-end shrink-0"
                    style={{
                      backgroundImage: items.image ? `url(${encodeURI(items.image)})` : 'none',
                      width: '205px'
                    }}
                  >
                    {/* plus place */}
                    <Addtocart id={items.id} />
                  </div>
                </Link>
              </div>
            )
          )
        ) : (
          <div className="text-center text-gray-500 col-span-full">No products found</div>
        )}
      </div>
    </section>
  )
}

export default Products
