import React, { FC } from 'react';

interface CardProps {
    title: string;
    id: number;
    noteId: number;
    onDelete: () => void;
}

const Card: FC<CardProps> = ({ title, id, onDelete }) => {
    const handleOpen = () => {
        console.log("Open clicked ");
    };

    const handleEdit = () => {
        console.log("Edit clicked");
    };

    return (
        <div className="w-full border rounded-md px-6 py-4" key={id}>
            <div className="flex items-center justify-between bg-green-100">
                <span className="flex-grow">{title}</span>
                <div className="flex items-center space-x-2">
                    <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-400"
                        onClick={handleOpen}
                    >
                        Open
                    </button>
                    <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-400"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;