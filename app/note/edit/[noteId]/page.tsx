'use client'
import React from 'react';
import { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";
import NoteForm from '../../../components/noteForm';
import * as yup from 'yup';
import { useParams, useRouter } from 'next/navigation';
import { Router } from 'next/router';
type FormValues = {
  title: string;
  body: string;
};
interface Note {
  id: number;
  title: string;
  body: string;
}

interface NoteResponse {
  success: boolean,
  error?: string,
  note: Note
}

const EditNote: React.FC = () => {
  const [note, setNote] = useState<Note>();
  const token = localStorage.getItem('token');
  const [success, setSuccess] = useState(true);
  const router = useRouter();
  // const router = useRouter();
  const { noteId } = useParams<{ noteId: string; }>();
  // Handle edit logic here
  useEffect(() => {
    console.log("first: ", noteId)
    fetch(`http://localhost:8080/notes/${noteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json() as Promise<NoteResponse>)
      .then(data => {
        console.log('This is the response from the backend:', data.success);
        setSuccess(data.success);
        if (data.success) {
          console.log('You have fetched the note successfully.', data.note);
          setNote(data.note);
        } else {
          console.error(data.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (values: FormValues) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    console.log("Updated values:", values)
    fetch(`http://localhost:8080/notes/${noteId}`, {
      method: 'PUT', // or 'PATCH' depending on your backend API
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
          console.log('Note edited successfully.', data);
          console.log(noteId);
          router.push('../../../dashboard')
        } else {
          console.error(data.error);
          console.log(noteId);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (!note) {
    return <div>Loading...</div>
  }

  const initialValues: FormValues = {
    title: note.title,
    body: note.body,
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