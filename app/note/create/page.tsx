'use client'
import React from 'react';
import NoteForm from '../../components/noteForm';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import next from 'next';
type FormValues = {
  title: string;
  body: string;
};
const createNote: React.FC = () => {
  const router = useRouter();
  const handleSubmit = (values: FormValues) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    // Handle login logic here
    fetch('http://localhost:8080/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        console.log('This is the response from the backend:', data.success);
        if (data.success) {
          console.log('You have created a note successfully.', data);
          router.push("../../dashboard")
        } else {
          console.error(data.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const initialValues: FormValues = {
    title: '',
    body: '',
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required('title is required'),
    body: yup.string().required('body is required'),
  });

  return (
    <div className='min-h-screen flex flex-col  justify-center bg-red-500'>
      <h1 className="text-8xl font-bold flex justify-center py-2 text-yellow-200">Note App</h1>
      <div className="flex  justify-left h-screen">
        <div className="flex justify-left flex-grow w-full">

          <div className="bg-gray-300 pt-8 px-24 rounded-lg w-full">
            <h1 className="text-4xl font-bold flex justify-center pb-12 text-black">Create Note</h1>
            <NoteForm
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
              submitButtonText="Create Note"

            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default createNote;