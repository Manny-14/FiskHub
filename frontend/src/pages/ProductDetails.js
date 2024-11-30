import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import productCategory from '../helper/productCategory'
import productCondition from '../helper/productCondition'
import displayUSDCurrency from '../helper/displayCurrency'
import DisplayProductCategories from '../components/DisplayProductCategories'
import addToCart from '../helper/addToCart'
import { UseUser } from '../context'
import { FaStar, FaStarHalf } from 'react-icons/fa'

const ProductDetails = () => {

  const user = UseUser()
  const navigate = useNavigate()
  const [ data, setData ] = useState({
    productName : '',
    posterName : '',
    category : '',
    productImage : [],
    description : '',
    price : '',
    productCondition : '',
    posterRating : 0
  })

  const params = useParams()
  const [loading, setLoading] = useState(false)
  const imageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")
  const [zoomCoords, setZoomCoords] = useState({
    x : 0,
    y : 0
  })
  const [zoomImage, setZoomImage] = useState(false)
  const handleLeaveZoom = () => {
    setZoomImage(false)
  }


  const fetchProductDetails = async() => {
    const response = await fetch(SummaryApi.product_details.url, {
      method : SummaryApi.product_details.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })

    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }

  console.log("data from product details",data)


  useEffect(() => {
    setLoading(true)
    fetchProductDetails()
    setLoading(false)
  },[params])

  const handleMouseOnProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomCoords({
      x,
      y
    })
  },[zoomCoords])

  const handleAddToCart = async(e, id) => {
    await addToCart(e, id, user)
  }

  const handleBuy = async(e, id) => {
    handleAddToCart(e, id, user)
    navigate("/cart")
  }

  function getCategoryLabel(value) {
    const category = productCategory.find(item => item.value === value)
    return category ? category.label : 'Unknown Category'
  }

  function getConditionLabel(value) {
    const condition = productCondition.find(item => item.value === value)
    return condition ? condition.label : "Unknown Condition"
  }

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/** Product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveZoom}/>

            {/** Product Zoom */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0'>
                  <div
                    className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125'
                    style={{
                      backgroundImage : `url(${activeImage})`,
                      backgroundRepeat : 'no-repeat',
                      backgroundPosition : `${zoomCoords.x * 100}% ${zoomCoords.y * 100}%`
                    }}
                  >

                  </div>
                </div>
              )
            }
          </div>
          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    imageListLoading.map((el, index) =>{
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"Loading Image"+index}></div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data.productImage.map((imageURL, index) =>{
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imageURL}>
                          <img src={imageURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseOnProduct(imageURL)}/>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }

          </div>
        </div>

        {/** Product Details */}
        {
          loading ? (
            <div className='grid gap-2 w-full'>
              <p className='bg-slate-200 animate-pulse h-4 w-full rounded-full inline-block'>{/** Poster Name */}</p>
              {/** Put User start here */}
              <h2 className='text-2xl lg:4xl font-medium h-6 rounded bg-slate-200 animate-pulse'>{/** Product Name */}</h2>
              <p className='bg-slate-200 min-w-[100px] animate-pulse h-6 rounded'>{/**  Category */}</p>
              <p className='bg-slate-200 h-12 rounded animate-pulse'>{/** Price */}</p>
              <p className='bg-slate-200 h-5 animate-pulse rounded'>{/** Condition */}</p>

              <div className='flex items-center gap-3 my-2'> {/** Add to cart & Buy */}
                <button className='h-8 w-full bg-slate-200 animate-pulse rounded'></button>
                <button className='h-8 w-full rounded bg-slate-200 animate-pulse'></button>
              </div>

              <div className='flex flex-col gap-2'> {/** Description */}
                <p className='bg-slate-200 h-6 rounded animate-pulse'></p>
                <p className='bg-slate-200 h-10 rounded animate-pulse'></p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-lightFiskBlue text-gold px-2 rounded-full inline-block w-fit'>{data?.posterName}</p>
              {/** Put User start here */}
              <h2 className='text-2xl lg:4xl font-medium'>{data?.productName}</h2>
              <p className='text-slate-400'>{getCategoryLabel(data?.category)}</p>
              <p className='text-3xl font-medium text-lightFiskBlue'>{displayUSDCurrency(data?.price)}</p>
              <p>Condition: {getConditionLabel(data?.productCondition)}</p>

              {
                data?.posterRating > 0 && (
                  <div className='text-lightFiskBlue flex items-center gap-1 text-xl'>
                      {
                        <div className='flex items-center justify-center gap-1'>
                          <div>Seller Rating: {data.posterRating}</div>
                          <FaStar className='text-gold'/>
                        </div>
                      }
                  </div>
                )
              }

              <div className='flex items-center gap-3 my-2'>
                <button className='border-2 border-lightFiskBlue rounded px-3 py-1 min-w-[120px] text-lightFiskBlue font-medium hover:bg-lightFiskBlue hover:text-white hover:transition-all' onClick={(e)=> handleBuy(e, data._id)}>Buy</button>
                <button className='border-2 border-lightFiskBlue bg-lightFiskBlue text-white rounded px-3 py-1 min-w-[120px] font-medium hover:bg-white hover:text-lightFiskBlue hover:transition-all' onClick={(e) => handleAddToCart(e, data._id)}>Add to Cart</button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1'>Description: </p>
                <p>{data?.description}</p>
              </div>  
            </div>
          )
        }
      </div>


      {
        data.category && (
          <DisplayProductCategories category={data.category} heading={"Recommended Product"} />
        )
      }
    </div>
  )
}

export default ProductDetails