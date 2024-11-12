'use client'

import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Input, Button, Link } from "@nextui-org/react"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
})

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  return (
    <div className=' h-screen flex justify-center items-center bg-gray-100'>
       <div className="w-[448px] mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
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

            <Button type="submit" color="primary" isLoading={isSubmitting}>
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