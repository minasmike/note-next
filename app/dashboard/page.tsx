'use client'
import React, { useEffect, useState } from 'react';
import NoteCard from '../components/noteCard';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navBar';
import AlertDialogSlide from '../components/confirmationDialog';

interface Note {
    id: number;
    title: string;
}
interface User {
    id: number;
    username: string;
}

const Dashboard = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [user, setUser] = useState<User>();
    const [success, setSuccess] = useState(true);
    const [deletingNote, setDeletingNote] = useState<Note | null>(null); // Store the entire note object
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Fetch Notes
        const token = localStorage.getItem('token');
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

        // Fetch User Profile
        fetch('http://localhost:8080/user/user-Profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('User Profile:', data.user);
                // Process the user profile data and update state if needed
                setUser(data.user);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDelete = (note: Note) => {
        setDeletingNote(note);
        setOpenConfirmation(true);
    };
    const handleOpen = () => {
        console.log("open")
    }

    const handleEdit = (noteId: number) => {
        router.push(`/note/edit/${noteId}`)
    }

    const performDelete = (note: Note) => {
        console.log("Delete clicked");
        const token = localStorage.getItem('token');

        fetch(`http://localhost:8080/notes/${note.id}`, {
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
                    setNotes(prevNotes => prevNotes.filter(n => n.id !== note.id));
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
                <Navbar />
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
                                            onOpen={() => handleOpen()}
                                            onEdit={() => handleEdit(note.id)}
                                            onDelete={() => handleDelete(note)}
                                            noteId={0}
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

            {deletingNote && (
                <AlertDialogSlide
                    title={deletingNote.title}
                    openConfirmation={openConfirmation}
                    setopenConfirmation={setOpenConfirmation}
                    onDelete={() => {
                        performDelete(deletingNote);
                        setDeletingNote(null);

                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;