import Image from 'next/image'
import ButtonComponent from './UI/ButtonComponent'
import Link from 'next/link'

const Banner = () => {
    return (
        <div className='relative w-full h-[300px] sm:h-[400px] md:h-[500px]'>
            <div className='absolute inset-0 z-10 flex justify-center items-center'>
                <div className='container mx-auto flex flex-col items-start gap-2'>
                    <h1 className='w-[50%] sm:w-[40%] text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-blackColor font-extrabold tracking-wide leading-6'>
                        Discover Your Perfect Bag at COMO
                    </h1>
                    <p className='w-[40%] sm:w-[35%] md:w-[30%] xl:w-[20%]  text-xs sm:text-sm'>Explore our diverse collection of bags designed for every member of your family.</p>
                    <div className='flex gap-2 mt-2'>
                        <ButtonComponent> <Link href={`/shop`}>Shop Now</Link></ButtonComponent>
                        {/* <ButtonComponent>Learn More</ButtonComponent> */}
                    </div>

                </div>
            </div>
            <Image
                src="/images/banner1.jpg"
                alt='Banner showcasing various bags available at COMO'
                width={2000}
                height={2000}
                className=' absolute w-full h-full object-cover'
                priority={true}
            />
        </div>
    )
}
export default Banner



