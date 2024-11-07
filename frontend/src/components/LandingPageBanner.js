import React from 'react'

const LandingPageBanner = () => {
  return (
    <div className='bg-slate-200 h-[380px] w-[561px] '> {/** Edit the margin to be respective to the screen size */}
        <p className='font-bold text-[50px] pt-8 pl-8'>
            <span className='block'>Fisk University</span>
            <span className='block'>MarketPlace</span>
        </p>
        <p className='pl-8 mt-1'>Unlock Value. Unlock Community</p>
        <button className='bg-lightFiskBlue text-white mx-10 mt-16'>
            <p className='p-4 text-lg'>Find Deals</p>
        </button>
    </div>
  )
}

export default LandingPageBanner