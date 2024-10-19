import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import UserTable from '../Components/UserTable';
import { useUserStore } from '../context/userStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AdminDash = () => {
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'User',
        active: false
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to add or edit user
        console.log('User data submitted:', formData);
        // Clear form after submission
        setFormData({ name: '', email: '', type: 'User', active: false });
};

  return (
    <div>
      <Navbar />
      <div className='flex p-6'>
        <div className='bg-violet-800 p-8 rounded-lg shadow-xl w-1/3 max-w-md mx-3 my-6'>
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
            <div className="mb-4 relative">
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    placeholder='Password'
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-gray-500 focus:outline-none"
                >
                    {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                </button>
            </div>
            <div className='mb-4'>
              <select
                name='type'
                value={formData.type}
                placeholder='User Type'
                onChange={handleChange}
                className='w-full p-2 border border-gray-300 rounded'
              >
                <option value='User'>User</option>
                <option value='Admin'>Admin</option>
                <option value='Moderator'>Staff</option>
              </select>
            </div>
            {/* <div className='mb-4'>
              <label className='block text-gray-700'>Active</label>
              <input
                type='checkbox'
                name='active'
                checked={formData.active}
                onChange={() => setFormData({ ...formData, active: !formData.active })}
                className='mr-2'
              />
              <span>{formData.active ? 'Yes' : 'No'}</span>
            </div> */}
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right half: User Table */}
        <div className='w-1/2 p-4'>
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
