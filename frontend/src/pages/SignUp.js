import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginIcons from '../assets/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react'
import imageToBase64 from '../helper/imageToBase64'
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState ({
        email : '',
        password : '',
        name : '',
        confirmPassword : '',
        profilePic : '',
    })

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const {name, value} = e.target

        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(data.password === data.confirmPassword){
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method : SummaryApi.signUp.method,
                headers : {
                    'content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            })
    
            const dataAPI = await dataResponse.json()

            if(dataAPI.success) {
                toast.success(dataAPI.message)
                navigate('/login') // Would probably need to change this to a welcome page of sorts
            }else if (dataAPI.error) {
                toast.error(dataAPI.message)
            }
    
        }else {
            toast.error("Password does not match")
        }

    }

    const handlueUploadPic = async(e) => {
        const file = e.target.files[0]

        const imagePic = await imageToBase64(file)
        setData((prev) => {
            return {
                ...prev,
                profilePic : imagePic
            }
        })
    }

  return (
    
    <section id='signup'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-2 py-5 w-full max-w-md mx-auto mt-4'>

                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || loginIcons} alt='login icons'/>
                    </div>
                    <form>
                        <label>
                            <div className='text-xs bg-opacity-85 bg-slate-200 py-1 cursor-pointer text-center absolute bottom-0 w-full'>
                                Upload Photo?
                            </div>
                            <input type='file' className='hidden' onChange={handlueUploadPic}/>
                        </label>
                        
                    </form>
                </div>

                <form className='p-5 flex flex-col gap-2' onSubmit={handleSubmit}>

                <div className='grid'>
                        <label>Name: </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type='text' 
                                placeholder='Enter your name' 
                                name='name'
                                value={data.name}
                                onChange={handleOnChange}
                                required
                                className=' w-full h-full p-1 outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div className='grid'>
                        <label>Email: </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type='email' 
                                placeholder='Enter email' 
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                required
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
                                required 
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
                    </div>

                    <div>
                        <label>Confirm Password: </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showConfirmPassword ? 'text' : 'password'} 
                                placeholder='Confirm password'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleOnChange} 
                                required
                                className='h-full w-full p-1 outline-none bg-transparent'/>
                            <div className='cursor-pointer text-2xl'>
                                <span>
                                    {
                                        showConfirmPassword ? (
                                        <FaEyeSlash onClick={() => setShowConfirmPassword(!showConfirmPassword)}/> 
                                        )
                                        : 
                                        (
                                        <FaEye onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <button className='bg-lightFiskBlue hover:bg-fiskBlue text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-transform mx-auto block mt-6'>Signup</button>
                </form>

                <p className='text-center mt-3'>Already have an account? <Link to={'/login'} className='hover:text-fiskBlue hover:underline'>Login</Link></p>
            </div>

        </div>
    </section>
  
  )
}

export default SignUp