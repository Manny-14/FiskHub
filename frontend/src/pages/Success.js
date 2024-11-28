import React from 'react'
import successImage from '../assets/success.gif'
import { Link } from 'react-router-dom'


const Success = () => {
  return (
    <div className='bg-white w-full max-w-md mx-auto flex flex-col justify-center items-center p-4 gap-2 mix-blend-multiply m-2 rounded'>
        <img
            src={successImage}
            width={300}
            height={300}
        />

        <p className='text-green-600 font-bold text-3xl'>Payment Successful</p>

        <Link to={'/order'} className='p-2 mt-5 px-3 rounded border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white transition-all'>View Order</Link>
    </div>
  )
}

export default Success