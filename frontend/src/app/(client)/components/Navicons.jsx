'use client'

import { FaCartShopping } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import Link from "next/link";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/badge";

const Navicons = () => {
  const { userDetails, isLoggedIn } = useSelector((state) => state.user);

  return (
    <div className="flex items-center gap-2">

      {isLoggedIn ? (
        <div className="flex gap-2 items-center">
          <p className="text-xs text-gray-700">Welcome, <span className="font-bold">{userDetails.fullName}</span></p>
          <Avatar className="border border-primaryColor" size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        </div>
      ) : (
        <div className="w-8 h-8 flex justify-center items-center bg-primaryColor rounded-full hover:opacity-85 cursor-pointer">
          <Link href='/auth/login'>
            <FaRegUser className=" text-white" />
          </Link>
        </div>
      )}
      <div className="relative w-8 h-8 flex justify-center items-center bg-primaryColor rounded-full hover:opacity-85 cursor-pointer">
        <Badge content="0" size="sm" color="danger" className="absolulte -top-3 left-1"></Badge>
        <FaCartShopping className=" text-white" />
      </div>
    </div>
  )
}

export default Navicons