'use client'

import React, { useState } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Input, Button } from "@nextui-org/react"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
})

const AdminLogin = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      // Here you would typically make an API call to your authentication endpoint
      // For demonstration, we'll just simulate a login after a short delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulating a successful login
      console.log("Login successful", values)
      setStatus({ success: "Login successful! Redirecting..." })

      // In a real application, you would handle the successful login here,
      // such as storing the auth token and redirecting to the admin dashboard
    } catch (error) {
      console.error("Login failed", error)
      setStatus({ error: "Login failed. Please check your credentials." })
    } finally {
      setSubmitting(false)
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
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, status }) => (
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

              {status && status.error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{status.error}</span>
                </div>
              )}
              {status && status.success && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{status.success}</span>
                </div>
              )}
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