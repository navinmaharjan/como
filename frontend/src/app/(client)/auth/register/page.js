'use client'

import React, { useState } from 'react'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import { Input, Button, Link } from "@nextui-org/react"
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone } from "react-icons/fi"
import { toast } from "react-hot-toast";

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Full Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`+'/register', values);
      if (data) {
        toast.success(data.msg);
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || "An unexpected error occurred.";
      toast.error(errorMessage);
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className=' h-screen flex justify-center items-center bg-gray-100'>
      <div className="w-[512px] mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <Formik
          initialValues={{ fullName: '', email: '', mobile: '', password: '' }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <Field name="fullName">
                {({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter your full name"
                    startContent={<FiUser className="text-default-400 pointer-events-none flex-shrink-0" />}
                    isInvalid={touched.fullName && errors.fullName}
                    errorMessage={touched.fullName && errors.fullName}
                  />
                )}
              </Field>

              <Field name="email">
                {({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    startContent={<FiMail className="text-default-400 pointer-events-none flex-shrink-0" />}
                    isInvalid={touched.email && errors.email}
                    errorMessage={touched.email && errors.email}
                  />
                )}
              </Field>

              <Field name="mobile">
                {({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter your mobile number"
                    startContent={<FiPhone className="text-default-400 pointer-events-none flex-shrink-0" />}
                    isInvalid={touched.mobileNumber && errors.mobileNumber}
                    errorMessage={touched.mobileNumber && errors.mobileNumber}
                  />
                )}
              </Field>

              <Field name="password">
                {({ field }) => (
                  <Input
                    {...field}
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    startContent={<FiLock className="text-default-400 pointer-events-none flex-shrink-0" />}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? (
                          <FiEyeOff className="text-lg text-default-400 pointer-events-none" />
                        ) : (
                          <FiEye className="text-lg text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    isInvalid={touched.password && errors.password}
                    errorMessage={touched.password && errors.password}
                  />
                )}
              </Field>

              <Button type="submit" className='bg-primaryColor text-white' isLoading={isSubmitting}>
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" size="sm">
              Log in instead!
            </Link>
          </p>
        </div>
      </div>
    </div>

  )
}

export default Register