import React from 'react'
import { LuLineChart } from "react-icons/lu";
import { GiProfit } from "react-icons/gi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { Card, CardHeader, CardBody, Divider, CardFooter } from "@nextui-org/react";
import SalesChart from "../../components/SalesChart"
import CategoryPieChart from '../../components/CategoryPieChart';
import RecentOrders from '../../components/RecentOrders';

const AdminDashboard = () => {
  return (
    <div>
      <div className='flex justify-center gap-4 my-4'>
        {/* Total Sales Card */}
        <Card className="max-w-[400px] px-4">
          <CardHeader className="flex justify-center gap-2 items-center">
            <div className='w-8 h-8 rounded-full bg-red-200 flex justify-center items-center'>
              <LuLineChart className='text-red-900 font-extrabold text-md' />
            </div>
            <p className="text-base">Total Sales</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center">
            <p className='text-center text-2xl font-semibold'>$4,50,000</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <p className='text-gray-600 text-sm'>Total sales increased by 4.5% from last month </p>
          </CardFooter>
        </Card>

        {/* Total Orders Card */}
        <Card className="max-w-[400px] px-4">
          <CardHeader className="flex justify-center gap-2 items-center">
            <div className='w-8 h-8 rounded-full bg-red-200 flex justify-center items-center'>
              <LuLineChart className='text-red-900 font-extrabold text-md' />
            </div>
            <p className="text-base">Total Orders</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center">
            <p className='text-center text-2xl font-semibold'>$4,50,000</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <p className='text-gray-600 text-sm'>Total orders increased by 2.5% from last month </p>
          </CardFooter>
        </Card>

        {/* Total Profit Card */}
        <Card className="max-w-[400px] px-4">
          <CardHeader className="flex justify-center gap-2 items-center">
            <div className='w-8 h-8 rounded-full bg-blue-100 flex justify-center items-center'>
              <FaFileInvoiceDollar className='text-blue-900 font-extrabold text-md' />
            </div>
            <p className="text-base">Total Profit</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center">
            <p className='text-center text-2xl font-semibold'>$8,10,000</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <p className='text-gray-600 text-sm'>Total profit increased by 5.5% from last month </p>
          </CardFooter>
        </Card>


        {/* Total Product Card */}
        <Card className="max-w-[400px] px-4">
          <CardHeader className="flex justify-center gap-2 items-center">
            <div className='w-8 h-8 rounded-full bg-green-200 flex justify-center items-center'>
              <GiProfit className='text-green-900 font-extrabold text-md' />
            </div>
            <p className="text-base">Total Products</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center">
            <p className='text-center text-2xl font-semibold'>450</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <p className='text-gray-600 text-sm'>Total number of products listed </p>
          </CardFooter>
        </Card>


      </div>

      <hr></hr>

      <div className='my-4 flex gap-4'>
        <Card className='w-2/3 rounded-md'>
          <CardHeader className="flex flex-col justify-start items-start">
            <div className='flex justify-between items-center w-full'>
              <div>
                <p className=" text-base">Sales Performance</p>
                <p className='text-gray-400 text-xs'>You can see monthly sales performance</p>
              </div>
              <p className='text-xs text-gray-400'>(in thousand)</p>
            </div>
            <SalesChart />
          </CardHeader>
        </Card>
        <Card className='w-1/3 rounded-md'>
          <CardHeader className="flex flex-col justify-start items-start">
            <div className='flex justify-between items-center w-full'>
              <div>
                <p className=" text-base">Category Performance</p>
                <p className='text-gray-400 text-xs'>You can see monthly category performance</p>
              </div>
              <p className='text-xs text-gray-400'>(in thousand)</p>
            </div>

          </CardHeader>
          <CategoryPieChart />
        </Card>
        <Card className='w-1/3 rounded-md'>
          <CardHeader className="flex flex-col justify-start items-start">
            <div className='flex justify-between items-center w-full'>
              <div>
                <p className=" text-base">Sub Category Performance</p>
                <p className='text-gray-400 text-xs'>You can see monthly category performance</p>
              </div>
              <p className='text-xs text-gray-400'>(in thousand)</p>
            </div>

          </CardHeader>
          <CategoryPieChart />
        </Card>
      </div>
      
      <hr></hr>

      <div className='my-4'>
        <RecentOrders />
      </div>
    </div>
  )
}

export default AdminDashboard




