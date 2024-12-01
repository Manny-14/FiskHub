import React, { useEffect, useRef, useState } from 'react'
import fetchProductByCategory from '../helper/fetchProductByCategory'
import productCategory from '../helper/productCategory'
import displayUSDCurrency from '../helper/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addToCart from '../helper/addToCart'
import { UseUser } from '../context'
import scrollTop from '../helper/scrollTop'

const HorizontalCardProduct = ({category, heading}) => {

  const user = UseUser()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingList = new Array(8).fill(null)

  const [scroll, setScroll] = useState(0)
  const scrollElement = useRef()
  

  const fetchData = async() => {
    setLoading(true)
    const productCategory = await fetchProductByCategory(category)
    setLoading(false)

    setData(productCategory?.data)
  }

  useEffect(() => {
    fetchData()
  },[])

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }

  function getCategoryLabel(value) {
    const category = productCategory.find(item => item.value === value)
    return category ? category.label : 'Unknown Category'
  }

  return (
    <div className='container mx-auto px-4 my-6 relative'>

      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

      <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
      <button className='bg-white shadow-md rounded-full p-1 absolute left-1 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
      <button className='bg-white shadow-md rounded-full p-1 absolute right-1 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button>
        { 
          loading ? (
            loadingList.map((product, index) => {
              return (
                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                  <div className='bg-slate-200 h-full p-4 min-w-[120px] max-w-[130px] md:min-w-[145px] animate-pulse'>
                  </div>
                  <div className='p-4 grid w-full gap-2'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                    <p className='text-fiskBlue font-medium p-1 bg-slate-200 animate-pulse rounded-full'></p>
                    <button className='text-sm bg-lightFiskBlue text-white py-1 px-3 rounded-full w-full animate-pulse'></button>
                  </div>
                </div>
              )
            })
          ) : (
            data.map((product, index) => {
              return (
                <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex' onClick={scrollTop}>
                  <div className='bg-slate-200 h-full p-4 min-w-[120px] max-w-[130px] md:min-w-[145px]'>
                    <img src={product.productImage[0]} className='object-scale-down h-full  hover:scale-110 transition-all mix-blend-multiply'/>
                  </div>
                  <div className='p-4 grid'>
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
    </div>
  )
}

export default HorizontalCardProduct