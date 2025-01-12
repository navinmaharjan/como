import axios from 'axios'
import ProductCard from './ProductCard';

const Featured = async () => {
    //fetch all product list
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    const productList = await res.data
    const featuredProduct = productList.data.filter(item => item.isFeatured)

    return (
        <div className='bg-secondaryColor border-t'>
            <div className='container mx-auto py-8'>
                <div className='w-full flex justify-between items-center'>
                    <div className='flex flex-col justify-center items-start gap-1'>
                        <p className='text-lg sm:text-xl font-semibold'>Featured Products</p>
                        <div className='w-[90px] h-[2px] bg-primaryColor'></div>
                    </div>
                </div>
                <div className=' w-full py-8 grid grid-cols-5 justify-between items-center gap-4'>
                    {featuredProduct.map((item) => {
                        return (
                           <ProductCard key={item._id} item = {item} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Featured


// const router = useRouter()
//     const [productList, setProductList] = useState([]);
//     console.log(productList)

//     useEffect(() => {
//         const fetchFeaturedProduct = async () => {
//             const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
//             setProductList(data.data.filter(item => item.isFeatured))
//         }
//         fetchFeaturedProduct()
//     }, [])


// onClick={() => router.push(`/shop?category=${item.productCategory}&subcategory=${item.productSubcategory}&product=${item.productName}`)}


// ---------------------Product Card
{/* <div key={item._id} className='cursor-pointer border'>
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
        <div onClick={(e) => {
                e.stopPropagation();
                
            }}>
            <ButtonComponent>Add To Cart</ButtonComponent>
        </div>
    </div>
</Link>
</div> */}


