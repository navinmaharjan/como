import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link';
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import ButtonComponent from './UI/ButtonComponent'

const BestSelling = async () => {
  //fetch all product list
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  const productList = await res.data
  const bestSellingProducts = productList.data.filter(item => item.isBestSelling)

  return (
    <div>
      <div className='container mx-auto pt-4 pb-12'>
        <div className='w-full flex justify-between items-center'>
          <div className='flex flex-col justify-center items-start gap-1'>
            <p className='text-lg sm:text-xl font-semibold'>Bestseller Products</p>
            <div className='w-[140px] h-[2px] bg-primaryColor'></div>
          </div>
        </div>
        <div className=' w-full grid grid-cols-5 justify-between items-center gap-4 pt-4'>
          {bestSellingProducts.map((item) => {
            const formattedProductName = item.productName.replace(/ /g, '-');
            const formattedsubCategory = item.productSubcategory.replace(/ /g, '-');
            return (
              <div key={item.id} className='cursor-pointer border'>
                <Link href={`/shop/${item.productCategory}/${formattedsubCategory}/${formattedProductName}`}>
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
                    <ButtonComponent>Add To Cart</ButtonComponent>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BestSelling