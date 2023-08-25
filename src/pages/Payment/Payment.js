import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import './payment.css'
import axios from 'axios';

const Payment = () => {
  const [paymentDetails, setPaymentDetails ] = useState([])

  const userId = localStorage.getItem('userId')

  const showPaymentDetails = async (userId) => {
    const {data: {paymentHistory}} = await axios.get(`${process.env.REACT_APP_ENDPOINT}/get/payments/${userId}`)
    console.log(paymentHistory)
    setPaymentDetails(paymentHistory)
  }

console.log(paymentDetails.createdAt)

  useEffect(() => {
    return () => {
      showPaymentDetails(userId)
    }
  },[])

  return (
    <div>
      <h1 className="text-2xl font-medium title-font mb-20 text-gray-900 tracking-widest">Your Transactions</h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-wrap">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                {/* <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/108x98" /> */}
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-small">Payment invoice</h2>
                  <p className="text-gray-500">{paymentDetails.createdAt}</p>
                </div>
                <FileDownloadIcon className='payment_icon' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Payment