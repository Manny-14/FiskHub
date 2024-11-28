import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import UserProductCard from '../components/UserProductCard'
import UserUploadProduct from '../components/UserUploadProduct'

const Listings = () => {

    const [userListings, setUserListings] = useState([])
    const [openUploadProduct, setOpenUploadProduct] = useState(false)

    const fetchListings = async() => {
        const fetchData = await fetch(SummaryApi.get_listings.url, {
            method : SummaryApi.get_listings.method,
            credentials : "include"
        })

        const dataResponse = await fetchData.json()
        setUserListings(dataResponse?.data || [])
    }


    useEffect(()=> {
        fetchListings()
    },[])
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-lightFiskBlue text-lightFiskBlue hover:bg-lightFiskBlue hover:text-white transition-all py-1 px-3 rounded-full' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>


      { /** All Products */ }
      <div className='flex items-center flex-wrap gap-5 py-3 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          userListings.map((product, index) => {
            return (
              <UserProductCard data={product} key={product?._id} fetchData={fetchListings}/>
            )
          })
        }
      </div>

      {/**Upload Product component */}
      {
        openUploadProduct && (
          <UserUploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchListings}/>
        )
      }

    </div>
  )
}

export default Listings