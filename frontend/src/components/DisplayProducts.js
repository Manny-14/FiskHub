import React from 'react'
import scrollTop from '../helper/scrollTop'
import displayUSDCurrency from '../helper/displayCurrency'
import { getCategoryLabel } from '../helper/productCategory'
import addToCart from '../helper/addToCart'
import { Link } from 'react-router-dom'
import { UseUser } from '../context'

const DisplayProducts = ({loading, data=[]}) => {
    const user = UseUser()
    const loadingList = new Array(13).fill(null)
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,280px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
      
        {
          loading ? (
            loadingList.map((product, index) => {
                return (
                  <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                    </div>
                    <div className='p-4 grid gap-3'>
                      <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 p-1 py-2 animate-pulse rounded-full'></h2>
                      <p className='capitalize text-slate-500 text-ellipsis line-clamp-1 bg-slate-200 p-1 animate-pulse rounded-full py-1.5'></p>
                      <p className='text-fiskBlue font-medium bg-slate-200 p-1 animate-pulse rounded-full py-1.5'></p>
                      <button className='text-sm bg-lightFiskBlue hover:bg-fiskBlue text-white py-2 px-3 animate-pulse rounded-full'></button>
                    </div>
                  </div>
                )
              })
          ) : (
            data.map((product, index) => {
                return (
                  <Link to={`/product/${product?._id || ''}`} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollTop}>
                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                      <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                    </div>
                    <div className='p-4 grid gap-3'>
                      <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                      <p className='capitalize text-slate-500 text-ellipsis line-clamp-1'>{getCategoryLabel(product?.category)}</p>
                      <p className='text-fiskBlue font-medium'>{ displayUSDCurrency(product?.price) }</p>
                      <button className='text-sm bg-lightFiskBlue hover:bg-fiskBlue text-white py-1 px-3 rounded-full' onClick={(e) => addToCart(e, product?._id, user)}>Add to Cart</button>
                    </div>
                  </Link>
                )
              })
          )
        }
      </div>
  )
}

export default DisplayProducts