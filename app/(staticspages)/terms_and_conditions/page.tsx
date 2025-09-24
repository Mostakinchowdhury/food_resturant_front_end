// app/terms/page.tsx
export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-4">
        Welcome to our food delivery app. By using our services, you agree to these terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. User Responsibilities</h2>
      <p>You must provide accurate account information and comply with our policies.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Orders & Payments</h2>
      <p>
        All payments must be completed at checkout. We accept credit/debit cards & mobile wallets.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Delivery Policy</h2>
      <p>
        Delivery times are estimates. Delays may occur due to traffic or restaurant preparation
        time.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Refunds & Cancellations</h2>
      <p>Orders once confirmed cannot be canceled. Refunds apply only to defective deliveries.</p>
    </div>
  )
}
