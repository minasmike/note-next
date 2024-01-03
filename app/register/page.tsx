'use client'
import React from 'react';
import AuthForm from '../components/authForm';
import * as yup from 'yup';
type FormValues = {
  username: string;
  password: string;
};
const RegisterPage: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    // Handle Register logic here
    console.log('Register form submitted with values:', values);
  };

  const initialValues: FormValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'). min(8, "the password must be atleast 8 characters."),
  });

  return (
    <div className=' bg-black '>
       <h1 className="text-8xl font-bold flex justify-center pt-4">Note App</h1>
    <div className="flex items-center justify-center h-screen -mt-24">
      <div className="">
        
        <div className="bg-gray-300 pt-24 pb-36 px-24 rounded-lg">
        <h1 className="text-4xl font-bold flex justify-center pb-24 text-black">Register Page</h1>
        <AuthForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          submitButtonText="Register"
          linkToPage='/login'
          linkName="Login"
          message="Already have an account. "
        />
        </div>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;