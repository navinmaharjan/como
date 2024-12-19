import React from 'react'
import AllProducts from '../components/AllProducts'
import ListOfCategory from '../components/ListOfCategory'
import ListOfSubcategory from '../components/ListOfSubcategory'
import PriceSlider from '../components/PriceSlider'
import ButtonComponent from '../components/UI/ButtonComponent'

const Shop = () => {
  return (
    <div>
      <div className='container mx-auto flex gap-4 p-4'>
        <div className='w-[18%] flex flex-col gap-4'>
          <ListOfCategory />
          <ListOfSubcategory />
          <PriceSlider />
          <ButtonComponent>Search</ButtonComponent>
        </div>
        <div className='w-[82%]'>
          
          <AllProducts />
        </div>
        <div>
        </div>
      </div>
    </div>


  )
}

export default Shop