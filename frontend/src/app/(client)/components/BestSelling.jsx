import axios from 'axios'
import ProductCard from './ProductCard';

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
            return (
             <ProductCard key={item._id} item={item} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BestSelling