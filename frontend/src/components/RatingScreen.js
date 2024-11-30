import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import displayUSDCurrency from '../helper/displayCurrency'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { UseUser } from '../context'

const RatingScreen = ({
    onClose,
    orderDetails
}) => {

    const [ data, setData ] = useState({})

    async function fetchUser() {
        const data = await fetch(SummaryApi.current_user.url,{
            method : SummaryApi.current_user.method,
            credentials : 'include'
          })
      
        const dataResponse = await data.json()

        if(dataResponse?.success) {
            setData(dataResponse.data.productsRated || {})
        }
    }

    const ratingOptions = [ 5, 4, 3, 2, 1 ]

    useEffect(()=>{
        fetchUser()
    },[])


    const handleOnChange = (e) => {
        const { name, value } = e.target
        if(value > 0) {
            setData((prev) => {
                return {
                ...prev,
                [name] : Number(value)
                }
            })
        }
    }

    console.log("data", data)

    const handleSubmit = async(e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.submit_rating.url, {
        method : SummaryApi.submit_rating.method,
        credentials : 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
        })

        const responseData = await response.json()
        console.log("send rating", responseData)

        if(responseData.success) {
            toast.success(responseData?.message)
            onClose()
          }
      
          if(responseData.error) {
            toast.error(responseData?.message)
          }
    }

  return (
    <div className='fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-5 rounded w-full max-w-2xl max-h-[70%] overflow-hidden'>
            <div className='flex justify-between items-center pb-3'>
            <h2 className='font-bold text-lg'>Rate Sellers</h2>
            <div className='w-fit ml-auto text-2xl hover:text-lightFiskBlue cursor-pointer' onClick={onClose}>
                <IoMdClose />
            </div>
            </div>

            <form className='flex flex-col gap-5 items-center'>
                <div className='w-full flex flex-col gap-5'>
                    {
                        orderDetails?.map(el => {
                            return (
                                <div key={el.productId} className='bg-slate-100 flex justify-between items-center px-2'>
                                    <div className='flex gap-3'>
                                        <img
                                            src={el.image[0]}
                                            className='w-28 h-28 object-scale-down p-2'
                                            alt={el.name}/>
                                        <div>
                                            <div className='font-medium text-lg text-ellipsis line-clamp-1'>{el.name}</div>
                                            <div className='text-lg mt-1 text-lightFiskBlue'>{displayUSDCurrency(el.price)}</div>
                                        </div>
                                    </div>

                                    <label>
                                        <select value={data[el.productId] || 0} name={el.productId} onChange={handleOnChange} className='p-2 bg-slate-100 border-2 rounded' >
                                            <option value={0}>Select Rating</option>
                                            {
                                                ratingOptions.map(score => {
                                                    return (
                                                        <option value={score} key={score} onChange={handleOnChange}>{score}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>

                <button className='px-3 py-2 mt-5 w-fit bg-lightFiskBlue text-white hover:bg-fiskBlue transform hover:scale-110 transition-transform rounded' onClick={handleSubmit}>Submit Ratings</button>
            </form>
        </div>
    </div>
  )
}

export default RatingScreen