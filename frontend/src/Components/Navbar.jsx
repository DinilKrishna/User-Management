import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const location = useLocation();

    // Handler for logout
    const handleLogout = () => {
        console.log('User logged out');
        // Add actual logout logic here, like clearing auth tokens, etc.
    };

    // Check if the logout button should be displayed
    const showLogoutButton = ['/home', '/profile', '/admin/dashboard'].includes(location.pathname);

    return (
        <div className={`${location.pathname.startsWith('/admin') ? 'bg-violet-800' : 'bg-violet-200'} p-6 rounded-md shadow-lg flex justify-between items-center`}>
            <h1 className='text-3xl font-bold mx-auto'>
                {location.pathname.startsWith('/admin') ? 'Admin Panel' : 'User Management'}
            </h1>
            
            <div className="flex items-center space-x-4">
                {location.pathname === '/home' && (
                    <Link to='/profile' className='text-gray-500 text-2xl hover:text-blue-600'>
                        <FontAwesomeIcon icon={faUser} /> Profile
                    </Link>
                )}
                {showLogoutButton && (
                    <button
                        onClick={handleLogout}
                        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
