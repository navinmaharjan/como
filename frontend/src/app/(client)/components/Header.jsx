import React from 'react'
import Menu from './Menu';
import Search from './Search';
import Navicons from './Navicons';
import NavMenu from './NavMenu';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='h-14 container mx-auto'>
      <div className='w-full h-full flex items-center justify-between'>
        <div className=' flex items-center gap-8'>
          <Link href="/" className='text-xl tracking-wide'>COMO</Link>
          <div className='hidden md:flex'>
            <NavMenu />
          </div>
        </div>
        {/* For Mobile Screens */}
        <div>
          <Menu />
        </div>
        <div className='flex-1 px-20'>
          <Search />
        </div>
        <div className='hidden md:flex items-center gap-4'>
          <Navicons />
        </div>
      </div>
    </div>
  )
}

export default Header