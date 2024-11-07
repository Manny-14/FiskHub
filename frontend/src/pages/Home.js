import React from 'react'
import ProductCategoryList from '../components/ProductCategoryList'
import LandingPageBanner from '../components/LandingPageBanner'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <ProductCategoryList/>
      <LandingPageBanner />
      <VerticalCardProduct category={'furniture'} heading={'Funiture and Dorm Essentials'}/>
      <VerticalCardProduct category={'electronics'} heading={'Electronic Devices'}/>

      <HorizontalCardProduct category={'stationeries'} heading={'Stationeries'} />
      <HorizontalCardProduct category={'textbooks'} heading={'Textbook and Class Materials'} />
      <HorizontalCardProduct category={'entertainment'} heading={'Various Forms of Entertainment'}/>
      <HorizontalCardProduct category={'sports'} heading={'Sporting Equipments'} />
      <HorizontalCardProduct category={'clothing'} heading={'Clothing and Accessories'} />
      <HorizontalCardProduct category={'arts'} heading={'Arts and Crafts'} />
    </div>
  )
}

export default Home