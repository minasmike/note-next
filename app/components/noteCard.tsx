import next from 'next';
import React, { FC } from 'react';

interface CardProps {
    title: string;
    id: number;
    noteId: number;
}


const Card: FC<CardProps> = ({ title, noteId, id }) => {
    const handleOpen = () => {
        console.log("Open clicked ", { noteId });
    };

    const handleEdit = () => {
        console.log("Edit clicked");
    };

    const handleDelete = () => {
        console.log("Delete clicked");
        const token = localStorage.getItem('token'); // Retrieve the token from local storage

        // Handle login logic here
        fetch(`http://localhost:8080/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('This is the response from the backend:', data.success);
                if (data.success) {
                    console.log('You have Deleted a note successfully.', data);
                    window.location.reload(); // Refresh the page
                } else {
                    console.error(data.error);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };
    return (
        <div className="w-full border rounded-md px-6 py-4" key={id}>
            <div>{noteId}</div>
            <div className="flex items-center justify-between bg-green-100">
                <span className="flex-grow">{title}</span>
                <div className="flex items-center space-x-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-400" onClick={handleOpen}>
                        Open
                    </button>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-400" onClick={handleEdit}>
                        Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Card;
