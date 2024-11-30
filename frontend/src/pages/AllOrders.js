import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayUSDCurrency from '../helper/displayCurrency'

const AllOrders = () => {

  const [data, setData] = useState([])

  const fetchOrderDetails = async(e) => {
    const response = await fetch(SummaryApi.view_all_orders.url, {
      method : SummaryApi.view_all_orders.method,
      credentials : 'include'
    })

    const responseData = await response.json()
    console.log(responseData)
    setData(responseData.data)
  }

  useEffect(()=>{
    fetchOrderDetails()
  },[])

  return (
    <div>
      {
        !data[0] && (
          <p>No Order Available</p>
        )
      }

      <div className='p-4 w-full'>
        {
          data.map((item, index) => {
            return (
              <div key={item.userId}>
                <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
                <div className='border rounded'>
                  <div className='flex flex-col md:flex-row justify-between'>
                    <div className='grid gap-1'>
                      {
                        item?.productDetails.map((product, index) => {
                          return (
                            <div key={product.productId} className='flex gap-3 bg-slate-100'>
                              <img
                                src={product.image[0]}
                                className='w-28 h-28 object-scale-down p-2'/>
                              <div>
                                <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                                <div className='text-lg mt-1 text-lightFiskBlue'>{displayUSDCurrency(product.price)}</div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className='flex flex-col lg:flex-row gap-4 p-2 min-w-[300px]'>
                      <div>
                        <div className='text-xl font-medium text-lightFiskBlue border-b'>Payment Details </div>
                        <p className='ml-1'>Payment Method : {item.paymentDetails.paymentMethodTypes[0]}</p>
                        <p className='ml-1'>Payment Status : {item.paymentDetails.payment_status}</p>
                        <p className='ml-1'>User Email : {item.email}</p>
                      </div>
                      {/** Put in somewhere that the goods will be delivered to the mail room */}

                    </div>
                  </div>

                  <div className='font-semibold ml-auto w-fit text-lg p-2'>Total Amount : {item.totalAmount}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllOrders