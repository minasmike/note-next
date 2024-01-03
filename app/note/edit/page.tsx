'use client'
import React from 'react';
import NoteForm from '../../components/noteForm';
import * as yup from 'yup';
type FormValues = {
  title: string;
  body: string;
};
const EditNote: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    // Handle Register logic here
    console.log('Note saved. Submitted with values:', values);
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
            <h1 className="text-4xl font-bold flex justify-center pb-12 text-black">Edit Note</h1>
            <NoteForm
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
              submitButtonText="Edit Note"
              
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNote;