import React from 'react'
import { LuLineChart } from "react-icons/lu";
import { GiProfit } from "react-icons/gi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { Card, CardHeader, CardBody, Divider, CardFooter } from "@nextui-org/react";

const AdminDashboard = () => {
  return (
    <div>
      <div className='flex justify-center gap-4 my-8'>
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
            <p className='text-gray-600 text-sm'>Increase total sales by 4.5% from last month </p>
          </CardFooter>
        </Card>

        {/* Total Orders Card */}
        <Card className="max-w-[400px] px-4">
          <CardHeader className="flex justify-center gap-2 items-center">
            <div className='w-8 h-8 rounded-full bg-blue-100 flex justify-center items-center'>
              <FaFileInvoiceDollar className='text-blue-900 font-extrabold text-md' />
            </div>
            <p className="text-base">Total Orders</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center">
            <p className='text-center text-2xl font-semibold'>$8,10,000</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <p className='text-gray-600 text-sm'>Increase total sales by 4.5% from last month </p>
          </CardFooter>
        </Card>


        {/* Total Profit Card */}
        <Card className="max-w-[400px] px-4">
          <CardHeader className="flex justify-center gap-2 items-center">
            <div className='w-8 h-8 rounded-full bg-green-200 flex justify-center items-center'>
              <GiProfit className='text-green-900 font-extrabold text-md' />
            </div>
            <p className="text-base">Total Profit</p>
          </CardHeader>
          <Divider />
          <CardBody className="flex justify-center">
            <p className='text-center text-2xl font-semibold'>$4,50,000</p>
          </CardBody>
          <Divider />
          <CardFooter>
            <p className='text-gray-600 text-sm'>Increase total sales by 4.5% from last month </p>
          </CardFooter>
        </Card>

      </div>

      <hr></hr>


      <div className='my-8 flex gap-4'>
        <Card className='w-2/3 h-20 rounded-md'>
          <CardHeader className="flex flex-col justify-start items-start">
            <p className=" text-base">Sales Performance</p>
            <p className='text-gray-600 text-sm'>You can see monthly sales performance</p>
          </CardHeader>
        </Card>
        <Card className='w-1/3 h-20 rounded-md'></Card>
      </div>
    </div>
  )
}

export default AdminDashboard


