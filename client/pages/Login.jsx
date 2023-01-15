import React, {useState } from 'react';
import loginRequest from '../api/loginRequest';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginRequest(email, password)
      .then(() => {
        navigate('/todoapp');
      }).catch(err => {
        setError(err.message);
      });
  }

  return (
    <div className="flex items-center justify-between">
      <div style={{color: 'red'}}>{error}</div>
        <form onSubmit={handleLogin}>
          Email:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          Password:
          <input
            type='password'
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

