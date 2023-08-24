import React from 'react'
import { useSelector } from 'react-redux'

const Payment = () => {
  const { paymentHistory } = useSelector(store => store.orders)
  console.log('paymentHistory',paymentHistory)

  return (
    <div>
      <h1 className="text-2xl font-medium title-font mb-20 text-gray-900 tracking-widest">Your Transactions</h1>
    </div>
  )
}

export default Payment