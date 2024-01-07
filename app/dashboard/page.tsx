'use client'
import React, { useEffect, useState } from 'react';
import NoteCard from '../components/noteCard';
import { useRouter } from 'next/navigation';
import ResponsiveAppBar from '../components/navBar'

const Dashboard = () => {
    interface Note {
        id: number;
        title: string;

        // Add other properties of the note object
    }

    const [notes, setNotes] = useState<Note[]>([]);
    const token = localStorage.getItem('token');
    const [success, setSuccess] = useState(true);
    const router = useRouter();
    useEffect(() => {
        // Retrieve the token from local storage

        // Handle login logic here
        fetch('http://localhost:8080/notes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },

        })
            .then(response => response.json())
            .then(data => {
                console.log('This is the response from the backend:', data.success);
                setSuccess(data.success);
                if (data.success) {
                    console.log('You have feteched all notes successfully.', data.notes);
                    setNotes(data.notes);
                    console.log("Notes: ", notes);


                } else {
                    console.error(data.error);
                    console.log("Notes: ", notes);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    // const handleOpen = () => {
    //     console.log("Open clicked");
    // };

    // const handleEdit = () => {
    //     console.log("Edit clicked");
    // };

    // const handleDelete = () => {
    //     console.log("Delete clicked");
    // };
    const handleRedirectToLogin = () => {
        router.push('/auth/login');
    };


    return (
        <div>
            <div><ResponsiveAppBar /></div>
            <div className='text-8xl flex flex-col  mt-8 font-extrabold'>
                <h1 className='flex justify-center mb-6'>Dashboard</h1>
                <>
                    {success ? (
                        <>
                            {notes.length > 0 ? (
                                <div className='text-6xl font-normal'>
                                    {notes.map((note, index) => (
                                        <NoteCard
                                            id={index}
                                            key={index}
                                            noteId={note.id}
                                            title={note.title}
                                        // onOpen={handleOpen}
                                        // onEdit={handleEdit}
                                        // onDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className='flex justify-center items-center font-bold text-6xl text-red-600 h-screen -m-24'>
                                    NO NOTE TO SHOW!
                                </div>
                            )}
                        </>
                    ) : (
                        handleRedirectToLogin()
                    )}
                </>

            </div>
        </div>
    );
}

export default Dashboard;
