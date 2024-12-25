import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input, Button, Checkbox } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import ButtonComponent from './UI/ButtonComponent';

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full name is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const handleSubmit = async (values) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, values);
        console.log('Signup response:', response.data);
        toast.success('Registration successful!');
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An error occurred while signing up';
            toast.error(errorMessage);
            console.error('Error signing up:', error.response?.data);
        } else {
            toast.error('An unexpected error occurred');
            console.error('Unexpected error:', error);
        }
    }
};

const SignUpPage = ({ handleActivePage }) => {
    return (
        <div>
            <h2 className="text-3xl font-medium text-center text-primaryColor">Welcome to COMO!</h2>
            <h2 className="text-base font-light mb-6 text-center text-gray-600">Create an account</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <Field name="fullName">
                                {({ field }) => (
                                    <Input
                                        {...field}
                                        id="fullName"
                                        type="text"
                                        radius='none'
                                        placeholder='John Doe'
                                        className={errors.fullName && touched.fullName ? 'border-red-500' : ''}
                                    />
                                )}
                            </Field>
                            {errors.fullName && touched.fullName && <div className="text-red-500 text-sm mt-1">{errors.fullName}</div>}
                        </div>

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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <Field name="confirmPassword">
                                {({ field }) => (
                                    <Input
                                        {...field}
                                        id="confirmPassword"
                                        type="password"
                                        radius='none'
                                        placeholder='Confirm Password'
                                        className={errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}
                                    />
                                )}
                            </Field>
                            {errors.confirmPassword && touched.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
                        </div>

                        <div className='flex justify-between items-center w-full'>
                            <div>
                                <Checkbox radius="none" size="sm">
                                    <span className='text-sm text-gray-500'>I agree to the Terms of Service</span>
                                </Checkbox>
                            </div>
                        </div>

                        <div className='w-full flex justify-center gap-4'>
                            <ButtonComponent type='submit' className='bg-blue-800 text-white w-full' radius='none' disableAnimation>
                                Sign Up
                            </ButtonComponent>
                        </div>

                        <div className='text-sm text-gray-400 cursor-pointer hover:opacity-85' onClick={() => handleActivePage(0)}>
                            <p>Already have an account? <span className='text-primaryColor'>Login</span></p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignUpPage;

