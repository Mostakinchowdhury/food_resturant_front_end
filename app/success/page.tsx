'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SuccessPage = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4 text-lg text-gray-700">
        Thank you for your purchase. Your payment has been processed successfully.
      </p>
      <p className="mt-2 text-gray-500">You will be redirected to the homepage shortly.</p>
      <button
        onClick={() => router.push('/')}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Go to Homepage
      </button>
    </div>
  )
}

export default SuccessPage
