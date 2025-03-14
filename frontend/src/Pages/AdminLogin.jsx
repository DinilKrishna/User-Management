import React, { useState, useEffect } from 'react'
import axiosInstance from "../api/axiosInstance";
import { useUserStore } from '../context/userStore';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const setUser = useUserStore((state) => state.setUser);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const location = useLocation(); 
    const successMessage = location.state?.message;

    const token = localStorage.getItem('accessToken');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (token && isAdmin) {
        return <Navigate to="/admin/dashboard" replace />;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulate API call for login
        try {
            const response = await axiosInstance.post('admin/login/', { email, password }); 
            const { access, refresh, user } = response.data;

            // Set user data in your Zustand store (you can also add an isAdmin flag)
            setUser({
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                token: access,
                isAdmin: user.isAdmin,
            });

            // Optionally, also save the token in localStorage
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('isAdmin', 'true');
    
            // Redirect to admin dashboard
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid email or password');
        }
    };

    return(
        <>
        <Navbar/>
        <div className=" flex justify-start items-center">
            <div className="bg-violet-800 p-8 rounded-lg shadow-xl w-full max-w-md m-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {/* {successMessage && (
                    <p className="text-green-500 text-center mb-4">{successMessage}</p>
                )} */}

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
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

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <div className="flex space-x-2 mt-6">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                        <Link to="/signup" className="flex-1">
                            <button
                                type="button"
                                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                            >
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
};

// Simulated API login function (replace with real API call)
const mockApiLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === "user@example.com" && password === "password123") {
                resolve({
                    user: { name: "John Doe", email: "user@example.com" },
                    token: "fake-jwt-token",
                });
            } else {
                reject("Invalid credentials");
            }
        }, 1000);
    });
};
export default AdminLogin