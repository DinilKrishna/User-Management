import React from 'react';
import Navbar from '../Components/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center mt-8">
                <h1 className="text-2xl">Hi User, welcome to the user management website</h1>
            </div>
        </div>
    );
};

export default Home;
