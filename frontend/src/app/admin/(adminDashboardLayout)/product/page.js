"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import AddProduct from "../../components/AddProductModal";
import EditProduct from "../../components/EditProductModal";
import { useState, useEffect } from "react";

const AdminProduct = () => {
  const [productList, setProductList] = useState([]);
  const [totalItems, setTotalItems] = useState(1);
  const totalPage = Math.ceil(totalItems / 10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  //to handle total page of the pagination
  const fetchTotalCount = async () => {
    const url = new URL(
      `https://67020dc0b52042b542d918c2.mockapi.io/api/v1/products`
    );
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTotalItems(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async (page = 1) => {
    setIsLoading(true);
    const url = new URL(
      `https://67020dc0b52042b542d918c2.mockapi.io/api/v1/products`
    );
    url.searchParams.append("page", page);
    url.searchParams.append("limit", 10);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setProductList(data);
      setCurrentPage(page);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalCount();
    fetchProduct();
  }, []);

  const handlePageChange = (page) => {
    fetchProduct(page);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      {/* ADD PRODUCT MODAL & SORTING PRODUCT */}
      <div className="my-2 w-full flex justify-between items-center">
        <div>
          <Button
            onPress={() => setIsAddModalOpen(true)}
            radius="none"
            disableAnimation
            className="bg-blue-800 text-white"
          >
            Add Product
          </Button>
          {/* Modal for Adding Product */}
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            radius="none"
            size="2xl"
          >
            <ModalContent>
              <ModalBody>
                <AddProduct onClose={() => setIsAddModalOpen(false)} />
              </ModalBody>
            </ModalContent>
          </Modal>

          {/* Modal for Editing product */}
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            radius="none"
            size="2xl"
          >
            <ModalContent>
              <ModalBody>
                <EditProduct
                  product={editingProduct}
                  onClose={() => setIsEditModalOpen(false)}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
        <div>Sort Product Option</div>
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
          <div className="flex justify-center items-center h-[730px]">
            <Spinner size="sm" />
          </div>
        ) : (
          productList.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-2 p-2 border-b border-gray-200 items-center"
            >
              <div className="text-sm text-gray-600">
                {(currentPage - 1) * 10 + index + 1}
              </div>
              <div className="relative w-14 h-14 overflow-hidden">
                <Image
                  src={product.imageURL}
                  alt={product.name}
                  width={80}
                  height={80}
                  priority={true}
                  className="absolute w-full h-full object-cover"
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
                  onPress={() => handleEdit(product)}
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
          ))
        )}
        <div className="w-full flex justify-center items-center mt-4">
          <Pagination
            showControls
            loop
            total={totalPage}
            radius="none"
            size="sm"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
