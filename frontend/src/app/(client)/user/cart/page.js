'use client'

import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, updateCartItemQuantity } from "@/lib/redux/slices/cartSlice"
import { IoTrashBin } from "react-icons/io5"
import Breadcrumb from '../../components/Breadcrumb'

const CartPage = () => {
  const { cartList, totalItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart({ _id: itemId }))
  }

  const handleQuantityChange = (itemId, change) => {
    dispatch(updateCartItemQuantity({ _id: itemId, change }))
  }

  const totalPrice = cartList.reduce((total, item) => total + item.productSellPrice * item.quantity, 0).toFixed(2)

  return (
    <div>
      <div className='bg-secondaryColor py-4'>
        <div className='container mx-auto'>
          <div className='flex gap-2 items-center'>
            <Breadcrumb />
          </div>
        </div>
      </div>

      <div className='flex container mx-auto mt-8'>
        <div className='w-[20%] h-60'></div>
        <div className='w-[60%] p-4'>
          <h3 className="text-2xl font-bold mb-4">Shopping Cart ({totalItems})</h3>
          <div className='border-t border-gray-200 mt-4'></div>
          
          {cartList.length === 0 ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div>
              {cartList.map((item, index) => (
                <div key={item._id} className="py-1 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-500">{index + 1}.</p>
                    <div className="w-16 h-16 relative">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{item.productName}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          className="bg-gray-100 w-6 h-6 flex justify-center items-center rounded hover:bg-gray-200"
                          onClick={() => handleQuantityChange(item._id, -1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          className="bg-gray-100 w-6 h-6 flex justify-center items-center rounded hover:bg-gray-200"
                          onClick={() => handleQuantityChange(item._id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-medium text-blue-500 mt-2">${item.productSellPrice}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-medium">${(item.productSellPrice * item.quantity).toFixed(2)}</p>
                    <button
                      className="text-sm text-red-500 mt-2"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <IoTrashBin className="text-xl text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="mt-8 flex justify-between items-center">
                <span className="font-semibold text-xl">Total:</span>
                <span className="font-bold text-xl">${totalPrice}</span>
              </div>
              
              <div className="flex gap-4 mt-8">
                <Link href='#' className="text-center w-full bg-primaryColor text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors">
                  Continue Shopping
                </Link>
                <Link href='/user/checkout' className="text-center w-full bg-primaryColor text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className='w-[20d%] h-60'></div>
      </div>
    </div>
  )
}

export default CartPage
