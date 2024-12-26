import Image from "next/image";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "@/lib/redux/slices/cartSlice";
import { IoTrashBin } from "react-icons/io5";

const Cart = ({ toggleMenu }) => {
  const { cartList } = useSelector((state) => state.cart);
  const { totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // const handleQuantityChange = (itemId, change) => {
  //   dispatch(updateCartItemQuantity({ _id: itemId, change }));
  // };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart({ _id: itemId }));
  };

  console.log(cartList)

  return (
    <div className="flex flex-col h-full">
      <div className="w-full text-center bg-primaryColor flex items-center justify-between p-4">
        <button onClick={() => toggleMenu('cart')} aria-label="Close cart">
          <MdOutlineClose className="text-xl text-white" />
        </button>
        <h3 className="text-md text-white">Shopping Cart <span>({totalItems})</span></h3>
        <div className="w-8" /> {/* Spacer for alignment */}
      </div>
      <div className="flex-grow overflow-auto">
        {cartList.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div>
            {cartList.map((item, index) => (
              <div key={item._id} className="p-4 border-b flex items-center justify-between">
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
                    <span className="text-sm w-6 text-center">{item.quantity} <span className="text-sm">X</span></span>
                    <p className="font-medium text-blue-500">${(item.productSellPrice * item.quantity).toFixed(2)}</p>
                    {/* <div className="flex items-center space-x-2 mt-2">
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
                    </div> */}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {/* <p className="font-semibold">${(item.productSellPrice * item.quantity).toFixed(2)}</p> */}
                  <button
                    className="text-sm text-red-500 mt-2"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    <IoTrashBin className="text-xl text-gray-400" />

                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cartList.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">
              ${cartList.reduce((total, item) => total + item.productSellPrice * item.quantity, 0).toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-primaryColor text-white py-2 rounded hover:bg-opacity-90 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
