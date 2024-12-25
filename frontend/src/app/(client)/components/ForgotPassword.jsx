import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Input } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import ButtonComponent from './UI/ButtonComponent';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
});

const initialValues = {
    email: '',
};

const handleSubmit = async (values) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, values);
        console.log('Password reset response:', response.data);
        toast.success('Password reset link sent to your email');
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An error occurred while sending reset link';
            toast.error(errorMessage);
            console.error('Error sending reset link:', error.response?.data);
        } else {
            toast.error('An unexpected error occurred');
            console.error('Unexpected error:', error);
        }
    }
};

const ForgotPassword = ({ handleActivePage }) => {
    return (
        <div>
            <div className="max-w-full mx-auto">
                <h2 className="text-3xl font-medium text-center text-primaryColor">Forgot password?</h2>
                <p className="text-xs font-light mb-6 text-center text-gray-600">Enter your email address to recover your password.</p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="space-y-6">
                            <div>
                                <Field name="email">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            id="email"
                                            type="email"
                                            radius='none'
                                            placeholder='Email'
                                            className={errors.email && touched.email ? 'border-red-500' : ''}
                                        />
                                    )}
                                </Field>
                                {errors.email && touched.email && (
                                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                                )}
                            </div>

                            <div>
                                <ButtonComponent
                                    type='submit'
                                    className='bg-black text-white w-full'
                                    radius='none'
                                    disableAnimation
                                >
                                    Send Password Reset Link
                                </ButtonComponent>
                            </div>

                            <div
                                className='text-gray-600 text-start text-sm cursor-pointer hover:opacity-85'
                                onClick={() => handleActivePage(0)}
                            >
                                Back to Login
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    );
};

export default ForgotPassword;
