'use client'

import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import ButtonComponent from './UI/ButtonComponent'

const BestSelling = () => {
  const router = useRouter()
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchFeaturedProduct = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      setProductList(data.data.filter(item => item.isBestSelling))
    }
    fetchFeaturedProduct()
  }, [])
  return (
    <div>
      <div className='container mx-auto pt-4 pb-12'>
        <div className='w-full flex justify-between items-center'>
          <div className='flex flex-col justify-center items-start gap-1'>
            <p className='text-lg sm:text-xl font-semibold'>Bestseller Products</p>
            <div className='w-[140px] h-[2px] bg-primaryColor'></div>
          </div>
          {/* <p className='text-gray-400'>See All</p> */}
        </div>
        <div className=' w-full grid grid-cols-5 justify-between items-center gap-4 pt-4'>
          {productList.map((item, index) => (
            <div className='cursor-pointer border' onClick={() => router.push(`/shop?category=${item.productCategory}&subcategory=${item.productSubcategory}&product=${item.productName}`)}>
              <div key={index} className='w-[235px] h-48 flex justify-center items-center overflow-hidden relative'>
                <Image
                  src={item.productImage}
                  alt='Banner showcasing various bags available at COMO'
                  width={2000}
                  height={2000}
                  className='absolute w-full h-full object-cover'
                  priority={true}
                />
                <Link href="/"><IoMdHeartEmpty className='absolute top-2 left-2 text-primaryColor' /></Link>
              </div>
              <div className='p-2 border-t'>
                <p className='text-base font-medium'>{item.productName}</p>
                <p className='text-xs font-normal text-gray-400'>{item.productSubcategory}</p>
                <div className='flex gap-1 text-primaryColor'><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /></div>
                <p className='text-base font-medium text-gray-800'>${item.productSellPrice}</p>

                <ButtonComponent>Add To Cart</ButtonComponent>


              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BestSelling