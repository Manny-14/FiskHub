import React from 'react'
import { useParams } from 'react-router-dom'

const ProductCategory = () => {
    const params = useParams()
    console.log("category")
    
  return (
    <div>
      {
        params.categoryName
      }
    </div>
  )
}

export default ProductCategory