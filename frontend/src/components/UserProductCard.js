import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import displayUSDCurrency from '../helper/displayCurrency';
import UserEditListing from './UserEditListing';
import { GiReceiveMoney } from "react-icons/gi";
import { RiErrorWarningLine } from 'react-icons/ri';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UserProductCard = ({
    data,
    fetchData
}) => {
    const [ editProduct, setEditProduct ] = useState(false)
    const [ clearProduct, setClearProduct] = useState(true)

    const [ openConfirmation, setOpenConfirmation ] = useState(false)


    return (
        <div>
            {
                data.sold === "true" ? (
                   <div>
                        {
                            clearProduct && (
                                <div>
                                    <div className='relative'>
                                        <span className='absolute bg-slate-300 opacity-40 w-full h-full cursor-pointer' onClick={()=>setOpenConfirmation(true)}/>
                                        <GiReceiveMoney className='absolute right-0 top-0 m-2 text-xl'/>
                                        <div className='bg-white p-4 - rounded'>
                                            <div className='w-40'>
                                                <div className='w-32 h-32 flex justify-center items-center mx-auto'>
                                                    <img src={data?.productImage[0]} width={120} height={120} className='object-fill h-full w-fit'/>
                                                </div>
                                                <h1 className='text-ellipsis line-clamp-1'>{data?.productName}</h1>
                                    
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
                                    </div>
            
                                    {
                                        openConfirmation && (
                                            <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-slate-500 bg-opacity-50'>
                                                <div className='w-3/5 h-[30vh] bg-white flex flex-col items-center justify-between p-6'>
            
                                                    <RiErrorWarningLine className='text-8xl text-red-600'/>
                                                    <p className='font-medium text-2xl'>Clear Sold Product</p>
                                                    <div className='flex gap-5 mt-4'>
                                                        <button className='px-6 py-1 border-2 border-lightFiskBlue bg-lightFiskBlue text-white rounded hover:bg-white hover:text-black transition-all' onClick={()=>setClearProduct(false)}>Yes</button>
                                                        <button className='px-6 py-1 border-2 border-lightFiskBlue rounded hover:text-white hover:bg-lightFiskBlue transition-all' onClick={()=>setOpenConfirmation(false)}>No</button>
                                                    </div>
            
                                                </div>
            
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                   </div>
                ) : (
                    <div className='bg-white p-4 - rounded'>
                        <div className='w-40'>
                            <div className='w-32 h-32 flex justify-center items-center mx-auto'>
                                <img src={data?.productImage[0]} width={120} height={120} className='object-fill h-full w-fit'/>
                            </div>
                            <h1 className='text-ellipsis line-clamp-1'>{data?.productName}</h1>
                
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
        </div>
    )
}

export default UserProductCard