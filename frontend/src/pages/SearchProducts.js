import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import DisplayProducts from '../components/DisplayProducts'

const SearchProducts = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("query", query.search)

    const fetchProduct = async() => {
        const response = await fetch(SummaryApi.search.url+query.search)
        const dataResponse = await response.json()

        setData(dataResponse.data)
        
        console.log("dataResponse from search product", dataResponse)
    }

    useEffect(() => {
        setLoading(true)
        fetchProduct()
        setLoading(false)
    },[query])
  return (
    <div className='container mx-auto p-4'>
        { 
            loading && (
                <div>
                    <p className='text-lg text-center'>Loading...</p>  
                    <DisplayProducts loading={loading} />
                </div>
            )
        }

        <p className='text-lg font-semibold my-3'> Search Results: {data.length}</p>
        {/** Loading Completed but no data found */}
        {
            data.length === 0 && !loading && (
                <p>No Matches Found...</p>
            )
        }

        {/** Loading Completed and data found */}
        {
            data.length !== 0 && !loading && (
                <DisplayProducts loading={loading} data={data}/>
            )
        }
    </div>
  )
}

export default SearchProducts