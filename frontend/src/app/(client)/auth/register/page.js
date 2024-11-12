'use client'

import React, { useState } from 'react'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Input, Button, Link } from "@nextui-org/react"
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff  } from "react-icons/fi"

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
})

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  return (
    <div className=' h-screen flex justify-center items-center bg-gray-100'>
      <div className="w-[512px] mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <Formik
          initialValues={{ fullName: '', email: '', password: '' }}
          validationSchema={RegisterSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
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