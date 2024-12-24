'use client'

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Input, Button } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import axios from "axios"
import ButtonComponent from './UI/ButtonComponent'
import { Checkbox } from "@nextui-org/react";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
})

const initialValues = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, values);
            console.log('Login response:', response.data);
            toast.success('Logged in successfully');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'An error occurred while logging in';
                toast.error(errorMessage);
                console.error('Error logging in:', error.response?.data);
            } else {
                toast.error('An unexpected error occurred');
                console.error('Unexpected error:', error);
            }
        }
    }

    return (
        <div className="w-full max-w-2xl p-4 mx-auto">
            <h2 className="text-3xl font-medium text-center text-primaryColor">Welcome Back!</h2>
            <h2 className="text-base font-light mb-6 text-center text-gray-600">Login to your account</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Field name="email">
                                {({ field }) => (
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        radius='none'
                                        placeholder='johndoe@example.com'
                                        className={errors.email && touched.email ? 'border-red-500' : ''}
                                    />
                                )}
                            </Field>
                            {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <Field name="password">
                                {({ field }) => (
                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                        radius='none'
                                        placeholder='Password'
                                        className={errors.password && touched.password ? 'border-red-500' : ''}
                                    />
                                )}
                            </Field>
                            {errors.password && touched.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                        </div>

                        <div className='flex justify-between items-center w-full'>
                            <div>
                                <Checkbox radius="none" size="sm" >
                                    <span className='text-sm text-gray-500'>Remember Me</span>
                                </Checkbox>
                            </div>

                            <div>
                                <p className='text-sm underline text-gray-500 hover:opacity-80 cursor-pointer'>ForgotPassword?</p>
                            </div>
                        </div>
                        <div className='w-full flex justify-center gap-4'>
                            <ButtonComponent type='submit' className='bg-blue-800 text-white w-full' radius='none' disableAnimation>
                                Login
                            </ButtonComponent>
                        </div>
                        <div className='text-sm text-gray-400'>
                            <p>Don't have account?<span className='text-primaryColor'>Signup</span></p>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm