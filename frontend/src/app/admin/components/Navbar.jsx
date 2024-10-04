import { IoIosSearch } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <div className='w-full py-2 flex justify-between items-center border-b'>
        <div className='flex justify-center items-center'>
          <IoIosSearch className="text-xl" />
          <input type="text" placeholder="Search Product..." className="w-[400px] p-2 outline-none cursor-pointer border-b bg-gray-100" />
        </div>
        <div className="flex justify-center items-center gap-4">
        <FaRegBell className="text-xl" />
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image src="/images/hero_001.jpg" height={1000} width={1000} className="absolute w-full h-full object-cover" />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar