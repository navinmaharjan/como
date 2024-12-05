import Link from 'next/link';
import { MdDashboard } from "react-icons/md";
import { IoBagAdd } from "react-icons/io5";
import { FaUsersGear } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div>
      <div className="w-60 flex flex-col p-2 justify-between h-screen">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-center py-4 uppercase mb-4 text-white">
            COMO LOGO
          </h1>
          <Link href="/admin/dashboard" className="flex justify-start items-center gap-2 hover:opacity-90 cursor-pointer  w-full p-2">
            <MdDashboard className="text-2xl text-white" />
            <p className="text-white tracking-wide text-sm">Overview</p>
          </Link>
          <Link  href="/admin/product" className="flex justify-start items-center gap-2 w-full p-2 hover:opacity-90 cursor-pointer  cursor-pointer">
            <IoBagAdd className="text-2xl text-white" />
            <p className="text-white tracking-wide text-sm">Product</p>
          </Link >
          <Link href="/admin/orders" className="flex justify-start items-center gap-2 w-full p-2 hover:opacity-90 cursor-pointer  cursor-pointer">
            <FaUsersGear className="text-2xl text-white" />
            <p className="text-white tracking-wide text-sm">Orders</p>
          </Link>
          <Link href="/admin/settings" className="flex justify-start items-center gap-2 w-full p-2 hover:opacity-90 cursor-pointer  cursor-pointer">
            <IoMdSettings className="text-2xl text-white" />
            <p className="text-white tracking-wide text-sm">Settings</p>
          </Link>
        </div>
        <div className="w-full flex gap-2 p-2 hover:opacity-90 cursor-pointer  cursor-pointer">
        <IoLogOutSharp className="text-2xl text-white" />
        <p className="text-white tracking-wide text-sm">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;