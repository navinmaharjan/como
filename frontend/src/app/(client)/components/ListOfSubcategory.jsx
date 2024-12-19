import axios from 'axios';
import React from 'react'
import {Checkbox} from "@nextui-org/checkbox";


const ListOfSubcategory = async () => {
  //fetch all product list
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  const productList = await res.data

  //filter out only the product subcategory 
  const categorySet = new Set();
  const uniqueCategories = productList.data.filter((item) => {
    if (!categorySet.has(item.productSubcategory)) {
      categorySet.add(item.productSubcategory);
      return true;
    }
    return false;
  });
  return (
    <div className='border px-4 pb-2'>
        <div className='py-2'>
          <p className=' font-medium'>Filter By </p>
        </div>
        {uniqueCategories.map((item) => {
          return (
            <div className='flex gap-2'>
              <Checkbox radius='none' size='sm' ><span className='text-sm text-gray-500'>{item.productSubcategory}</span></Checkbox>
              {/* <p></p> */}
            </div>
          )
        })}
    </div>
  )
}

export default ListOfSubcategory