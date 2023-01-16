import React, { useState } from 'react';
import loginRequest from '../api/loginRequest';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export const Login = () => {
  // useState to update and track the input fields from the login page
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    // loginRequest(email, password)
    //   .then(() => {
    //     navigate('/dashboard');
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //   });

    try {
      const response = await axios.post(`/api/users/verify`, { email, password })
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {/* display error message if error */}
      <div>{error}</div>
      {/* useState to track the data in each input field */}
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center"
      >
        <input
          type="email"
          placeholder="Email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      <div>
        Don't have an account?
        <Link to="/signup">Sign up right here!</Link>
      </div>
    </div>
  );
};
