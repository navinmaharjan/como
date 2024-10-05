'use client'

import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Label from "./UI/Label"
import { Textarea, Input, Select, SelectItem, Checkbox, Button } from "@nextui-org/react";

const categories = {
  men: ['Briefcase', 'Messenger Bag', 'Backpack', 'Travel Bag', 'RuckSack'],
  women: ['Handbag', 'Clutch', 'Tote', 'Shoulder Bag'],
  kids: ['School Bag', 'Lunch Bag', 'Mini Backpack', 'Crossbody Bag']
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(10, 'Too Short!')
    .max(500, 'Too Long!')
    .required('Required'),
  price: Yup.number()
    .positive('Must be positive')
    .required('Required'),
  category: Yup.string()
    .oneOf(['men', 'women', 'kids'], 'Invalid category')
    .required('Required'),
  subcategory: Yup.string()
    .required('Required'),
  imageUrl: Yup.string()
    .url('Must be a valid URL')
    .required('Required'),
  isBestSelling: Yup.boolean(),
  isFeatured: Yup.boolean(),
})

const initialValues = {
  name: '',
  description: '',
  price: '',
  category: '',
  subcategory: '',
  imageUrl: '',
  isBestSelling: false,
  isFeatured: false,
}

const AdminProduct = (props) => {
  const handleSubmit = (values) => {
    console.log(values)
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
              <Label htmlFor="name">Product Name</Label>
              <Field name="name">
                {({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    radius='none'
                    className={errors.name && touched.name ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>
            
            {/* DESCRIPTION */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Field name="description">
                {({ field }) => (
                  <Textarea
                    {...field}
                    id="description"
                    radius='none'
                    className={errors.description && touched.description ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.description && touched.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
            </div>
            
            {/* PRICE */}
            <div>
              <Label htmlFor="price">Price</Label>
              <Field name="price">
                {({ field }) => (
                  <Input
                    {...field}
                    id="price"
                    type='number'
                    placeholder='0.00'
                    labelPlacement="outside"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    radius='none'
                    className={errors.price && touched.price ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.price && touched.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
            </div>
            
            {/* CATEGORY */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                placeholder="Select Category"
                className={errors.category && touched.category ? 'border-red-500' : ''}
                id='category'
                radius='none'
                 aria-label="Category"
                 selectedKeys={values.category ? [values.category] : []}
                 onChange={(e) => {
                  const value = e.target.value;
                  setFieldValue('category', value);
                  setFieldValue('subcategory', '');  // Reset subcategory when category changes
                }}
                value={values.category}
              >
               {Object.keys(categories).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </Select>
              {errors.category && touched.category && <div className="text-red-500 text-sm mt-1">{errors.category}</div>}
            </div>

            {/* SUBCATEGORY */}
            {values.category && (
              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select
                  placeholder="Select Subcategory"
                  className={errors.subcategory && touched.subcategory ? 'border-red-500' : ''}
                  id='subcategory'
                  radius='none'
                  aria-label="Subcategory"
                  selectedKeys={values.subcategory ? [values.subcategory] : []}
                  onChange={(e) => setFieldValue('subcategory', e.target.value)}
                  value={values.subcategory}
                >
                  {categories[values.category].map((subcat) => (
                    <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
                  ))}
                </Select>
                {errors.subcategory && touched.subcategory && <div className="text-red-500 text-sm mt-1">{errors.subcategory}</div>}
              </div>
            )}

            {/* IMG-URL */}
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Field name="imageUrl">
                {({ field }) => (
                  <Input
                    {...field}
                    id="imageUrl"
                    radius='none'
                    className={errors.imageUrl && touched.imageUrl ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.imageUrl && touched.imageUrl && <div className="text-red-500 text-sm mt-1">{errors.imageUrl}</div>}
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
