import React, { useState } from 'react';
import Home from './Home.jsx';
import { Login }  from './Login.jsx';
import { SignUp } from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Logo from '../Images/Logo.png';

const Navbar = () => {
  const [selectedPage, setSelectedPage] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed w-screen bg-secondary-500 h-[80px] z-10 drop-shadow-xl">
        <div className="flex justify-between w-full h-full px-20">
          <div className="flex items-center gap-10">
            <img
              alt="logo"
              src={Logo}
              onClick={() => navigate('/')}
              className="cursor-pointer"
            />
            <Link
              to="/"
              onClick={() => setSelectedPage('home')}
              className={`${
                selectedPage === 'home'
                  ? 'text-tertiary-500'
                  : 'text-primary-500'
              } hover:text-opacity-75`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setSelectedPage('dashboard')}
              className={`${
                selectedPage === 'dashboard'
                  ? 'text-tertiary-500'
                  : 'text-primary-500'
              } hover:text-opacity-75`}
            >
              Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-10">
            <Link to="/login">
              <button className="bg-primary-500 text-secondary-500">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button>Become a Member</button>
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default Navbar;
