'use client'
import { RootState } from '@/lib/configstore'
import api from '@/utils/api'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Submitstart from './Submitstart'

export default function ReviewsForm({ productId }: { productId: number }) {
  const [permitted, setPermitted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const authenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const [reviewText, setReviewText] = useState<string>('')
  const [rateddict, setrateddict] = useState<{ is_rated: boolean; rated: number } | null>(null)

  // function to fetch if user has rated the product
  const fetchRatingStatus = async () => {
    setLoading(true)
    try {
      const response = await api.get<{ is_rated: boolean; rated: number }>(
        `${process.env.NEXT_PUBLIC_OVERVIEW}irp?product_id=${productId}`
      )
      if (response.status === 200) {
        setrateddict(response.data)
        return
      }
      setrateddict({ is_rated: false, rated: 0 })
    } catch (e: Error | any) {
      toast.error(e.message || 'Error checking rating status')
    } finally {
      setLoading(false)
    }
  }

  // function to added a new revew

  const handhsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const respons = await api.post(`reviews/`, {
        product: productId,
        comment: reviewText,
        rating: 5
      })
      if (respons.status === 201) {
        toast.success('Review submitted successfully')
        setReviewText('')
        return
      }
    } catch (e: Error | any) {
      toast.error(e.message || 'Error submitting review')
    } finally {
      setLoading(false)
    }
  }

  // Function to check if the user has purchased the product
  const fetchPurchaseStatus = async () => {
    try {
      // ferch data with if status within 200-499 range
      const response = await api.get<{ has_purchased: boolean }>(
        `orders/ispercheased?product_id=${productId}`,
        {
          validateStatus: (status) => status >= 200 && status < 500
        }
      )
      // if status is successfull
      if (response.status === 200) {
        setPermitted(response.data.has_purchased)
        return
      }
      // -------------------------------
      // ERROR (400–499)
      // -------------------------------
      setPermitted(false)
    } catch (e: Error | any) {
      toast.error(e.message || 'Error checking purchase status')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPurchaseStatus()
    fetchRatingStatus()
  }, [])
  if (!authenticated) {
    return loading ? (
      <p>Checking your authentication...</p>
    ) : (
      <div className="p-4 text-white bg-yellow-800 rounded-lg mb-4">
        Please{' '}
        <Link href="/sign" className="underline font-semibold">
          login
        </Link>{' '}
        to submit a review.
      </div>
    )
  }
  if (!permitted) {
    // Check if the user has purchased the product
    return (
      <div>
        <div className="p-4 text-white font-bold bg-primary rounded-lg mb-4">
          {loading
            ? 'Checking purchase history...'
            : 'You need to purchase this product before submitting a review.'}
        </div>
      </div>
    )
  }
  return (
    <div>
      {!rateddict?.is_rated && <Submitstart productid={productId} />}
      {/* Review submission form goes here */}
      <form
        className="flex gap-0 h-[60px] rounded-2xl overflow-hidden w-full mb-4 md:mb-6 bg-gray-200"
        onSubmit={handhsubmit}
      >
        <Input
          type="text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
          className="h-full focus:outline-0 focus-visible:outline-0 focus-visible:ring-0 focus:ring-0 border-0 focus:border-0 shadow-md  text-txt2 font-medium lg:text-size2 px-4 md:px-6"
        />
        <Button className="h-full rounded-l-none font-extrabold text-lg">Submit</Button>
      </form>
    </div>
  )
}
