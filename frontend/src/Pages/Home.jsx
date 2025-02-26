import React, {useEffect, useState} from 'react';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('accessToken'));

    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/');
        }
    }, [token, navigate]); 
    

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center mt-8">
                <h1 className="text-2xl">Hi User, welcome to the user management website</h1><br />
                <h2 className="text-xl">Only never cache schemes and logging out issues left as of now</h2>
            </div>
        </div>
    );
};

export default Home;
