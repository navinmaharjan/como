import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <div className="flex">
        <div className="w-60 fixed left-0 top-0">
          <Sidebar />
        </div>
        <div className='w-full bg-gray-100 px-8 border-l ml-60 h-screen'>
          <div className='w-full'>
              <div className='flex flex-col'>
                <Navbar />
              </div>
            </div>
          <div>{children}</div>
          </div>
      </div>
    </div>

  );
}