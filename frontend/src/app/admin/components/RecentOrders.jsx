'use client'

import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const RecentOrders = () => {
    return (
        <div>
            {/* <p>Recent Orders</p> */}
            <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>Order No.</TableColumn>
                    <TableColumn>Item</TableColumn>
                    <TableColumn>Customer Name</TableColumn>
                    <TableColumn>Customer Address</TableColumn>
                    <TableColumn>Price</TableColumn>
                    <TableColumn>Status</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>#MNG0045</TableCell>
                        <TableCell>Zara Stripe Shoulder Bag</TableCell>
                        <TableCell>Sheela Tamang</TableCell>
                        <TableCell>Lazimpat, Kailashchaur Marga</TableCell>
                        <TableCell>$200</TableCell>
                        <TableCell ><span className='bg-red-200 px-3 py-1 rounded-xl text-red-500 text-xs'>Pending</span></TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>#MNG0045</TableCell>
                        <TableCell>Zara Stripe Shoulder Bag</TableCell>
                        <TableCell>Sheela Tamang</TableCell>
                        <TableCell>Lazimpat, Kailashchaur Marga</TableCell>
                        <TableCell>$200</TableCell>
                        <TableCell ><span className='bg-green-100 px-3 py-1 rounded-xl text-green-500 text-xs'>Delivered</span></TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>#MNG0045</TableCell>
                        <TableCell>Zara Stripe Shoulder Bag</TableCell>
                        <TableCell>Sheela Tamang</TableCell>
                        <TableCell>Lazimpat, Kailashchaur Marga</TableCell>
                        <TableCell>$200</TableCell>
                        <TableCell ><span className='bg-yellow-100 px-3 py-1 rounded-xl text-yellow-500 text-xs'>Packaging</span></TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell>#MNG0045</TableCell>
                        <TableCell>Zara Stripe Shoulder Bag</TableCell>
                        <TableCell>Sheela Tamang</TableCell>
                        <TableCell>Lazimpat, Kailashchaur Marga</TableCell>
                        <TableCell>$200</TableCell>
                        <TableCell ><span className='bg-green-100 px-3 py-1 rounded-xl text-green-500 text-xs'>Delivered</span></TableCell>
                    </TableRow>
                    <TableRow key="5">
                        <TableCell>#MNG0045</TableCell>
                        <TableCell>Zara Stripe Shoulder Bag</TableCell>
                        <TableCell>Sheela Tamang</TableCell>
                        <TableCell>Lazimpat, Kailashchaur Marga</TableCell>
                        <TableCell>$200</TableCell>
                        <TableCell ><span className='bg-green-100 px-3 py-1 rounded-xl text-green-500 text-xs'>Delivered</span></TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </div>
    )
}

export default RecentOrders