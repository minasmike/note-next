'use client'
import React, { useEffect, useState } from 'react';
import AccordionCard from '../components/accordionCard';
import NoteCard from '../components/noteCard';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navBar';
import AlertDialogSlide from '../components/confirmationDialog';

interface Note {
    id: number;
    title: string;
    body: string;
}
interface User {
    id: number;
    username: string;
}

const Dashboard = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [successDataFetch, setSuccessDataFetch] = useState(false);
    const [user, setUser] = useState<User>();
    const [success, setSuccess] = useState(false);
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
                // setSuccessDataFetch(data.success);
                setIsLoading(false);
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
            <div className=" flex flex-col font-extrabold">
                <h1 className="flex justify-center mb-6 text-4xl sm:text-6xl">All Notes</h1>
                {isLoading && !success && (
                    <div className="flex justify-center items-center font-bold text-6xl text-white h-screen -m-24">
                        <div className="flex flex-col items-center mt-6 w-full">
                            <p className="text-center mb-16 text-3xl sm:text-6xl">Loading Notes  . . . .</p>
                            <div className="flex flex-col gap-4 w-full max-w-lg">
                                <div className="skeleton h-14"></div>
                                <div className="skeleton h-14"></div>
                                <div className="skeleton h-14"></div>
                                <div className="skeleton h-14"></div>
                            </div>
                        </div>
                    </div>
                )}
                {!isLoading && success && (
                    <>
                        {notes.length > 0 ? (
                            <div className="flex flex-col justify-center items-center">
                                {notes.map((note, index) => (
                                    <AccordionCard
                                        id={index}
                                        key={index}
                                        title={note.title}
                                        body={note.body}
                                        onOpen={() => handleOpen()}
                                        onEdit={() => handleEdit(note.id)}
                                        onDelete={() => handleDelete(note)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center font-bold text-6xl text-red-600 h-screen -m-24">
                                NO NOTE TO SHOW!
                            </div>
                        )}
                    </>
                )}
                {!isLoading && !success && (
                    <>{handleRedirectToLogin()}</>
                )}

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
        </div>
    );
};

export default Dashboard;