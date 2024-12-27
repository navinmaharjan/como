'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Breadcrumb from '../../components/Breadcrumb'

const CheckoutPage = () => {
  const router = useRouter()
  const { cartList, totalItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user) 
  const [paymentMethod, setPaymentMethod] = useState('');

//   useEffect(() => {
//     if (!user) {
//       router.push('/login')
//     }
//   }, [user, router])

  const totalPrice = cartList.reduce((total, item) => total + item.productSellPrice * item.quantity, 0).toFixed(2)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission (e.g., process payment, create order)
    console.log('Order submitted with payment method:', paymentMethod)
  }

//   if (!user) {
//     return null // Return null while redirecting
//   }

  return (
    <div>
      <div className='bg-secondaryColor py-4'>
        <div className='container mx-auto'>
          <div className='flex gap-2 items-center'>
            <Breadcrumb />
          </div>
        </div>
      </div>

      <div className='flex container mx-auto'>
        <div className='w-[25%] bg-gray-100'></div>
        <div className='w-[50%] p-4'>
          <h3 className="text-2xl font-bold mb-4">Checkout</h3>
          <div className='border-t border-gray-200 mt-4 mb-8'></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-4">Shipping Address</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" id="fullName" name="firstName" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primaryColor focus:border-primaryColor" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" id="lastName" name="lastName" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primaryColor focus:border-primaryColor" />
                </div>
                <div className="col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input type="text" id="address" name="address" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primaryColor focus:border-primaryColor" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" id="city" name="city" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primaryColor focus:border-primaryColor" />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <input type="text" id="zipCode" name="zipCode" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primaryColor focus:border-primaryColor" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Payment Method</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Payment Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cashOnDelivery"
                        className="form-radio text-primaryColor"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        checked={paymentMethod === 'cashOnDelivery'}
                      />
                      <span>Cash on Delivery</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="esewa"
                        className="form-radio text-primaryColor"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        checked={paymentMethod === 'esewa'}
                      />
                      <span>eSewa</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="fonepay"
                        className="form-radio text-primaryColor"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        checked={paymentMethod === 'fonepay'}
                      />
                      <span>FonePay</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
              <div className="space-y-2">
                {cartList.map((item) => (
                  <div key={item._id} className="flex justify-between">
                    <span>{item.productName} (x{item.quantity})</span>
                    <span>${(item.productSellPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold">
                  <span>Total ({totalItems} items):</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Link href="/user/cart" className="text-primaryColor hover:underline">
                Back to Cart
              </Link>
              <button type="submit" className="bg-primaryColor text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors">
                Place Order
              </button>
            </div>
          </form>
        </div>
        <div className='w-[25%] bg-gray-100'></div>
      </div>
    </div>
  )
}

export default CheckoutPage