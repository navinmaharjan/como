"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import AddProduct from "../../components/AddProduct";

const products = [
  {
    id: 1,
    name: "Leather Backpack",
    imageURL:
      "https://prestashop.coderplace.com/PRS03/PRS03060/demo/modules/cp_categorylist/views/img/14-cp_categorylist.jpg", // Placeholder image
    category: "Men",
    subCategory: "Backpacks",
    sellPrice: 99.99,
    costPrice: 69.99,
  },
  {
    id: 2,
    name: "Stylish Tote Bag",
    imageURL:
      "https://prestashop.coderplace.com/PRS03/PRS03060/demo/modules/cp_categorylist/views/img/14-cp_categorylist.jpg", // Placeholder image
    category: "Women",
    subCategory: "Totes",
    sellPrice: 59.99,
    costPrice: 39.99,
  },
  {
    id: 3,
    name: "Cute Crossbody Bag",
    imageURL:
      "https://prestashop.coderplace.com/PRS03/PRS03060/demo/modules/cp_categorylist/views/img/14-cp_categorylist.jpg", // Placeholder image
    category: "Kids",
    subCategory: "Crossbody Bags",
    sellPrice: 39.99,
    costPrice: 24.99,
  },
  {
    id: 4,
    name: "Messenger Bag",
    imageURL:
      "https://prestashop.coderplace.com/PRS03/PRS03060/demo/modules/cp_categorylist/views/img/14-cp_categorylist.jpg", // Placeholder image
    category: "Men",
    subCategory: "Messengers",
    sellPrice: 79.99,
    costPrice: 54.99,
  },
  {
    id: 5,
    name: "Beach Tote Bag",
    imageURL:
      "https://prestashop.coderplace.com/PRS03/PRS03060/demo/modules/cp_categorylist/views/img/14-cp_categorylist.jpg", // Replace with actual image URL
    category: "Women",
    subCategory: "Totes",
    sellPrice: 49.99,
    costPrice: 34.99,
  },
  {
    id: 6,
    name: "Kids Backpack",
    imageURL:
      "https://prestashop.coderplace.com/PRS03/PRS03060/demo/modules/cp_categorylist/views/img/14-cp_categorylist.jpg", // Replace with actual image URL
    category: "Kids",
    subCategory: "Backpacks",
    sellPrice: 29.99,
    costPrice: 19.99,
  },
  // Add more products as needed
];

const AdminProduct = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
        {products.map((product, index) => (
          <div
            key={product.id}
            className="grid grid-cols-12 gap-2 p-2 border-b border-gray-200 items-center"
          >
            <div className="text-sm text-gray-600">{index + 1}</div>
            <div>
              <img
                src={product.imageURL}
                alt={product.name}
                width={80}
                height={80}
                className="rounded-md"
              />
            </div>
            <div className="text-sm font-medium text-gray-800 col-span-2">
              {product.name}
            </div>
            <div className="text-sm text-gray-600 col-span-2">
              {product.category}
            </div>
            <div className="text-sm text-gray-600 col-span-2">
              {product.subCategory}
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
        ))}
      </div>
    </div>
  );
};

export default AdminProduct;
