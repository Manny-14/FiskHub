import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayUSDCurrency from '../helper/displayCurrency';
import UserEditListing from './UserEditListing';

const UserProductCard = ({
    data,
    fetchData
}) => {
    const [ editProduct, setEditProduct ] = useState(false)


    return (
      <div className='bg-white p-4 - rounded'>
          <div className='w-40'>
              <div className='w-32 h-32 flex justify-center items-center mx-auto'>
                  <img src={data?.productImage[0]} width={120} height={120} className='object-fill h-full w-fit'/>
              </div>
              <h1 className='text-ellipsis line-clamp-2'>{data?.productName}</h1>
  
              <div>
                  <p className='font-semibold'>
                      {
                          displayUSDCurrency(data.price)
                      }
                  </p>
  
                  
                  <div className='w-fit ml-auto p-1 bg-green-100 hover:bg-green-500 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                      <MdEdit />
                  </div>
              </div>
          </div>
  
          {
              editProduct && (
                  <UserEditListing product={data} onClose={() => setEditProduct(false)} fetchData={fetchData}/>
              )
          }
      </div>
    )
}

export default UserProductCard