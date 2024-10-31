import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'
const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProducts, setAllProducts] = useState([])

  const fetchAllProducts = async() => {
    const response = await fetch(SummaryApi.all_products.url)
    const dataResponse = await response.json()

    console.log("product data", response)

    setAllProducts(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProducts()
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
          allProducts.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProducts}/>
            )
          })
        }
      </div>

      {/**Upload Product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProducts}/>
        )
      }

    </div>
  )
}

export default AllProducts