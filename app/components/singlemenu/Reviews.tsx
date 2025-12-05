'use client'
import { product_type } from '@/type/item'
import { ProductReviewType } from '@/type/review_type'
import api from '@/utils/api'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaSave } from 'react-icons/fa'
import { FaRegStar, FaStar } from 'react-icons/fa6'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import { toast } from 'sonner'
import Blurload from '../Blurload'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import ReviewsForm from './ReviewsForm'

const Reviews = ({ product }: { product: product_type }) => {
  const [loading, setloading] = useState<boolean>(true)
  const [edit, setedit] = useState<number>(0)
  const [user_id, setuser_id] = useState<number>(0)
  const router = useRouter()
  const prop = { productId: product.id }
  const [reviews, setreviews] = useState<ProductReviewType[]>([])
  const [rText, setrText] = useState<string>('')
  /*reviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())*/

  //  handle update

  const handleupdate = async (review_id: number) => {
    setloading(true)
    try {
      const res = await api.patch(`reviews/${encodeURIComponent(review_id)}/`, {
        comment: rText
      })
      setreviews(
        reviews.map((i) => {
          if (i.id == review_id) {
            return { ...i, comment: rText }
          } else {
            return i
          }
        })
      )
      toast.success('Review update successfull wait 2 second ', {
        duration: 2000,
        style: {
          color: 'green',
          fontWeight: 'bold'
        }
      })
      setedit(0)
    } catch (e: Error | any) {
      const tst = `Fail to update ${e.message}`
      toast.error(tst, {
        style: {
          color: 'red',
          fontWeight: 'bold'
        }
      })
    } finally {
      setloading(false)
    }
  }

  // handle delete

  const handledelete = async (review_id: number) => {
    setloading(true)
    try {
      const res = await api.delete(`reviews/${encodeURIComponent(review_id)}/`)
      setreviews(reviews.filter((i) => i.id != review_id))
      toast.success(`Review deleted succesfully wait 2 second`, {
        duration: 2000,
        style: {
          color: 'green',
          fontWeight: 'bold'
        }
      })
    } catch (e: Error | any) {
      const tst = `Fail to delete ${e.message as string}`
      toast.error(tst, {
        style: {
          color: 'red',
          fontWeight: 'bold'
        }
      })
    } finally {
      setloading(false)
    }
  }

  // fetch user_id

  const fetchuser = async () => {
    setloading(true)
    try {
      const res = await api.get<{ user_id: number }>('fui/')
      if (res.status == 200) {
        setuser_id(res.data.user_id)
        return
      }
      setuser_id(0)
    } catch {
      setuser_id(0)
    } finally {
      setloading(false)
    }
  }
  // data fetch by useEffect

  const fetchReviews = async () => {
    try {
      const response = await axios.get<ProductReviewType[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}reviews/product?product_id=${encodeURIComponent(
          product.id
        )}`,
        {
          validateStatus: (status) => status >= 200 && status < 500
        }
      )
      if (response.status === 200) {
        setreviews(response.data)
        return
      }
      setreviews([])
      toast.error('Error fetching reviews')
    } catch (e: Error | any) {
      toast.error(e.message || 'Error fetching reviews')
    } finally {
      setloading(false)
    }
  }
  // useEffect to fetch reviews on component mount
  useEffect(() => {
    fetchReviews()
    fetchuser()
  }, [product.id])
  useEffect(() => {
    const cndn = reviews.find((i) => i.id == edit)
    if (cndn) {
      setrText(cndn.comment)
    }
  }, [edit])
  return (
    <div>
      {loading && <Blurload text="Review collecting..." />}
      <ReviewsForm {...prop} />
      <h2 className="text-size4 md:text-size5 font-bold text-txt2">Reviews</h2>
      {/* reviews section  */}
      <div className="flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg divide-y-[1px] divide-txt2">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="flex flex-col gap-2 p-4">
              {/* icon metadata part */}
              <div className="flex justify-between items-center gap-3 mb-2">
                {/* user identity */}
                <div className="flex justify-start items-center gap-1.5">
                  <h3 className="text-size2 text-txt2 font-bold">{review.user_email}</h3>
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
                    if (mi <= review.rated) {
                      return <FaStar color="#FC8A06" size={16} key={mi} />
                    } else {
                      return <FaRegStar color="#FC8A06" size={16} key={mi} />
                    }
                  })}
                </div>
              </div>
              <section className="flex flex-col gap-2.5 ">
                <div className="text-size1 text-txt font-medium bg-gray-200 p-4 rounded-lg">
                  {edit == review.id ? (
                    <Input
                      value={rText}
                      onChange={(e) => setrText(e.target.value)}
                      className="focus:outline-0 focus:border-0 focus:ring-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:outline-0 bg-primary text-white font-bold text-xl"
                    />
                  ) : (
                    <p>{review.comment}</p>
                  )}
                </div>
                {user_id != 0 && review.user == user_id && (
                  <div className="ml-auto w-fit flex items-center gap-2">
                    <Button
                      className="px-6 flex gap-1 items-center"
                      onClick={() => {
                        if (edit == review.id) {
                          handleupdate(review.id)
                        } else {
                          setedit(review.id)
                        }
                      }}
                    >
                      {edit != review.id ? <MdModeEditOutline /> : <FaSave />}
                      <h3>{edit == review.id ? 'Save' : 'Edit'}</h3>
                    </Button>
                    <Button
                      className="px-6 flex gap-1 items-center bg-red-600 font-bold text-white"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete?')) {
                          handledelete(review.id)
                        }
                      }}
                    >
                      <MdDelete />
                      <h3>Delete</h3>
                    </Button>
                  </div>
                )}
              </section>
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
