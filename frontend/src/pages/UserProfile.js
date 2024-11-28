import React from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

const UserProfile = () => {

    const user = useSelector(state => state?.user?.user)
    console.log(user)
  return (
    <div className='bg-slate-200 flex items-center justify-center w-full h-[80vh]'>
        <div className='bg-white p-4 flex flex-col items-center justify-center shadow-md rounded-lg gap-6'>
            <div className='text-5xl'>
                {
                    user?.profilePic ? (
                    <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name}/>
                    ) : (
                    <FaRegCircleUser/>
                    )
                }
                </div>
            <div className='flex gap-7'>
                <div>
                    <h2 className='text-3xl'>{user?.name}</h2>
                    <h2 className='text-slate-500'>{user?.email}</h2>
                </div>
                <div>User Rating</div>
            </div>
            <button className='rounded-full bg-lightFiskBlue text-white px-5 py-2'>Update Profile</button>
        </div>
    </div>
  )
}

export default UserProfile