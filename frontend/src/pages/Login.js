import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginIcons from '../assets/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState ({
        email : '',
        password : ''
    })

    const navigate = useNavigate()
    const { fetchUserDetails } = useContext(Context)

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

        const dataResponse = await fetch(SummaryApi.signin.url, {
            method : SummaryApi.signin.method,
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
            fetchUserDetails()
        } 

        if(dataAPI.error) {
            toast.error(dataAPI.message)
        }
    }

    
  return (
    <section id='login'>
        <div className='mx-auto container px-4'>
            <div className='bg-white p-2 py-5 w-full max-w-md mx-auto mt-4'>

                <div className='w-20 h -20 mx-auto overflow-hidden rounded-full'>
                    <img src={loginIcons} alt='login icons'/>
                </div>

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
                        <label>Password: </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder='Enter password'
                                name='password'
                                value={data.password}
                                onChange={handleOnChange} 
                                className='h-full w-full p-1 outline-none bg-transparent'/>
                            <div className='cursor-pointer text-2xl'>
                                <span>
                                    {
                                        showPassword ? (
                                        <FaEyeSlash onClick={() => setShowPassword(!showPassword)}/> 
                                        )
                                        : 
                                        (
                                        <FaEye onClick={() => setShowPassword(!showPassword)}/>
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-fiskBlue'>
                            Forgot Password
                        </Link>
                    </div>

                    <button className='bg-lightFiskBlue hover:bg-fiskBlue text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-transform mx-auto block mt-6'>Login</button>
                </form>

                <p className='text-center mt-3'>Don't have an account? <Link to={'/sign-up'} className='hover:text-fiskBlue hover:underline'>Sign Up</Link></p>
            </div>

        </div>
    </section>
  )
}

export default Login