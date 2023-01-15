import React, {useState } from 'react';
import loginRequest from '../api/loginRequest';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  // useState to update and track the input fields from the login page
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // handle login form submission 
  const handleLogin = (e) => {
    e.preventDefault();
    loginRequest(email, password)
      .then(() => {
        // navigate to todoapp page if signup was successful
        navigate('/todoapp');
        // send error mesasge if signup failed
      }).catch(err => {
        setError(err.message);
      });
  }

  return (
    <div className='flex flex-col'>
      {/* display error message if error */}
      <div>{error}</div>
      {/* useState to track the data in each input field */}
        <form onSubmit={handleLogin}>
          <input
            type='email'
            placeholder='Email:'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder='Password:'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </form>
        <div>
          Don't have an account? 
          <Link to="/signup">
            Sign up right here!
          </Link>
        </div>
    </div>
  )
}

