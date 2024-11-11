'use client'

import React from 'react'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from "@nextui-org/react";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

// Validation schema
const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })
  
const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
          // Here you would typically make an API call to your authentication endpoint
          // For demonstration, we'll just simulate a login after a short delay
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Simulating a successful login
          console.log('Login successful', values)
          setStatus({ success: 'Login successful! Redirecting...' })
          
          // In a real application, you would handle the successful login here,
          // such as storing the auth token and redirecting to the admin dashboard
        } catch (error) {
          console.error('Login failed', error)
          setStatus({ error: 'Login failed. Please check your credentials.' })
        } finally {
          setSubmitting(false)
        }
      }
    

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold">Como Admin</h2>
        <p className="text-gray-600 mb-6">Enter your credentials to access the admin panel</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, status }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@como.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-500" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="h-5 w-5 text-gray-400" />
                    ) : (
                      <IoEyeOutline className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-500" />
              </div>
              {status && status.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{status.error}</span>
                </div>
              )}
              {status && status.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{status.success}</span>
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>

  )
}

export default AdminLogin