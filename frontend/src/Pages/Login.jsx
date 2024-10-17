import React, { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return(
        <div className=" flex justify-start items-center">
            <div className="bg-violet-200 p-8 rounded-lg shadow-xl w-full max-w-md m-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
    )
};

export default Login