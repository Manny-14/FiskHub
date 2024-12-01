import React, { useRef } from 'react'
import ProductCategoryList from '../components/ProductCategoryList'
import LandingPageBanner from '../components/LandingPageBanner'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {

  const products = useRef(null)

  const scrollToProducts = () => {
    if (products.current) {
      products.current.scrollIntoView({ behavior : 'smooth' })
    }
  }

  return (
    <div>
      <ProductCategoryList/>
      <div className='flex items-center m-5'>
        <LandingPageBanner handleFindDealsClick={scrollToProducts}/>
      </div>
      <div ref={products}>
        <VerticalCardProduct category={'furniture'} heading={'Funiture and Dorm Essentials'}/>
      </div>
      <VerticalCardProduct category={'electronics'} heading={'Electronic Devices'}/>
      <VerticalCardProduct category={'clothing'} heading={'Clothing and Accessories'} />
      <VerticalCardProduct category={'textbooks'} heading={'Textbook and Class Materials'} />

      <HorizontalCardProduct category={'stationeries'} heading={'Stationeries'} />
      <HorizontalCardProduct category={'entertainment'} heading={'Entertainment'}/>
      <HorizontalCardProduct category={'sports'} heading={'Sporting Equipments'} />
      <HorizontalCardProduct category={'arts'} heading={'Arts and Crafts'} />
    </div>
  )
}

export default Home