import React, { useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';


const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
 

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()


    if(data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }

    if(data.error) {
      toast.error(data.message)
    }
  }
  return (
    <header className='h-17 shadow-md bg-gold'>
      <div className='container mx-auto flex items-center h-full px-2 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo w={100} h={70}/>
          </Link>  
        </div>

        <div className='hidden md:flex items-center w-full justify-between max-w-sm border rounded-full border-goldGray focus-within:shadow pl-2'>
          <input type='text' placeholder='search products here...' className='bg-gold w-full outline-none'/>
          <div className='text-lg text-gray-200 min-w-[50px] h-8 bg-lightFiskBlue flex items-center justify-center rounded-r-full'>
            <GrSearch/>
          </div>
        </div>

        <div className='flex items-center gap-7'>

          <div className='relative flex justify-center'>
            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(prev => !prev)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user.name}/>
                    ) : (
                      <FaRegCircleUser/>
                    )
                  }
                </div>
              )
            }

              {
                menuDisplay && (
                  <div className=' absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                    <nav>
                      {
                        user?.role === ROLE.ADMIN && (
                          <Link to={"admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                        )
                      }
                    </nav>
                  </div>
                )
              }
          </div>

          <div className='text-2xl relative'>
            <span><FaShoppingCart/></span>

            <div className='bg-lightFiskBlue text-white rounded-full w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-xs'>0</p>
            </div>
          </div>

          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='bg-lightFiskBlue transition duration-300 ease-in-out transform hover:bg-fiskBlue text-white px-3 py-1 rounded-full'>Logout</button>
              ) : (
                <Link to={'/login'} className='bg-lightFiskBlue transition duration-300 ease-in-out transform hover:bg-fiskBlue text-white px-3 py-1 rounded-full'>Login</Link>
              )
            }
            
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header