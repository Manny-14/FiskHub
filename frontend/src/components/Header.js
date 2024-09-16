import React from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Header = () => {
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

        <div className='flex items-center gap-6'>

          <div className='text-3xl cursor-pointer'>
            <FaRegCircleUser/>
          </div>

          <div className='text-2xl relative'>
            <span><FaShoppingCart/></span>

            <div className='bg-lightFiskBlue text-white rounded-full w-5 h-5 p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-xs'>0</p>
            </div>
          </div>

          <div>
            <Link to={'/login'} className='bg-lightFiskBlue transition duration-300 ease-in-out transform hover:bg-fiskBlue text-white px-3 py-1 rounded-full'>Login</Link>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header