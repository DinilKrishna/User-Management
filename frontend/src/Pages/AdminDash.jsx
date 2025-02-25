import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import UserTable from '../Components/UserTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../context/userStore';
import axiosInstance from '../api/axiosInstance';

const AdminDash = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const user = useUserStore((state) => state.user);
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshFlag, setRefreshFlag] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:    '',
        type: 'User',
        active: false
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const isAdminStored = localStorage.getItem('isAdmin');
        if (!token || isAdminStored !== 'true') {
          navigate('/admin');
        }
      }, [navigate]);
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Call the new add-user endpoint
          const response = await axiosInstance.post('admin/add-user/', formData);
          console.log('User created:', response.data);
          // Optionally refresh the user list in your UserTable
          // Clear the form and close the modal
          setFormData({ name: '', email: '', type: 'User', active: false });
          setShowModal(false);
          setRefreshFlag(prev => !prev);
        } catch (err) {
            console.error("Error creating user:", err);
            setError(err.response?.data?.error || 'Error creating user');
        }
    };

    return (
        <div className='overflow-hidden min-h-screen'>
            <Navbar />
            <div className='p-6'>
                <div className='flex justify-between items-center mb-4 mx-2'>
                    <input
                        type='text'
                        placeholder='Search users...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full max-w-xs p-2 border border-gray-300 rounded'
                    />
                    <button
                        onClick={() => setShowModal(true)}
                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4'
                    >
                        Add User
                    </button>
                </div>

                <div className='overflow-x-auto'>
                    <UserTable searchTerm={searchTerm} refreshFlag={refreshFlag} />
                </div>
            </div>

            {showModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4'>
                        <h2 className='text-2xl font-bold mb-4'>Add/Edit User</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <input
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    placeholder='Name'
                                    onChange={handleChange}
                                    className='w-full p-2 border border-gray-300 rounded'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    placeholder='Email'
                                    onChange={handleChange}
                                    className='w-full p-2 border border-gray-300 rounded'
                                    required
                                />
                            </div>
                            <div className='mb-4 relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    name='password'
                                    value={formData.password}
                                    placeholder='Password'
                                    onChange={handleChange}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                                    required
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-2 top-2 text-gray-500'
                                >
                                    {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                                </button>
                            </div>
                            <div className='mb-4'>
                                <select
                                    name='type'
                                    value={formData.type}
                                    onChange={handleChange}
                                    className='w-full p-2 border border-gray-300 rounded'
                                >
                                    <option value='User'>User</option>
                                    <option value='Admin'>Admin</option>
                                    <option value='Moderator'>Staff</option>
                                </select>
                            </div>

                            {error && <p className="text-red-500 mb-4">{error}</p>}

                            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                                Submit
                            </button>
                            <button
                                type='button'
                                onClick={() => setShowModal(false)}
                                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4'
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDash;
