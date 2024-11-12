import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import { getCategoryLabel } from '../helper/productCategory'
import displayUSDCurrency from '../helper/displayCurrency'
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const context = useContext(Context)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const loadingCart = new Array(context.cartCount).fill(null)

    const fetchData = async() => {
        const response = await fetch(SummaryApi.view_cart.url, {
            method : SummaryApi.view_cart.method,
            credentials : 'include',
            headers : {
                'content-type' : 'application/json'
            }
        })

        const responseData = await response.json()

        if(responseData.success) {
            setData(responseData.data)
        }
    }

    const handleLoading = async() => {
        fetchData()
    }

    useEffect(()=> {
        setLoading(true)
        handleLoading()
        setLoading(false)
    },[])

    const handleRemoveProduct = async(id) => {
        const response = await fetch(SummaryApi.remove_product_from_cart.url, {
            method : SummaryApi.remove_product_from_cart.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify({
                _id : id,
            })
        })

        const responseData = await response.json()

        if(responseData.success) {
            fetchData()
            context.fetchItemsCountInUserCart()
        }
    }

    const totalPrice = data.reduce((prev, curr) => prev + (curr?.productId?.price), 0)

  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/** View Product */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (
                        loadingCart.map(el=>{
                            return (
                                <div key={el + "Cart Loading"} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>

                                </div>
                            )
                        })
                        
                    ) : (
                        data.map((product, index) => {
                            return (
                                <div key={product?._id} className='w-full bg-white my-2 h-32 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        {/** Remove Product from cart */}
                                        <div className='absolute right-1 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>handleRemoveProduct(product?._id)}>
                                            <MdDelete />
                                        </div>

                                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='text-slate-500'>{getCategoryLabel(product?.productId?.category)}</p>
                                        <p className='text-lightFiskBlue font-medium text-lg'>{displayUSDCurrency(product?.productId?.price)}</p>
                                    </div>
                                </div> 
                            )
                        })
                    )
                }
            </div>

            {/** Sum Total of items */}
            <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                {
                    loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                            
                        </div>
                    ) : (
                        <div className='h-36 bg-white'>
                            <h2 className='text-white bg-lightFiskBlue px-4 py-1'>Summary</h2>
                            <div className='flex items-center justify-between gap-2 px-4 font-medium text-lg text-slate-600'>
                                <p>Quantity</p>
                                <p>{context.cartCount} Items</p>
                            </div>
                            <div className='flex items-center justify-between gap-2 px-4 font-medium text-lg text-slate-600'>
                                <p>Total Price</p>
                                <p>{displayUSDCurrency(totalPrice)}</p>
                            </div>

                            <div className='w-full flex items-center justify-center mt-1'>
                                <button className='text-lightFiskBlue border-2 border-lightFiskBlue p-2 rounded-full px-5 hover:bg-lightFiskBlue hover:text-white transition-all'>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        
    </div>
  )
}

export default Cart