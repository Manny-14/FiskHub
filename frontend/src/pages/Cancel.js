import React from 'react'
import failureImage from '../assets/failure.gif'
import { Link } from 'react-router-dom'


const Cancel = () => {
  return (
    <div className='bg-white w-full max-w-md mx-auto flex flex-col justify-center items-center p-4 gap-2 mix-blend-multiply m-2 rounded'>
        <img
            src={failureImage}
            width={300}
            height={300}
        />

        <p className='text-red-600 font-bold text-3xl'>Payment Failed!</p>

        <Link to={'/cart'} className='p-2 mt-5 px-3 rounded border-2 border-red-600 font-semibold text-red-600 hover:bg-red-600 hover:text-white transition-all'>Return to Cart</Link>
    </div>
  )
}

export default Cancel