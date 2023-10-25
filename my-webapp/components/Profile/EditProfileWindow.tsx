import Image from 'next/image';
import React, { useState } from 'react';
import Close from "../../assets/close.png"

interface EditProfileWindowProps {
    username: string;
    bio: string;
    onSave: (editedUsername: string, editedBio: string) => void;
    onCancel: () => void;
}

function EditProfileWindow(props: EditProfileWindowProps) {
    const [editedUsername, setEditedUsername] = useState(props.username);
    const [editedBio, setEditedBio] = useState(props.bio);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedUsername(event.target.value);
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedBio(event.target.value);
    };

    const handleSave = () => {
        props.onSave(editedUsername, editedBio);
    };

    const handleCancel = () => {
        props.onCancel();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-1/2 bg-white rounded-lg p-4 shadow-lg">
                <button
                    onClick={handleCancel}
                    className=" flex text-white p-2 rounded mt-2 ml-2"
                >
                    <Image src={Close} height={20} width={20} alt="Close" />
                </button>
                <h2 className="text-xl font-bold mb-2">Edit Profile</h2>
                <label>Username:</label>
                <input
                    type="text"
                    value={editedUsername}
                    onChange={handleUsernameChange}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />

                <label>Bio:</label>
                <textarea
                    value={editedBio}
                    onChange={handleBioChange}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    rows={4} // Increase this value to make the textarea taller
                />
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white p-2 rounded mt-2"
                >
                    Save
                </button>
               
            </div>
        </div>
    );
}

export default EditProfileWindow;



