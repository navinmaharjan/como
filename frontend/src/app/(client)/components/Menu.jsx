'use client'

import { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from 'next/link'
import AnimatedLink from './UI/AnimatedLink'

const Menu = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="md:hidden">
            <RxHamburgerMenu className="text-xl cursor-pointer" onClick={() => setOpen(prev => !prev)} />
            <div className={`fixed w-[250px] h-screen ${!open ? `-left-[250px]` : `left-0`} top-0 bg-primaryColor z-20 transition-all duration-300 flex flex-col items-center justify-center gap-8 text-blackColor text-xl font-light`}>
                <Link href='/' className="text-md font-medium tracking-wide" onClick={() => setOpen(false)}>Shop</Link>
                <Link href='/' className="text-md font-medium tracking-wide" onClick={() => setOpen(false)}>Our Story</Link>
                <Link href='/' className="text-md font-medium tracking-wide" onClick={() => setOpen(false)}>Contact Us</Link>
                <Link href='/' className="text-md font-medium tracking-wide" onClick={() => setOpen(false)}>Explore More</Link>
              
            </div>
        </div>
    )
}

export default Menu;