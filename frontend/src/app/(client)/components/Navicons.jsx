'use client'

import { FaCartShopping } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import Link from "next/link";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/badge";
import { useState } from "react";
import { handleLogOut } from "@/lib/redux/slices/userSlice";
import Cart from "./Cart";

const Navicons = () => {
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);
  const { userDetails, isLoggedIn } = useSelector((state) => state.user);
  const [profileMenu, setProfileMenu] = useState(false)
  const [cartMenu, setCartMenu] = useState(false)

  const toggleMenu = (menu) => {
    if (menu == 'profile') {
      setProfileMenu(prevState => !prevState)
    } else if (menu == 'cart') {
      setCartMenu(prevState => !prevState)
    }
  }

  const handleLogout = () => {
    dispatch(handleLogOut())
  };

  const handleClick = () => {
    handleLogout();
    toggleMenu();
  };

  return (
    <div className="flex items-center gap-2 ">

      {isLoggedIn ? (
        <div className="flex gap-2 items-center relative">
          <p className="text-xs text-gray-700">Welcome, <span className="font-bold">{userDetails.fullName}</span></p>
          <Avatar onClick={() => toggleMenu('profile')} className="border border-primaryColor cursor-pointer" size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          {profileMenu && (
            <div className="w-full absolute top-11 left-0 z-30 p-2 bg-white flex flex-col gap-1 rounded-md">
              <Link href='/user/profile' onClick={() => toggleMenu('profile')} className="hover:bg-gray-200 p-1 w-full">
                <span >Profile</span>
              </Link>
              <Link href='/user/order' onClick={() => toggleMenu('profile')} className="hover:bg-gray-200 p-1 w-full">
                <span >My Order</span>
              </Link>
              <Link href='#' onClick={handleClick} className="hover:bg-gray-200 p-1 w-full">
                <span >Logout</span>
              </Link>
            </div>
          )}
        </div>

      ) : (
        <div className="w-8 h-8 flex justify-center items-center bg-primaryColor rounded-full hover:opacity-85 cursor-pointer">
          <Link href='/auth/login'>
            <FaRegUser className=" text-white" />
          </Link>
        </div>
      )}
      <div className="relative w-8 h-8 flex justify-center items-center bg-primaryColor rounded-full  cursor-pointer">
        {cartList.length > 0 && (
          <Badge content={cartList.length} size="sm" color="danger" className="absolulte -top-3 left-1"></Badge>
        )}
        <FaCartShopping className=" text-white" onClick={() => toggleMenu('cart')} />
        {cartMenu && (
          <div className={`fixed w-[350px] h-screen transition-all duration-300  bg-white top-0 drop-shadow-xl z-50 ${!cartMenu ? `-left-[350px]` : `left-0`
            }`}>
            {/* <Cart /> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Navicons