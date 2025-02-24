import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import UserProfile from './Pages/UserProfile';
import AdminLogin from './Pages/AdminLogin';
import AdminDash from './Pages/AdminDash';
import { useUserStore } from './context/userStore';
import { useEffect } from 'react';

function App() {

  const rehydrateUser = useUserStore((state) => state.rehydrateUser);

  useEffect(() => {
    rehydrateUser();
  }, [rehydrateUser]);

  return (
    <>
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDash />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
