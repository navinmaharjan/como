"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Pagination,
  Spinner
} from "@nextui-org/react";
import Image from 'next/image'
import AddProduct from "../../components/AddProduct";
import { useState, useEffect } from "react";

const AdminProduct = () => {
  const [productList, setProductList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const fetchProduct = async () => {
    setIsLoading(true)
    try {
      const response = await fetch (`https://67020dc0b52042b542d918c2.mockapi.io/api/v1/products`)
      const data = await response.json()
      setProductList(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <div>
      {/* ADD PRODUCT MODAL & SORTING PRODUCT */}
      <div className="my-2 w-full flex justify-between items-center">
        <div>
          <Button
            onPress={onOpen}
            radius="none"
            disableAnimation
            className="bg-blue-800 text-white"
          >
            Add Product
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            radius="none"
            size="2xl"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Create New Product
                  </ModalHeader>
                  <ModalBody>
                    <AddProduct onClose={onClose} />
                  </ModalBody>
                  {/* <ModalFooter>
                    <Button onPress={onClose} radius="none">
                      Cancel
                    </Button>
                    <Button
                      onPress={() => {
                        handleSubmit();
                        onClose();
                      }}
                      radius="none"
                      className="bg-blue-800 text-white"
                    >
                      Submit
                    </Button>
                  </ModalFooter> */}
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div>
          Sort Product Option
        </div>
      </div>

      {/* PRODUCT LIST DISPLAY */}
      <div className="my-2 w-full p-4 bg-white shadow-md overflow-hidden">
        <div className="grid grid-cols-12 gap-2 bg-gray-100 p-2 border-b border-gray-200">
          <div className="text-sm font-medium text-gray-700">S.no</div>
          <div className="text-sm font-medium text-gray-700">Image</div>
          <div className="text-sm font-medium text-gray-700 col-span-2">
            Name
          </div>
          <div className="text-sm font-medium text-gray-700 col-span-2">
            Category
          </div>
          <div className="text-sm font-medium text-gray-700 col-span-2">
            Sub Category
          </div>
          <div className="text-sm font-medium text-gray-700">Sell Price</div>
          <div className="text-sm font-medium text-gray-700">Cost Price</div>
          <div className="text-sm font-medium text-gray-700 col-span-2">
            Action
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
          <Spinner size="sm" />
        </div>
        ): (productList.map((product, index) => (
          <div
            key={product.id}
            className="grid grid-cols-12 gap-2 p-2 border-b border-gray-200 items-center"
          >
            <div className="text-sm text-gray-600">{index + 1}</div>
            <div className="relative w-14 h-14 overflow-hidden">
              <Image
                src={product.imageURL}
                alt={product.name}
                width={80}
                height={80}
                priority={true}
                className="absolute w-full h-full"
              />
            </div>
            <div className="text-sm font-medium text-gray-800 col-span-2">
              {product.name}
            </div>
            <div className="text-sm text-gray-600 col-span-2">
              {product.category}
            </div>
            <div className="text-sm text-gray-600 col-span-2">
              {product.subcategory}
            </div>
            <div className="text-sm text-gray-600">
              ${product.sellPrice.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">
              ${product.costPrice.toFixed(2)}
            </div>
            <div className="flex space-x-2">
              <Button
                radius="none"
                disableAnimation
                className="bg-blue-800 text-white"
              >
                Edit
              </Button>
              <Button
                radius="none"
                disableAnimation
                className="bg-red-500 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        )))}
        <div className="w-full flex justify-center items-center mt-4">
        <Pagination showControls total={4} initialPage={1} radius="none" size="sm" />
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
