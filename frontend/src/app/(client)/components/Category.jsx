import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const Category = async () => {
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

        <div>
            <div className="container mx-auto py-8">
                <div className="w-full flex justify-between items-center mb-4">
                    <div className="flex flex-col justify-center items-start gap-1">
                        <p className="text-lg sm:text-xl font-semibold">Shop By Category</p>
                        <div className="w-[90px] h-[2px] bg-primaryColor"></div>
                    </div>
                </div>
                <div className=" w-full py-8 grid grid-cols-2 sm:grid-cols-5 justify-center items-center gap-4">
                    {uniqueCategories.slice(0, 5).map((item) => {
                        const formattedsubCategory = item.productSubcategory.replace(/ /g, '-');
                        return (
                            <div key={item._id} className="overflow-hidden">
                                <Link
                                    href={`/shop/${item.productCategory}/${formattedsubCategory}`}
                                    className="w-[240px] h-[200px] flex justify-center items-center overflow-hidden relative">
                                    <Image
                                        src={item.productImage}
                                        alt="Banner showcasing various bags available at COMO"
                                        width={2000}
                                        height={2000}
                                        className="absolute w-full h-full object-cover"
                                        priority={true}
                                    />
                                </Link>
                                <p className="text-sm text-center text-blackColor font-semibold px-4 py-2">
                                    {item.productSubcategory}
                                </p>
                            </div>
                        )

                    })}
                </div>
            </div>
        </div>
    );
};

export default Category;



// const [productList, setProductList] = useState([]);
// const [categoryList, setCategoryList] = useState([]);
// const fetchCategory = async () => {
//     const { data } = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/products`
//     );
//     setProductList(data.data);
// };
// useEffect(() => {
//     fetchCategory();
// }, []);
// useEffect(() => {
//     const categorySet = new Set();
//     const uniqueCategories = productList.filter((item) => {
//         if (!categorySet.has(item.productSubcategory)) {
//             categorySet.add(item.productSubcategory);
//             return true;
//         }
//         return false;
//     });
//     setCategoryList(uniqueCategories);
// }, [productList]);



// swiper module

{/* <Swiper
fadeEffect={{ crossFade: false }}
centeredSlides={false}
autoplay={{
    delay: 2500,
    disableOnInteraction: false,
}}
pagination={{
    clickable: true,
}}
navigation={false}
modules={[Autoplay, Pagination, Navigation]}
loop={true}
style={{
    "--swiper-pagination-color": "#F2AB37",
    "--swiper-pagination-bullet-inactive-color": "#ABAEB0",
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-size": "4px",
    "--swiper-pagination-bullet-horizontal-gap": "4px",
    "--swiper-pagination-top": "230px"
}}

breakpoints={{
    640: {
        slidesPerView: 1,
        spaceBetween: 0,
    },
    768: {
        slidesPerView: 1,
        spaceBetween: 0,
    },
    1024: {
        slidesPerView: 5,
        spaceBetween: 20,
    },
}}
>   </Swiper> */}