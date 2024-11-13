import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helper/productCategory'
import DisplayProducts from '../components/DisplayProducts'
import SummaryApi from '../common'

const ProductCategory = () => {
    const params = useParams()
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlArray = urlSearch.getAll("category")

    const urlArrayObject = {}
    urlArray.forEach(el => {
      urlArrayObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlArrayObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState("")

    const fetchData = async() => {
      const response = await fetch(SummaryApi.filter_products.url, {
        method : SummaryApi.filter_products.method,
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()

      setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) => {
      const { name, value, checked } =  e.target

      setSelectCategory((prev) => {
        return {
          ...prev,
          [value] : checked
        }
      })
    }


    // Use effect for when filter list is updated works hand in hand with the one below
    // Should probably combine
    useEffect(() => {
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const categoryArray = Object.keys(selectCategory).map(categoryName => {
        if(selectCategory[categoryName]) {
          return categoryName
        }
        return null
      }).filter(el => el)
      
      setFilterCategoryList(categoryArray)

      // Format for url change when checkbox is changed
      const urlFormat = categoryArray.map((el, index) => {
        if((categoryArray.length - 1) === index){
          return `category=${el}`
        }
        return `category=${el}&&`
      })
      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])

    const handleSortBy = (e) => {
      const { value } = e.target
      setSortBy(value)
      if(value === 'asc') {
        setData(prev => prev.sort((a, b)=>a.price - b.price))
      }

      if(value === 'des') {
        setData(prev => prev.sort((a, b)=>b.price - a.price))
      }
    }

    // Useeffect for sortby
    useEffect(() => {

    },[sortBy])
    
  return (
    <div className='container mx-auto p-4'>
      {/** Desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/** Left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-150px)] overflow-y-scroll'>
          {/** Sort by */}
          <div className='text-lg'>
            <h3 className='uppercase font-medium text-slate-500 text-base border-b border-slate-300 pb-1'>Sort by</h3>

            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'asc'} value={'asc'} onChange={handleSortBy}/>
                <label> Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'des'} value={'des'} onChange={handleSortBy}/>
                <label> Price - High to Low</label>
              </div>
            </form>         
          </div>


          <div className='bg-white p-2 min-h-[calc(100vh-150px)]'>
            {/** Filter by */}
            <div className='text-lg'>
              <h3 className='uppercase font-medium text-slate-500 text-base border-b border-slate-300 pb-1'>Category</h3>

              <form className='text-sm flex flex-col gap-2 py-2'>
                {
                  productCategory.map((categoryName, inex)=>{
                    return (
                      <div className='flex items-center gap-3'>
                        <input type='checkbox' name={'category'} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                      </div>
                    )
                  })
                }
              </form>         
            </div>
          </div>
        </div>



        {/** Right side */}
        <div className='px-4'>

          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
          <div className='h-[calc(100vh-150px)] overflow-y-scroll scrollbar-none max-h-[calc(100vh-150px)]'>
            {
              data.length != 0 && (
                <DisplayProducts data={data} loading={loading} />
              )
            }
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ProductCategory