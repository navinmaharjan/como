import Link from 'next/link'
import AnimatedLink from './UI/AnimatedLink'

const NavMenu = () => {
  return (
    <div className='flex gap-8'>
      <AnimatedLink href="/shop" className='text-sm'>Shop</AnimatedLink>
      <AnimatedLink href="/story" className='text-sm'>Our Story</AnimatedLink>
      <AnimatedLink href="/contact" className='text-sm'>Contact Us</AnimatedLink>
      <AnimatedLink href="/explore" className='text-sm'>Explore More</AnimatedLink>
    </div>
  )
}

export default NavMenu