// This component is not in use currently

import React, { useState } from 'react'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import image1 from '../assets/amit_assets/assest/banner/img1.webp'
import image1Mobile from '../assets/amit_assets/assest/banner/img1_mobile.jpg'

const BannerProduct = () => {

    const [currentImage, setCurrentImage] = useState(0)

    // to put all your banner images when you find them
    const desktopImages = []
    const mobileImages = []

    const prevImage = () => {
        if(currentImage > 0) {
            setCurrentImage(prev => prev - 1)
        }
    }
    const nextImage = () => {
        if(desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1)
        }
    } 
  return (
    <div className='container mx-auto px-4'>
        <div className='h-60 md:h-72 w-full bg-slate-200 relative'>

            <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className='flex justify-between w-full text-2xl px-1'>
                    <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft/></button>
                    <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight/></button>
                </div>
            </div>

            {/** Desktop and Tablet Banner Version 
             * Find Mobile version details in MERN app since I am not using this
            */}
            <div className='flex h-full w-full overflow-hidden'>
                {
                    desktopImages.map((imageURL, index) => {
                        return (
                            <div className='min-w-full min-h-full transition-all' key={imageURL} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURL} className='w-full h-full'/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default BannerProduct