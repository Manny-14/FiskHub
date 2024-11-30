import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayUSDCurrency from '../helper/displayCurrency'
import RatingScreen from '../components/RatingScreen'

const OrderPage = () => {

  const [data, setData] = useState([])

  const [ openRatingScreen, setOpenRatingScreen ] = useState(false)

  const [ sendData, setSendData ] = useState([])

  const fetchOrderDetails = async() => {
    const response = await fetch(SummaryApi.view_order.url, {
      method : SummaryApi.view_order.method,
      credentials : 'include'
    })

    const responseData = await response.json()
    setData(responseData.data)
  }

  const handleSendData = (item) => {
    setSendData(item.productDetails)
    setOpenRatingScreen(true)
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
              <div key={item.userId + index}>
                <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
                <div className='border rounded'>
                  <div className='flex flex-col md:flex-row justify-between'>
                    <div className='grid gap-1'>
                      {
                        item.productDetails?.map((product, index) => {
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
                        <p className='ml-1'>Payment method : {item.paymentDetails.paymentMethodTypes[0]}</p>
                        <p className='ml-1'>Payment Status : {item.paymentDetails.payment_status}</p>
                      </div>
                      {/** Put in somewhere that the goods will be delivered to the mail room */}

                    </div>
                  </div>

                  <div className='flex items-center justify-between p-3'>
                    <button className='bg-lightFiskBlue hover:bg-fiskBlue text-white px-6 py-2 max-w-[150px] hover:scale-110 transition-transform block rounded' onClick={()=>handleSendData(item)}>Rate Sellers</button>
                    <div className='font-semibold w-fit text-lg p-2'>Total Amount : {item.totalAmount}</div>
                  </div>
                </div>
              </div>
            )
          })
        }

        {
          openRatingScreen && (
            <RatingScreen onClose={() => setOpenRatingScreen(false)} orderDetails={sendData}/>
          )
        }
      </div>
    </div>
  )
}

export default OrderPage