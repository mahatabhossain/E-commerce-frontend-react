import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderedItems } from '../../slices/orders/orderSlice'

const Orders = () => {
  const userId = localStorage.getItem('userId')
  const dispatch = useDispatch()

  const { orderedItemOfUser } = useSelector(store => store.orders)
  console.log('order item of user', orderedItemOfUser)

  useEffect(() => {
    return () => dispatch(orderedItems(userId))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-medium title-font mb-20 text-gray-900 tracking-widest">Your Orders</h1>
      {orderedItemOfUser?.map((el, i) => (
        <div key={`order${i}`} class="flex pb-20  md:w-2/3 mx-auto">
          <div class="flex sm:items-center  sm:flex-row">
            <div class="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
              <img src={el.url} />
            </div>
            <div class="flex-grow justify-start sm:pl-6 mt-6 sm:mt-0">
              <h2 class=" flex font-medium title-font text-gray-900 mb-1 text-xl">{el.productName}</h2>
              <p class="leading-relaxed">{el.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders