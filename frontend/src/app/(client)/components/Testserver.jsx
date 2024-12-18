import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link';

const Testserver = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    const data = await res.data;
    const productList = data.data
    return (
        <div>
            {productList.map((item) => (
                <>
                    <Link key={item.id} href={`/shop?category=${item.productCategory}&subcategory=${item.productSubcategory}`}>
                        <Image src={item.productImage} alt='' width={1000} height={1000} className='w-32 h-32' />
                        <h1>{item.productName}</h1>
                    </Link>

                </>
            ))}
        </div>
    )
}

export default Testserver