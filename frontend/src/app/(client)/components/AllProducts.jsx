'use client'

import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoMdStar } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import ButtonComponent from './UI/ButtonComponent'
import { Pagination, Select, SelectItem, Spinner } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';

const AllProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParams = parseInt(searchParams.get('page'));
  const [productList, setProductList] = useState([]);
  const [totalPage, setTotalPage] = useState()
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async (page = 1, limit = 10) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        params: {
          page: page,
          limit: limit,
          // sortBy: sortBy,
          // ...(categoryFilter && { category: categoryFilter })
        }
      });
      const result = response.data;
      setProductList(result.data);
      setTotalPage(Math.ceil(result.totalCount / limit));
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const customStyle = {
    base: "bg-default-500 border border-gray-300",
  };

  const handlePageChange = (page) => {
    router.push(`/shop?page=${page}`)
  }

  useEffect(() => {
    fetchProducts(pageParams)
  }, [pageParams]);

  // const handleSorting = (sort) => {
  //   setSortingFilter(sort);
  //   fetchProducts(currentPage, 10, sort);
  // };
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
                  <Select
                    aria-label="Select"
                    radius="none"
                    placeholder="Relevance"
                    classNames={{
                      base: customStyle.base,
                    }}
                    size="sm"
                    // value={sortingFilter}
                    // onChange={(e) => handleSorting(e.target.value)}
                  >
                    <SelectItem key="name-a-to-z" value="name-a-to-z">Name, A-Z</SelectItem>
                    <SelectItem key="name-z-to-a" value="name-z-to-a">Name, Z-A</SelectItem>
                    <SelectItem key="price-low-to-high" value="price-low-to-high">Price low to high</SelectItem>
                    <SelectItem key="price-high-to-low" value="price-high-to-low">Price high to low</SelectItem>

                  </Select>
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
          productList.map((item, index) => {
            const formattedProductName = item.productName.replace(/ /g, '-');
            const formattedsubCategory = item.productSubcategory.replace(/ /g, '-');
            return (
              <div key={index} className='cursor-pointer border'>
                <Link  href={`/shop/${item.productCategory}/${formattedsubCategory}/${formattedProductName}`}>
                  <div  className='w-[185px] h-[150px] flex justify-center items-center overflow-hidden relative'>
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
          total={2}
          radius="full"
          size="sm"
          initialPage={pageParams}
          onChange={handlePageChange}
          classNames={{
            cursor: "bg-orange-700",
          }}
        />
       
      </div>
    </div>
  )
}

export default AllProducts
