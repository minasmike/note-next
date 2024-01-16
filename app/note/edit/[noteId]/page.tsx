'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import Buttoncomponent from "../../../components/button";
import NoteForm from '../../../components/noteForm';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NavBar from '@/app/components/navBar';
import * as yup from 'yup';
import { useParams, useRouter } from 'next/navigation';
import { Router } from 'next/router';
import { Height } from '@mui/icons-material';
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
  const [bodyValue, setBodyValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [success, setSuccess] = useState(true);
  const router = useRouter();
  // const router = useRouter();
  const { noteId } = useParams<{ noteId: string; }>();
  // Handle edit logic here
  useEffect(() => {
    console.log("first: ", noteId)
    const token = localStorage.getItem('token');
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
          setBodyValue(data.note.body)
          setTitleValue(data.note.title)
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
    return (
      <div className='flex justify-center mt-6'>
        <div className="flex flex-col gap-4 w-4/5 ">
          <div className="skeleton h-64 w-full"></div>
          <div className="skeleton h-14 w-1/3"></div>
          <div className="skeleton h-14 w-1/2"></div>
          <div className="skeleton h-14 w-3/4"></div>
          <div className="skeleton h-14 w-4/5"></div>
          <div className="skeleton h-14 w-full"></div>
          <div className="skeleton h-14 w-full"></div>
          <div className="skeleton h-14 w-full"></div>
        </div>



      </div>




    )
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
    <div className='bg-gray-200 flex-grow h-full'>
      <NavBar />
      <div className='min-h-full flex flex-col  justify-center '>

        <div className="flex  justify-left h-full">
          <div className="flex justify-left flex-grow w-full">

            <div className=" pt-8 px-24 rounded-lg w-full bg-b">
              <h1 className="text-4xl font-bold flex justify-center pb-12 text-black">Edit Note</h1>
              {/* <NoteForm
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
                submitButtonText="Edit Note"

              /> */}

              <label className="form-control w-3/4">
                <div className="label">
                  <span className="label-text">Title</span>

                </div>
                <input type="text" placeholder="Title" className="input input-bordered  w-full bg-gray-100" value={titleValue} onChange={(event) => setTitleValue(event.target.value)} />
                <div className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt"></span>
                </div>
              </label>
              <ReactQuill theme="snow" value={bodyValue} onChange={setBodyValue} style={{ height: "740px" }} className='bg-gray-100 large-editor' placeholder={initialValues.body} />
              <div className='flex justify-end my-8'>
                <Buttoncomponent
                  disabled={false}
                  text='Save Edit'
                  onClickAction={() => handleSubmit({ title: titleValue, body: bodyValue })}
                  className='bg-green-300 mt-8 hover:bg-green-400'
                /></div>


            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default EditNote;