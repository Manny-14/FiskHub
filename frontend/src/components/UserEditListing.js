import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helper/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helper/uploadImage';
import DisplayImage from './DisplayImage';
import { TiDelete } from "react-icons/ti";
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import productCondition from '../helper/productCondition';
import { RiErrorWarningLine } from "react-icons/ri";

const UserEditListing = ({
    onClose,
    product,
    fetchData
}) => {
    const [data, setData] = useState({
        ...product,
        productName : product?.productName,
        posterName : product?.posterName,
        category : product?.category,
        productImage : product?.productImage || [],
        description : product?.description,
        price : product?.price,
        productCondition : product?.productCondition,
    })

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")
    const [openConfirmation, setOpenConfirmation] = useState(false)

    const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
        return {
        ...prev,
        [name] : value
        }
    })
    }

    const handleUploadProduct = async(e) => {
      const file = e.target.files[0]
      // setUploadProductImageInput(file.name) // commenting that out becaue idk if I would need it

      const uploadImageCloudinary = await uploadImage(file)

      setData((prev) => {
          return {
          ...prev,
          productImage : [ ...prev.productImage, uploadImageCloudinary.url]
          }
      })
    }

    const handleDeleteProductImage = async(index) => {
    console.log("image index", index)

    const newProductImage = [...data.productImage]
    newProductImage.splice(index, 1)

    setData((prev) => {
        return {
        ...prev,
        productImage : [...newProductImage]
        }
    })

    }

    {/** Upload product */}
    const handleSubmit = async(e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.user_update_listings.url, {
            method : SummaryApi.user_update_listings.method,
            credentials : 'include',
            headers : {
            "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const responseData = await response.json()

        if(responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }

        if(responseData.error) {
            toast.error(responseData?.message)
        }
    }
    
    const handleDeleteListing = async(e) => {

        const response = await fetch(SummaryApi.delete_listing.url, {
            method : SummaryApi.delete_listing.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const responseData = await response.json()

        if(responseData.success) {
          console.log("step1")
          toast.success(responseData?.message)
          console.log("step2")
          setOpenConfirmation(false)
          console.log("step 3")
          onClose()
          fetchData()
        }

        if(responseData.error) {
          toast.error(responseData?.message)
        }
    }

  
    return (
      <div className='fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[70%] overflow-hidden'>
          
          <div className='flex justify-between items-center pb-3'>
            <h2 className='font-bold text-lg'>Edit Product</h2>
            <div className='w-fit ml-auto text-2xl hover:text-lightFiskBlue cursor-pointer' onClick={onClose}>
              <IoMdClose />
            </div>
          </div>
  
          <form className='grid p-3 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
            <label htmlFor='productName'>Product Name: </label>
            <input 
              type='text' 
              id='productName' 
              placeholder='enter product name'
              name='productName' 
              value={data.productName} 
              onChange={handleOnChange} 
              className='p-2 bg-slate-100 border rounded'
              required
            />
  
            {/**Poster as in name of person who posted the product*/}
            <label htmlFor='posterName' className='mt-3'>Poster Name: </label>
            <input 
              type='text' 
              id='posterName' 
              placeholder='enter name of poster'
              name='posterName' 
              value={data.posterName} 
              onChange={handleOnChange} 
              className='p-2 bg-slate-100 border rounded'
              required
            />
  
            <label htmlFor='category' className='mt-3'>Category: </label>
            <select value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' required>
              <option value={""}>Select Category</option>
              {
                productCategory.map((el, index) => {
                  return (
                    <option value={el.value} key={el.value + index}>{el.label}</option>
                  )
                })
              }
            </select>
  
            <label htmlFor='productImage' className='mt-3'>Product Image: </label>
            <label htmlFor='uploadImageInput'>
              <div className='p-2 bg-slate-100 border rounded w-full h-32 flex items-center justify-center cursor-pointer'>
                  <div className='text-slate-500 flex flex-col justify-center items-center gap-2'>
                    <span className='text-4xl'><FaCloudUploadAlt/></span>
                    <p className='text-sm'>Upload Product Image</p>
                    <input 
                      type='file' 
                      id='uploadImageInput' 
                      className='hidden' 
                      onChange={handleUploadProduct}/> 
                      { /** Removed required might consider readding */ }
                  </div>
              </div>
            </label>
            <div>
              {
                data?.productImage[0] ? (
                  <div className='flex items-center gap-2'>
                    {
                      data.productImage.map((el, index) => {
                        return (
                          <div className='relative group'>
                            <img 
                              src={el} 
                              alt={el} // check this out later
                              width={80} 
                              height={80} 
                              className='bg-slate-100 border cursor-pointer' 
                              onClick={() => {
                                setOpenFullScreenImage(true)
                                setFullScreenImage(el)
                              }}
                            />
  
                            <div className='absolute bottom-0 right-0 p-1 text-gray-600 text-xl hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                              <TiDelete />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                ) : (
                  <p className='text-red-500 text-xs'>*Please Upload Product Image</p>
                )
              }
            </div>
  
            <label htmlFor='price' className='mt-3'>Price:</label>
            <input 
              type='number' 
              id='price' 
              placeholder='enter price of product'
              name='price' 
              value={data.price} 
              onChange={handleOnChange} 
              className='p-2 bg-slate-100 border rounded no-arrows'
              required
            />
  
            <label htmlFor='productCondition' className='mt-3'>Product Condition: </label>
            <select value={data.productCondition} name='productCondition' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded' required>
              <option value={""}>select product condition</option>
              {
                productCondition.map((el, index) => {
                  return (
                    <option value={el.value} key={el.value + index}>{el.label}</option>
                  )
                })
              }
            </select>
  
            <label htmlFor='description' className='mt-3'>Description:</label>
            <textarea 
              className='h-28 bg-slate-100 border resize-none p-1' 
              placeholder='enter product description' 
              rows={3} 
              onChange={handleOnChange}
              name='description'
              value={data.description}  
            >
  
            </textarea>
  
            {/** Decided against using selling price at this time */}
  
            <div className='flex gap-7 w-full mb-7 mt-3 items-center justify-center'>
                <button className='px-3 py-2 bg-lightFiskBlue text-white hover:bg-fiskBlue rounded'>Confirm Changes</button>
                <button 
                    type='button'
                    className='px-3 py-2 bg-lightFiskBlue text-white hover:bg-fiskBlue rounded' 
                    onClick={()=>setOpenConfirmation(true)}>Remove Listings</button>
            </div>
          </form>
  
        </div>
  
        {/** Display image full screen */}
  
        {
          openFullScreenImage && (
            <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
          )
        }

        {/** Confirmation Modal */}
        {
            openConfirmation && (
                <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-slate-500 bg-opacity-50'>
                    <div className='w-3/5 h-[30vh] bg-white flex flex-col items-center justify-between p-6'>

                        <RiErrorWarningLine className='text-8xl text-red-600'/>
                        <p className='font-medium text-2xl'>Are you sure you want to <br/> <span className='block text-center'>remove this product?</span></p>
                        <div className='flex gap-5 mt-4'>
                            <button className='px-6 py-1 border-2 border-lightFiskBlue bg-lightFiskBlue text-white rounded hover:bg-white hover:text-black transition-all' onClick={handleDeleteListing}>Yes</button>
                            <button className='px-6 py-1 border-2 border-lightFiskBlue rounded hover:text-white hover:bg-lightFiskBlue transition-all' onClick={()=>setOpenConfirmation(false)}>No</button>
                        </div>

                    </div>

                </div>
            )
        }
      </div>
    )
}
  
export default UserEditListing