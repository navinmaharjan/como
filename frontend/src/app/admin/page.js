'use client'

import React, { useState } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { Input, Button } from "@nextui-org/react"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
})

const AdminLogin = () => {
  const router = useRouter()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  const handleLogin = async (values) => {
    try {
      const { data } = await axios.post('http://localhost:8000/admin/login', values);
      console.log(data)
      if (data) {
        toast.success(data.msg);
        router.push("/admin/dashboard")
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || "An unexpected error occurred.";
      toast.error(errorMessage);
      console.error("Error posting data:", error);
    }
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
                color="primary"
                isLoading={isSubmitting}
                className="w-full"
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