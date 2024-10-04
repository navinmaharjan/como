'use client'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Input from "./UI/UInput"
import Label from "./UI/Label"

const categories = {
  men: ['Briefcase', 'Messenger Bag', 'Backpack', 'Travel Bag'],
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

const handleSubmit = (values) => {
  console.log(values)
}

const AdminProduct = () => {
  return (
    <div className="w-full mx-auto p-4">
      {/* <h1 className="text-2xl font-semibold mb-4">Add New Product</h1> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({errors, touched, setFieldValue, values}) => (
          <Form className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Field name="name">
                {({ field }) => (
                  <Input
                    {...field} 
                    id="name" 
                    className={errors.name && touched.name ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Field name="name">
                {({ field }) => (
                  <Input
                    {...field} 
                    id="name" 
                    className={errors.name && touched.name ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Field name="name">
                {({ field }) => (
                  <Input
                    {...field} 
                    id="name" 
                    className={errors.name && touched.name ? 'border-red-500' : ''}
                  />
                )}
              </Field>
              {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AdminProduct