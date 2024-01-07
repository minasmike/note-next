'use client'
import React, { useEffect, useState } from 'react';
import NoteCard from '../components/noteCard';
import { useRouter } from 'next/navigation';
import ResponsiveAppBar from '../components/navBar';

interface Note {
    id: number;
    title: string;
    // Add other properties of the note object
}

const Dashboard = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const token = localStorage.getItem('token');
    const [success, setSuccess] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:8080/notes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('This is the response from the backend:', data.success);
                setSuccess(data.success);
                if (data.success) {
                    console.log('You have fetched all notes successfully.', data.notes);
                    setNotes(data.notes);
                } else {
                    console.error(data.error);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDelete = (noteId: number) => {
        console.log("Delete clicked");
        const token = localStorage.getItem('token');

        fetch(`http://localhost:8080/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('This is the response from the backend:', data.success);
                if (data.success) {
                    console.log('You have Deleted a note successfully.', data);
                    // Update the notes state by filtering out the deleted note
                    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
                } else {
                    console.error(data.error);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleRedirectToLogin = () => {
        router.push('/auth/login');
    };

    return (
        <div>
            <div>
                <ResponsiveAppBar />
            </div>
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
                                            title={note.title}
                                            onDelete={() => handleDelete(note.id)} noteId={0} />
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
};

export default Dashboard;