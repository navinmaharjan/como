import Image from 'next/image'
import React from 'react'
import ButtonComponent from './UI/ButtonComponent'

const Advertisement = () => {
    return (
        <div className='relative w-full h-[300px] sm:h-[400px] md:h-[500px]'>
            {/* <div className='absolute inset-x-0 w-1/2 z-10 flex justify-center items-center'>
                <div className='container mx-auto flex flex-col items-start bg-red-400 gap-2'>
                    <h1 className='w-full text-2xl bg-blue-200 sm:text-3xl md:text-4xl xl:text-5xl text-blackColor font-extrabold tracking-wide leading-6'>
                        Discover Your Perfect Bag at COMO
                    </h1>
                    <p className='w-full bg-green-200  text-xs sm:text-sm'>Explore our diverse collection of bags designed for every member of your family.</p>
                    <div className='flex gap-2 mt-2'>
                        <ButtonComponent>Shop Now</ButtonComponent>
                    </div>
                </div>
            </div> */}
            <Image
                src="/images/advertisement.jpg"
                alt='Banner showcasing various bags available at COMO'
                width={2000}
                height={2000}
                className=' absolute w-full h-full object-cover'
                priority={true}
            />
        </div>

    )
}

export default Advertisement