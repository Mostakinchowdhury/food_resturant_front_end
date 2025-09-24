import { product_type } from '@/type/item'
import { FaRegStar, FaStar } from 'react-icons/fa6'

const Reviews = ({ product }: { product: product_type }) => {
  return (
    <div>
      <h2 className="text-size4 md:text-size5 font-bold text-txt2">Reviews</h2>
      {/* reviews section  */}
      <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg divide-y-[1px] divide-txt2">
        {product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-2 p-4">
              {/* icon metadata part */}
              <div className="flex justify-between items-center gap-3 mb-2">
                {/* user identity */}
                <div className="flex justify-start items-center gap-1.5">
                  <h3 className="text-size2 text-txt2 font-bold">{review.user}</h3>
                  <p className="text-size0 font-normal text-txt">
                    {(() => {
                      const minutes = Math.floor(
                        (Date.now() - new Date(review.created_at).getTime()) / 1000 / 60
                      )

                      if (minutes > 1440) {
                        // 1440 মিনিট = 1 দিন
                        const days = Math.floor(minutes / 1440)
                        return `${days} days ago`
                      } else if (minutes > 60) {
                        return `${Math.floor(minutes / 60)} hour ago`
                      } else if (minutes < 1) {
                        return 'Just now'
                      } else {
                        return `${minutes} minutes ago`
                      }
                    })()}
                  </p>
                </div>
                {/* right rating star side */}
                <div className="flex justify-start items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((mi) => {
                    if (mi <= review.rating) {
                      return <FaStar color="#FC8A06" size={16} key={mi} />
                    } else {
                      return <FaRegStar color="#FC8A06" size={16} key={mi} />
                    }
                  })}
                </div>
              </div>
              <div className="text-size1 text-txt font-medium bg-gray-200 p-4 rounded-lg">
                {review.comment}
              </div>
            </div>
          ))
        ) : (
          // no reviews view
          <p className="text-size1 text-txt font-normal">No reviews available for this product.</p>
        )}
      </div>
    </div>
  )
}

export default Reviews
