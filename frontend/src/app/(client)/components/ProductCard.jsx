'use client'

import Image from 'next/image';
import { IoMdStar } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/lib/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { Button } from '@nextui-org/react';

const ProductCard = ({ item }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const formattedProductName = item.productName.replace(/ /g, '-');
    const formattedsubCategory = item.productSubcategory.replace(/ /g, '-');
    return (
        <div key={item._id} className='cursor-pointer border'>
            <div onClick={() => router.push(`/shop/${item.productCategory}/${formattedsubCategory}/${formattedProductName}`)}>
                <div className='w-[235px] h-48 flex justify-center items-center overflow-hidden relative'>
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
                <div className='p-2 border-t'>
                    <p className='text-base font-medium'>{item.productName}</p>
                    <p className='text-xs font-normal text-gray-400'>{item.productSubcategory}</p>
                    <div className='flex gap-1 text-primaryColor'>
                        <IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar /><IoMdStar />
                    </div>
                    <p className='text-base font-medium text-gray-800'>${item.productSellPrice}</p>
                    <Button radius='none' size='sm' disableAnimation={true} className='bg-primaryColor text-white' onClick={() => dispatch(addToCart(item))}>Add To Cart</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard