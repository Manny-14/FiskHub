import React, { useEffect, useState } from 'react'
import { FaRegCircleUser, FaStar } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { MdEdit } from "react-icons/md";
import imageToBase64 from '../helper/imageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { IoMdClose } from 'react-icons/io';

const UserProfile = () => {

    const user = useSelector(state => state?.user?.user)

    const [data, setData] = useState({
        userName : user?.name,
        userEmail : user?.email,
        profilePicture : user?.profilePic
    })


    const [edit, setEdit] = useState(false)
    useEffect(()=>{
        if (user) {
            setData({
                userName : user.name,
                userEmail : user.email,
                profilePicture : user.profilePic,
                rating : user.rating
            })
        }
    },[user])

    const handleUpdateProfilePicture = async(e) => {
        const file = e.target.files[0]

        const imagePic = await imageToBase64(file)
    
        console.log(file)
        setData((prev) => {
          return {
            ...prev,
            profilePicture : imagePic
          }
        })
    }

    const handleOnChange = (e) => {
        console.log("e", e)
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubmit = async() => {
        const response = await fetch(SummaryApi.user_update_profile.url, {
            method : SummaryApi.user_update_profile.method,
            credentials : 'include',
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const responseData = await response.json()

        if(responseData?.success) {
            setEdit(false)
            toast.success(responseData.message)
        }

        if(responseData?.error) {
            toast.error(responseData.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full h-[80vh]'>
        {
            edit ? (
                <form className='bg-white py-8 px-6 flex flex-col items-center justify-center shadow-md rounded-lg gap-10 relative' onSubmit={handleSubmit}>
                    <IoMdClose className='absolute right-0 top-0 m-3 text-2xl cursor-pointer hover:scale-110 transform transition-transform' onClick={()=>setEdit(false)}/>
                    <label htmlFor='profilePic' className='cursor-pointer relative'>
                        {
                            data?.profilePicture ? (
                            <img src={data?.profilePicture} className='w-24 h-24 rounded-full' alt={user?.name}/>
                            ) : (
                            <FaRegCircleUser className='w-24 h-24'/>
                            )
                        }
                        <div className='w-full h-12 overflow-hidden text-xs bg-opacity-85 bg-slate-200 py-1 rounded-b-full cursor-pointer text-center absolute bottom-0'>
                            Update Photo?
                        </div>
                    </label>
                    <input 
                        type='file' 
                        id='profilePic' 
                        className='hidden'
                        onChange={handleUpdateProfilePicture}
                    /> 

                    <div className='flex flex-col gap-7'>
                        <label className='flex items-center justify-between gap-5'>
                            <h2 className='text-2xl text-lightFiskBlue font-medium'>User Name : 
                                <input 
                                    type='text'
                                    className='ml-3 font-normal text-xl text-slate-700 p-2 bg-slate-100 border rounded'
                                    value={data.userName}
                                    name='userName'
                                    placeholder='enter a user name'
                                    onChange={handleOnChange}
                                    required
                                />
                            </h2>
                        </label>

                        <div className='flex items-center justify-between gap-6'>
                            <h2 className='text-2xl text-lightFiskBlue font-medium'>Email Adress : <span className='ml-3 font-normal text-xl text-slate-700'>{user?.email}</span></h2>
                        </div>
                    </div>

                    <button className='px-3 py-2 mt-5 bg-lightFiskBlue text-white hover:bg-fiskBlue rounded-full'>Update Profile</button>
                </form>
            ) : (
                <div className='bg-white py-8 px-6 flex flex-col items-center justify-center shadow-md rounded-lg gap-10 relative'>
                    <MdEdit className='absolute right-0 top-0 m-3 text-2xl cursor-pointer' onClick={()=>setEdit(true)}/>
                    <div className='flex items-center gap-10 border-b-2 pb-4 w-full'>
                        <div className='text-8xl'>
                            {
                                user?.profilePic ? (
                                <img src={user?.profilePic} className='w-24 h-24 rounded-full' alt={user?.name}/>
                                ) : (
                                <FaRegCircleUser/>
                                )
                            }
                        </div>
                        {
                            data.rating > 0 && (
                                <div className='flex items-center justify-center gap-1 text-3xl font-medium'>
                                    <div>{data.rating}</div>
                                    <FaStar className='text-gold'/>
                                </div>
                            )
                        }
                        </div>
                    <div>
                        <div className='flex flex-col gap-7'>
                            <div className='flex items-center justify-between gap-5'>
                                <h2 className='text-2xl text-lightFiskBlue font-medium'>User Name : <span className='ml-3 font-normal text-xl text-slate-700'>{user?.name}</span></h2>
                            </div>
                            <div className='flex items-center justify-between gap-6'>
                                <h2 className='text-2xl text-lightFiskBlue font-medium'>Email Adress : <span className='ml-3 font-normal text-xl text-slate-700'>{user?.email}</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UserProfile