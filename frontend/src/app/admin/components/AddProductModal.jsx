'use client'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Label from "./UI/Label"
import { Textarea, Input, Select, SelectItem, Checkbox, Button } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import axios from "axios";

const categories = {
  Men: ['Briefcase', 'Messenger', 'Backpack', 'Travel Bag', 'RuckSack'],
  Women: ['Handbag', 'Clutch', 'Tote', 'Shoulder Bag'],
  Kids: ['School Bag', 'Lunch Bag', 'Mini Backpack', 'Crossbody Bag']
}

const validationSchema = Yup.object().shape({
  productName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  productDescription: Yup.string()
    .min(10, 'Too Short!')
    .max(500, 'Too Long!')
    .required('Required'),
  productSellPrice: Yup.number()
    .positive('Must be positive')
    .required('Required'),
  productCostPrice: Yup.number()
    .positive('Must be positive')
    .required('Required'),
  productCategory: Yup.string()
    .oneOf(['Men', 'Women', 'Kids'], 'Invalid category')
    .required('Required'),
  productSubcategory: Yup.string()
    .required('Required'),
  productImage: Yup.string()
    .url('Must be a valid URL')
    .required('Required'),
  isBestSelling: Yup.boolean(),
  isFeatured: Yup.boolean(),
})

const initialValues = {
  productName: '',
  productDescription: '',
  productSellPrice: '',
  productCostPrice: '',
  productCategory: '',
  productSubcategory: '',
  productImage: '',
  isBestSelling: false,
  isFeatured: false,
}

const AdminProduct = (props) => {
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}` + '/addProduct', values);
      console.log('Product creation response:', response.data);
      toast.success('Product created successfully');
      props.onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'An error occurred while creating the product';
        toast.error(errorMessage);
        console.error('Error creating product:', error.response?.data);
      } else {
        toast.error('An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  }

  return (
    <div className="w-full mx-auto p-2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* NAME */}
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Field name="productName">
                {({ field }) => (
                  <Input
                    {...field}
                    id="productName"
                    radius='none'
                    className={errors.productName && touched.productName ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.productName && touched.productName && <div className="text-red-500 text-sm mt-1">{errors.productName}</div>}
            </div>

            {/* DESCRIPTION */}
            <div>
              <Label htmlFor="productDescription">Description</Label>
              <Field name="productDescription">
                {({ field }) => (
                  <Textarea
                    {...field}
                    id="productDescription"
                    radius='none'
                    className={errors.productDescription && touched.productDescription ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.productDescription && touched.productDescription && <div className="text-red-500 text-sm mt-1">{errors.productDescription}</div>}
            </div>

            {/* SELL PRICE */}
            <div>
              <Label htmlFor="productSellPrice">Selling Price</Label>
              <Field name="productSellPrice">
                {({ field }) => (
                  <Input
                    {...field}
                    id="productSellPrice"
                    type='number'
                    placeholder='0.00'
                    labelPlacement="outside"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    radius='none'
                    className={errors.productSellPrice && touched.productSellPrice ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.productSellPrice && touched.productSellPrice && <div className="text-red-500 text-sm mt-1">{errors.productSellPrice}</div>}
            </div>

            {/* COST PRICE */}
            <div>
              <Label htmlFor="productCostPrice">Cost Price</Label>
              <Field name="productCostPrice">
                {({ field }) => (
                  <Input
                    {...field}
                    id="productCostPrice"
                    type='number'
                    placeholder='0.00'
                    labelPlacement="outside"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    radius='none'
                    className={errors.productCostPrice && touched.productCostPrice ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.productCostPrice && touched.productCostPrice && <div className="text-red-500 text-sm mt-1">{errors.productCostPrice}</div>}
            </div>

            {/* CATEGORY */}
            <div>
              <Label htmlFor="productCategory">Category</Label>
              <Select
                placeholder="Select Category"
                className={errors.productCategory && touched.productCategory ? 'border-red-500' : ''}
                id='productCategory'
                radius='none'
                aria-label="Category"
                selectedKeys={values.productCategory ? [values.productCategory] : []}
                onChange={(e) => {
                  const value = e.target.value;
                  setFieldValue('productCategory', value);
                  setFieldValue('subcategory', '');  // Reset subcategory when category changes
                }}
                value={values.productCategory}
              >
                {Object.keys(categories).map((productCategory) => (
                  <SelectItem key={productCategory} value={productCategory}>
                    {productCategory.charAt(0).toUpperCase() + productCategory.slice(1)}
                  </SelectItem>
                ))}
              </Select>
              {errors.productCategory && touched.productCategory && <div className="text-red-500 text-sm mt-1">{errors.productCategory}</div>}
            </div>

            {/* SUBCATEGORY */}
            {values.productCategory && (
              <div>
                <Label htmlFor="productSubcategory">Subcategory</Label>
                <Select
                  placeholder="Select Subcategory"
                  className={errors.productSubcategory && touched.productSubcategory ? 'border-red-500' : ''}
                  id='productSubcategory'
                  radius='none'
                  aria-label="productSubcategory"
                  selectedKeys={values.productSubcategory ? [values.productSubcategory] : []}
                  onChange={(e) => setFieldValue('productSubcategory', e.target.value)}
                  value={values.productSubcategory}
                >
                  {categories[values.productCategory].map((productSubcategory) => (
                    <SelectItem key={productSubcategory} value={productSubcategory}>{productSubcategory}</SelectItem>
                  ))}
                </Select>
                {errors.productSubcategory && touched.productSubcategory && <div className="text-red-500 text-sm mt-1">{errors.productSubcategory}</div>}
              </div>
            )}

            {/* IMG-URL */}
            <div>
              <Label htmlFor="productImage">Product Image URL</Label>
              <Field name="productImage">
                {({ field }) => (
                  <Input
                    {...field}
                    id="productImage"
                    radius='none'
                    className={errors.productImage && touched.productImage ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.productImage && touched.productImage && <div className="text-red-500 text-sm mt-1">{errors.productImage}</div>}
            </div>

            {/* CHECKBOX */}
            <div className='flex gap-8'>
              <div className="flex items-center space-x-2">
                <Field name="isBestSelling">
                  {({ field }) => (
                    <Checkbox
                      id="isBestSelling"
                      isSelected={field.value}
                      onValueChange={(isSelected) => setFieldValue('isBestSelling', isSelected)}
                      color='default'
                      radius='none'
                      disableAnimation
                    />
                  )}
                </Field>
                <Label htmlFor="isBestSelling">Best Selling</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Field name="isFeatured">
                  {({ field }) => (
                    <Checkbox
                      id="isFeatured"
                      isSelected={field.value}
                      onValueChange={(isSelected) => setFieldValue('isFeatured', isSelected)}
                      color='default'
                      radius='none'
                      disableAnimation
                    />
                  )}
                </Field>
                <Label htmlFor="isFeatured">Featured</Label>
              </div>
            </div>

            <div className='flex gap-2'>
              <Button type='submit' className='bg-blue-800 text-white' radius='none' disableAnimation>
                Submit
              </Button>
              <Button onPress={props.onClose} className='bg-gray-200' radius='none' disableAnimation>
                Cancel
              </Button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AdminProduct
