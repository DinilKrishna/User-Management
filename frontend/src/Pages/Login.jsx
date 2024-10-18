import React, { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useUserStore } from "../context/userStore";
import Navbar from "../Components/Navbar";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();

    const location = useLocation(); // To get state passed during navigation
    const successMessage = location.state?.message; // Access success message from signup

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Simulate API call for login
        try {
            const response = await mockApiLogin(email, password); 
            const { user, token } = response; 

            // Set user data in Zustand store
            setUser({
                name: user.name,
                email: user.email,
                token: token,
            });

            navigate('/home');
        } catch (err) {
            setError('Invalid email or password');
        }
    };
    return(
        <>
        <Navbar />
        <div className=" flex justify-start items-center">
            <div className="bg-violet-200 p-8 rounded-lg shadow-xl w-full max-w-md m-12">
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

                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
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

export default Login