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
import axios from "axios";
import { toast } from "react-hot-toast";

const AdminProduct = () => {
  const [productList, setProductList] = useState([]);
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async (page = 1, limit = 8) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/products?page=${page}&limit=${limit}`)
      const result = await response.json()
      setProductList(result.data);
      setTotalPage(Math.ceil(result.totalCount / limit));
      setCurrentPage(page);

    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (page) => {
    fetchProducts(page)
  }

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
            className="bg-blue-900 text-white"

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
          <div className="text-sm font-medium text-gray-700 col-span-3">
            Name
          </div>
          <div className="text-sm font-medium text-gray-700 col-span-1">
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
                {(currentPage - 1) * 8 + index + 1}
              </div>
              <div className="relative w-14 h-14 overflow-hidden">
                <Image
                  src={product.productImage}
                  alt={product.productName}
                  width={80}
                  height={80}
                  priority={true}
                  className="absolute w-full h-full object-cover"
                />
              </div>
              <div className="text-sm font-medium text-gray-800 col-span-3">
                {product.productName}
              </div>
              <div className="text-sm text-gray-600 col-span-1">
                {product.productCategory}
              </div>
              <div className="text-sm text-gray-600 col-span-2">
                {product.productSubcategory}
              </div>
              <div className="text-sm text-gray-600">
                ${product.productSellPrice.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                ${product.productCostPrice.toFixed(2)}
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
