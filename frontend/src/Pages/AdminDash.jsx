import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import UserTable from '../Components/UserTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '../context/userStore';
import axiosInstance from '../api/axiosInstance';

const AdminDash = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshFlag, setRefreshFlag] = useState(false);
  
  // Flags for add/edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  
  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'User',
    active: false,
  });
  
  // Synchronous check: read token and isAdmin flag from localStorage
  const token = localStorage.getItem('accessToken');
  const isAdminStored = localStorage.getItem('isAdmin');

  // If no valid token or admin flag is not set, immediately redirect to admin login.
  if (!token || isAdminStored !== 'true') {
    return <Navigate to="/admin" replace />;
  }
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Combined submit handler for add and edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a payload mapping your form fields to the model fields.
    const dataToSend = {
      username: formData.name,
      email: formData.email,
      is_active: formData.active,
      is_staff: formData.type === 'Admin' || formData.type === 'Staff',
      is_superuser: formData.type === 'Admin',
    };
    if (formData.password) {
      dataToSend.password = formData.password;
    }
    if (isEditing) {
      try {
        const response = await axiosInstance.patch(`users/${editingUserId}/`, dataToSend);
        console.log("User updated:", response.data);
        setFormData({ name: '', email: '', password: '', type: 'User', active: false });
        setShowModal(false);
        setIsEditing(false);
        setEditingUserId(null);
        setRefreshFlag(prev => !prev);
      } catch (err) {
        console.error("Error updating user:", err.response?.data || err.message);
      }
    } else {
      try {
        const response = await axiosInstance.post('admin/add-user/', dataToSend);
        console.log("User created:", response.data);
        setFormData({ name: '', email: '', password: '', type: 'User', active: false });
        setShowModal(false);
        setRefreshFlag(prev => !prev);
      } catch (err) {
        console.error("Error creating user:", err.response?.data || err.message);
      }
    }
  };

  // When "Edit" is clicked in the table, fill the form with the user's current data and set editing mode.
  const handleEditClick = (selectedUser) => {
    console.log('staff:', selectedUser.is_staff, 'admin:', selectedUser.is_superuser);
    setFormData({
      name: selectedUser.username,
      email: selectedUser.email,
      password: '', // Leave blank to keep current password
      type: selectedUser.is_staff ? (selectedUser.is_superuser ? 'Admin' : 'Staff') : 'User',
      active: selectedUser.is_active,
    });
    setEditingUserId(selectedUser.id);
    setIsEditing(true);
    setShowModal(true);
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
            onClick={() => {
              setIsEditing(false);
              setFormData({ name: '', email: '', password: '', type: 'User', active: false });
              setShowModal(true);
            }}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4'
          >
            Add User
          </button>
        </div>
        <div className='overflow-x-auto'>
          <UserTable searchTerm={searchTerm} refreshFlag={refreshFlag} handleEditClick={handleEditClick} />
        </div>
      </div>
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4'>
            <h2 className='text-2xl font-bold mb-4'>{isEditing ? 'Edit User' : 'Add User'}</h2>
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
                  placeholder={isEditing ? 'Leave blank to keep current password' : 'Password'}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  required={!isEditing}
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
                  <option value='Staff'>Staff</option>
                </select>
              </div>
              <div className='mb-4'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    name='active'
                    checked={formData.active}
                    onChange={handleChange}
                    className='mr-2'
                  />
                  Active
                </label>
              </div>
              <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                {isEditing ? 'Update User' : 'Add User'}
              </button>
              <button
                type='button'
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  setFormData({ name: '', email: '', password: '', type: 'User', active: false });
                }}
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
