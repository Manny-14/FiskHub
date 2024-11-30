import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginIcons from '../assets/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const ForgotPassword = () => {
    const [data, setData] = useState ({
        email : '',
    })

    const navigate = useNavigate()
    const { fetchUserDetails, fetchItemsCountInUserCart } = useContext(Context)

    const handleOnChange = (e) => {
        const {name, value} = e.target

        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.forgot_password.url, {
            method : SummaryApi.forgot_password.method,
            credentials : 'include',
            headers : {
                'content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        })

        const dataAPI = await dataResponse.json()

        if(dataAPI.success) {
            toast.success(dataAPI.message)
            navigate('/')
        } 

        if(dataAPI.error) {
            toast.error(dataAPI.message)
        }
    }

    
  return (
    <section id='forgotPassword'>
        <div className='h-[80vh] flex items-center'>
            <div className='bg-white p-2 py-5 w-full max-w-md mx-auto mt-4'>

                <form className='p-5 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email: </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type='email' 
                                placeholder='Enter email' 
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                className=' w-full h-full p-1 outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div>
                        <Link to={'/login'} className='block w-fit ml-auto hover:underline hover:text-fiskBlue'>
                            Back to Login Page
                        </Link>
                    </div>

                    <button className='bg-lightFiskBlue hover:bg-fiskBlue text-white px-6 py-2 max-w-[200px] rounded-full hover:scale-110 transition-transform mx-auto block mt-6'>Reset Password</button>
                </form>

                <p className='text-center mt-2'>Don't have an account? <Link to={'/sign-up'} className='hover:text-fiskBlue hover:underline'>Sign Up</Link></p>
            </div>

        </div>
    </section>
  )
}

export default ForgotPassword