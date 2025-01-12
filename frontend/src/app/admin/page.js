'use client'

import React, { useState } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { Input, Button } from "@nextui-org/react"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { loginAdmin } from "@/lib/auth";

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
})

const AdminLogin = () => {
  const router = useRouter()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  const handleLogin = async (values, { setSubmitting }) => {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('password', values.password)

    const result = await loginAdmin(formData)
    if (result.success) {
      toast.success(result.message)
      router.push('/admin/test')
    } else {
      toast.error(result.message)
    }

    setSubmitting(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-2">Como Admin</h2>
        <p className="text-gray-500 mb-6">
          Enter your credentials to access the admin panel
        </p>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
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

              <Button
                type="submit"
                
                isLoading={isSubmitting}
                className="w-full bg-primaryColor text-white"
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AdminLogin