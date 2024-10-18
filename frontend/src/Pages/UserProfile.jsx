import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../context/userStore';

const UserProfile = () => {
    const user = useUserStore((state) => state.user);
    const [profilePic, setProfilePic] = useState(null); // State to store uploaded image
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [tempImage, setTempImage] = useState(null); // Temporary image for preview

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0];
            const imageUrl = URL.createObjectURL(imageFile);
            setTempImage(imageUrl); // Update state with the temporary image URL
        }
    };

    const handleSaveImage = () => {
        setProfilePic(tempImage); // Save the temporary image to profilePic
        setIsModalOpen(false); // Close the modal
        setTempImage(null); // Reset temp image
    };

    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
            <div className="bg-violet-200 p-6 rounded-lg shadow-lg w-full max-w-md">

                {/* Profile Picture and Change Button Section */}
                <div className="flex justify-center items-center mb-4">
                    <div className="mr-4">
                        {/* Show the uploaded image */}
                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border border-gray-300"
                            />
                        ) : (
                            <div className="bg-white w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center">
                                <span>No Image</span>
                            </div>
                        )}
                    </div>
                    {/* Change Profile Picture Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Edit Profile
                    </button>
                </div>

                <div className="mb-4">
                    <label className="font-semibold">Name:</label>
                    <p>{user ? user.name : 'John Doe'}</p>
                </div>
                <div className="mb-4">
                    <label className="font-semibold">Email:</label>
                    <p>{user ? user.email : 'user@example.com'}</p>
                </div>
                <div className="mb-4">
                    <label className="font-semibold">Token:</label>
                    <p>{user ? user.token : 'fake-jwt-token'}</p>
                </div>
                <Link to='/home'>
                        <button type='button' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Back to Home</button>
                </Link>
            </div>

            {/* Modal for Uploading Image */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-bold mb-4">Upload Profile Picture</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mb-4"
                        />
                        {tempImage && (
                            <img
                                src={tempImage}
                                alt="Preview"
                                className="w-full mb-4 rounded-lg"
                            />
                        )}
                        <div className="flex justify-between">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveImage}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
