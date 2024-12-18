import React from 'react'
import Image from 'next/image'

const Advertisement_2 = () => {
    return (
        <div>
            <div className='relative w-full h-[400px]'>
                <Image src="/images/banner2.jpg" alt='' width={2000} height={2000} className=' absolute w-full h-full object-cover' />
            </div>
        </div>
    )
}

export default Advertisement_2