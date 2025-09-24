'use client'
import Link from 'next/link'

//

const CancelPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Payment Canceled</h1>
      <p>Your payment was not completed. If this was a mistake, you can try again.</p>
      <Link href="/">
        <p style={{ color: 'blue', textDecoration: 'underline' }}>Go back to Home</p>
      </Link>
    </div>
  )
}

export default CancelPage
