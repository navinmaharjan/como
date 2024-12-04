"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Pagination,
  Spinner,
  PopoverContent,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import AddProduct from "../../components/AddProductModal";
import EditProduct from "../../components/EditProductModal";
import DeleteProduct from "../../components/DeleteProductModal";
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchProducts = async (page = 1, limit = 8) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/products`, {
        params: {
          page: page,
          limit: limit,
          ...(categoryFilter && { category: categoryFilter })
        }
      });
      const result = response.data;
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

  const handleCategoryChange = (category) => {
    setCategoryFilter(category)
  };

  const handlePageChange = (page) => {
    fetchProducts(page, 8);
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter]);


  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const deleteProduct = (product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const customStyle = {
    base: "bg-default-500 border border-gray-300",
  };

  return (
    <div>
      {/* ADD PRODUCT MODAL & SORTING PRODUCT */}
      <div className="my-2 flex justify-between items-center">

        <div>
          <Button
            onPress={() => setIsAddModalOpen(true)}
            radius="none"
            disableAnimation
            className="bg-blue-200 text-blue-900 font-semibold"

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

          {/* Modal for Deleting product */}
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            hideCloseButton={true}
            radius="sm"
            size="lg"
          >
            <ModalContent>
              <ModalBody>
                <DeleteProduct
                  product={deletingProduct}
                  onClose={() => setIsDeleteModalOpen(false)}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>

        <div className="flex w-[295px] items-center gap-2">
          <div>
            <p className=" text-sm">Sort Product By:</p>
          </div>
          <Select
            className="max-w-[180px]"
            aria-label="Select"
            radius="none"
            placeholder="Select"
            classNames={{
              base: customStyle.base,
            }}
            value={categoryFilter}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <SelectItem key="Men" value="Men">Men Category</SelectItem>
            <SelectItem key="Women" value="Women">Women Category</SelectItem>
            <SelectItem key="Kids" value="Kids">Kids Category</SelectItem>
          </Select>

        </div>
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
                  className="bg-blue-200 text-blue-900 font-semibold"
                >
                  Edit
                </Button>

                <Button
                  onPress={() => deleteProduct(product)}
                  radius="none"
                  disableAnimation
                  className="bg-red-200 text-red-900 font-semibold"
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
            radius="full"
            size="sm"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
