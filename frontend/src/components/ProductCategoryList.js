import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const ProductCategoryList = () => {
    const [productCategory, setProductCategory] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(8).fill(null)

    const fetchProductCategory = async() => {
        setLoading(true)
        const response = await fetch(SummaryApi.product_category.url)
        const dataResponse = await response.json()
        setLoading(false)
        setProductCategory(dataResponse.data)
    }

    useEffect(() => {
        fetchProductCategory()
    },[])


  return (
    <div className='shadow-sm p-3'>
        <div className='container mx-auto'>
            <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
                {
                    loading ? (
                        categoryLoading.map((el, index) => {
                            return (
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" + index}>       
                                </div>
                            )
                        })
                    ) : 
                    (
                        productCategory.map((product, index) => {
                            // Product is a list of one element because of the way the data is fetched so you always have to put product[0] to get your result
                            // Decided to specify product = product[0] before referencing it elsewhere
                            product = product[0]
                            return (
                                <Link to={"/product-category/" + product?.category} className='cursor-pointer' key={product?.category + index}>
                                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                        <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transistion-all'/>
                                    </div>
                                    <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default ProductCategoryList