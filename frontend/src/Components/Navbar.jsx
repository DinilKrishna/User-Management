import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon

const Navbar = () => {
    const location = useLocation(); // Get the current location

    return (
        <div className='bg-violet-200 p-6 rounded-md shadow-lg flex justify-between items-center'>
            <h1 className='text-3xl font-bold mx-auto'>User Management</h1>
            {/* Conditionally render the profile icon only if on /home */}
            {location.pathname === '/home' && (
                <div className='mt-4'>
                    <Link to='/profile'>
                        <FontAwesomeIcon icon={faUser} className='text-gray-500 text-2xl hover:text-blue-600 cursor-pointer' /> Profile
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
