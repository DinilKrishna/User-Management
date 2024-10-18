import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../context/userStore';
import Navbar from "../Components/Navbar";


const NAME_REGEX = /^[A-Za-z\s]{3,32}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

    const setUser = useUserStore((state) => state.setUser); // Zustand action to set user data
    const navigate = useNavigate(); // For redirecting after signup

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!NAME_REGEX.test(name)){
            setError('Invalid name format. Name should only consist of alphabets and spaces and should be between 3-32 characters');
            return;
        }else {
            setError(''); 
        }
        if (!EMAIL_REGEX.test(email)){
            setError('Invalid email');
            return;
        }else {
            setError('');
        }
        if (!PASSWORD_REGEX.test(password)){
            setError('Password must be 8-24 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
            return;
        }else {
            setError(''); 
        }
        if (password !== confirmPassword){
            setError('Passwords do not match');
            return;
        }else {
            setError(''); 
        }

        setError('');
        console.log({ name, email, password });

        try {
            const response = await mockApiSignup(name, email, password); // Simulated API call
            const { user, token } = response;

            // Set user data in Zustand store
            setUser({
                name: user.name,
                email: user.email,
                token: token,
            });

            // Redirect to home page
            navigate('/', alert('Signup Succesful. Please Log in!'));
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

    return(
        <>
        <Navbar />
        <div className=" flex justify-end items-center">
            <div className="bg-violet-200 p-8 rounded-lg shadow-xl w-full max-w-md m-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder='Name'
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

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
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <div className="mb-4 relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmpassword"
                            value={confirmPassword}
                            placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-2 top-2 text-gray-500 focus:outline-none"
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <div className='flex space-x-2 mt-6'>
                        <Link to='/' className='flex-1'>
                        <button 
                            type='button' 
                            className='w-full  flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300'>
                                Back
                        </button>
                        </Link>
                        <button
                            type='submit'
                            className='flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300'>
                                Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

// Simulated API signup function (replace with real API call)
const mockApiSignup = async (name, email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email !== "existinguser@example.com") {
                resolve({
                    user: { name, email },
                    token: "fake-jwt-token",
                });
            } else {
                reject("User already exists");
            }
        }, 1000);
    });
};

export default Signup