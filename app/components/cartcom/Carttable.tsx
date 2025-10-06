import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import {
  removeFromCart,
  removeLocally,
  toggleischeakedlocally,
  toogleischeaked,
  updatecart,
  updateQuantityLocally
} from '@/lib/cartslice'
import { AppDispatch, RootState } from '@/lib/configstore'
import Image from 'next/image'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { poppins } from '../Navbar'
import { Input } from '../ui/input'

const Carttable = () => {
  const total_quantity = useSelector((state: RootState) => state.cart.cart?.total_quantity)
  const items = useSelector((state: RootState) => state.cart.cart?.items)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className={`${poppins.className}`}>
      <p className="font-normal text-black text-size1">
        You have {total_quantity || 0} item in your cart
      </p>

      <Table className="border-0 my-3">
        <TableBody>
          {items?.map((item) => (
            <TableRow key={item.id}>
              {/* শুধু একটা cell, এর মধ্যে পুরো row এর content */}
              <TableCell colSpan={4} className="p-0">
                <div
                  className={`flex items-center justify-between rounded-lg md:rounded-xl px-5 py-2 ${
                    item.ischeaked ? 'text-primary bg-txt2' : 'bg-gray-300 text-txt2'
                  } my-3 min-h-[85px] overflow-x-auto scroll-hide gap-4 w-full max-w-[90vw] lg:overflow-x-visible md:max-w-none`}
                >
                  {/* প্রথম অংশ */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Checkbox
                      className="bg-txt2 text-gray-400 size-[22] cursor-pointer"
                      checked={item.ischeaked}
                      onClick={() => {
                        dispatch(
                          toggleischeakedlocally({ id: item.id, ischeaked: !item.ischeaked })
                        )
                        dispatch(toogleischeaked({ id: item.id, ischeaked: !item.ischeaked }))
                      }}
                    />
                    {item.product_detail.productimgs.filter(
                      (i) => i.file_url.endsWith('.png') || i.file_url.endsWith('.jpg')
                    )[0].file_url ? (
                      <Image
                        src={
                          item.product_detail.productimgs.filter(
                            (i) => i.file_url.endsWith('.png') || i.file_url.endsWith('.jpg')
                          )[0].file_url
                        }
                        alt="product"
                        height={60}
                        width={60}
                        priority
                        className={`rounded-lg block object-cover border-2 size-14 ${
                          item.ischeaked ? 'border-primary' : 'border-gray-400'
                        }`}
                      />
                    ) : (
                      <Image
                        src={'/demo.jpg'}
                        alt="product"
                        height={60}
                        width={60}
                        priority
                        className={`rounded-lg block object-cover border-2 size-14 ${
                          item.ischeaked ? 'border-primary' : 'border-gray-400'
                        }`}
                      />
                    )}
                    <div className="flex flex-col items-start">
                      <h3 className="font-semibold text-size3 md:text-size4">
                        {item.product_detail.name}
                      </h3>
                      <p className="text-size1 font-medium text-gray-600">
                        {item.product_detail.category}
                      </p>
                    </div>
                  </div>

                  {/* quantity control */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Button
                      className={` rounded-full md:size-[45] size-[34px] text-center text-size2  cursor-pointer ${
                        item.ischeaked ? 'bg-gray-300 text-txt2' : 'bg-txt2 text-gray-300'
                      }`}
                      onClick={() => {
                        dispatch(
                          updateQuantityLocally({ id: item.id, quantity: item.quantity + 1 })
                        )
                        dispatch(updatecart({ id: item.id, quantity: item.quantity + 1 }))
                      }}
                    >
                      +
                    </Button>
                    <Input
                      value={item.quantity}
                      className="size-14 bg-white text-center text-txt2"
                      readOnly
                    />
                    <Button
                      className={`rounded-full md:size-[45] size-[34px] text-center text-size2  cursor-pointer ${
                        item.ischeaked ? 'bg-gray-300 text-txt2' : 'bg-txt2 text-gray-300'
                      }`}
                      onClick={() => {
                        dispatch(
                          updateQuantityLocally({ id: item.id, quantity: item.quantity - 1 })
                        )
                        dispatch(updatecart({ id: item.id, quantity: item.quantity - 1 }))
                      }}
                    >
                      -
                    </Button>
                  </div>

                  {/* price */}
                  <div className="font-medium text-white">£{item.subtotal}</div>

                  {/* delete button */}
                  <div className="flex items-center justify-center">
                    <MdDelete
                      size={25}
                      className="cursor-pointer"
                      onClick={() => {
                        dispatch(removeLocally(item.id))
                        dispatch(removeFromCart(item.id))
                      }}
                    />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Carttable
