import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc
}) => {
    const[userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e) => {
      setUserRole(e.target.value)

      console.log(e.target.value)
    }


    const updateUserRole = async() => {
      const fetchResponse = await fetch(SummaryApi.update_user.url, {
        method : SummaryApi.update_user.method,
        credentials : 'include',
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify({
          userId : userId,
          role : userRole
        })
    })

    const responseData = await fetchResponse.json() // Add error handling for when a user is not logged in

    if(responseData.success) {
      toast.success(responseData.message)
      onClose()
      callFunc()
    }

    console.log("role updated", responseData)

    }

  return (
    // The class below originally had justify-between
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full  flex justify-center items-center bg-slate-200 bg-opacity-50'>
      <div /** This had mx-auto*/className='bg-white shadow-md p-4 w-full max-w-sm'>
        
        <button className='block ml-auto' onClick={onClose}>
          <IoMdClose />
        </button>
        
        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
          <p>Name: {name}</p>
          <p>Email: {email}</p>

          <div className='flex justify-between items-center my-4'>
            <p className='mr-2'>Role :</p>
            <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>

              {
                Object.values(ROLE).map(el => {
                  return(
                    <option value={el} key={el}>{el}</option>
                  )
                })
              }

            </select>
          </div>

          <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-lightFiskBlue text-white hover:bg-fiskBlue'onClick={updateUserRole}>Change Role</button>
      </div>
      
    </div>
  )
}

export default ChangeUserRole