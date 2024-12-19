'use client'

import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoMdStar } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import ButtonComponent from './UI/ButtonComponent'
import ShopSelect from './ShopSelect';
import { Pagination, Spinner } from '@nextui-org/react';


const AllProducts = () => {
  const [productList, setProductList] = useState([]);
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // const [categoryFilter, setCategoryFilter] = useState('');

  const fetchProducts = async (page = 1, limit = 10) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        params: {
          page: page,
          limit: limit,
          // ...(categoryFilter && { category: categoryFilter })
        }
      });
      const result = response.data;
      setProductList(result.data);
      setTotalPage(Math.ceil(result.totalCount / limit));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

   useEffect(() => {
      fetchProducts();
    }, []);

    const handlePageChange = (page) => {
      fetchProducts(page, 10);
    };
  return (
    <div className=''>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-center items-start gap-1 w-full">
          <div className='flex justify-between items-center w-full'>
            <p className="text-lg sm:text-xl font-semibold">All Products</p>
            <div className="flex items-center gap-2">
              <div className='flex items-center w-[248px]'>
                <div className='w-[80px]'>
                  <p className=" text-sm">Sort By:</p>
                </div>
                <div className='w-full'>
                  <ShopSelect />
                </div>
              </div>
            </div>
          </div>
          {/* <p className='text-xs text-gray-500'>Discover our favorites fashionable discoveries, a selection of cool items to integrate in your wardrobe. Compose a unique style with personality which matches your own.</p> */}
        </div>
      </div>
      <div className='h-[1px] bg-gray-300 w-full my-4'></div>
      <div className=" w-full grid grid-cols-2 sm:grid-cols-5 justify-center items-center gap-4">
      {isLoading ? (
          <div className="flex justify-center items-center h-[730px]">
            <Spinner size="sm" />
          </div>
        ) : (
        productList.map((item) => {
          const formattedProductName = item.productName.replace(/ /g, '-');
          const formattedsubCategory = item.productSubcategory.replace(/ /g, '-');
          return (
            <div key={item.id} className='cursor-pointer border'>
              <Link href={`/shop/${item.productCategory}/${formattedsubCategory}/${formattedProductName}`}>
                <div className='w-[185px] h-[150px] flex justify-center items-center overflow-hidden relative'>
                  <Image
                    src={item.productImage}
                    alt={`Image of ${item.productName}`}
                    width={2000}
                    height={2000}
                    className='absolute w-full h-full object-cover'
                    priority={true}
                  />
                  <IoMdHeartEmpty className='absolute top-2 left-2 text-primaryColor' />
                </div>
                <div className='p-2'>
                  <p className='text-sm font-medium h-10'>{item.productName}</p>
                  <p className='text-xs font-normal text-gray-400'>{item.productSubcategory}</p>
                  <div className='flex gap-1 text-primaryColor'>
                    <IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar />
                  </div>
                  <p className='font-medium text-gray-800'>${item.productSellPrice}</p>
                  <ButtonComponent>Add To Cart</ButtonComponent>
                </div>
              </Link>
            </div>
          )
        })
      )}
      </div>
      <div className="w-full flex justify-center items-center mt-4">
        <Pagination
          showControls
          loop
          total={totalPage}
          radius="full"
          size="sm"
          onChange={handlePageChange}
          classNames={{
            cursor:"bg-orange-700",
          }}
        />
      </div>
    </div>
  )
}

export default AllProducts
