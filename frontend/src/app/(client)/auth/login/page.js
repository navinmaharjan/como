'use client'

import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input, Button, Link } from "@nextui-org/react"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from '@/lib/redux/slices/userSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
})

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)
  

  const handleLogin = async (values) => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`+'/login', values);
      if (data) {
        dispatch(setUserDetails(data));
        toast.success(data.msg);
        router.push("/")
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || "An unexpected error occurred.";
      toast.error(errorMessage);
      console.error("Error posting data:", error);
    }
  }

  return (
    <div className='h-screen flex justify-center items-center bg-gray-100'>
      <div className="w-[448px] mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="flex flex-col gap-4">
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
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link href="/auth/register" size="sm">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login