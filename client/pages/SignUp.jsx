import React, { useState } from 'react'
import signUpRequest from '../api/signUpRequest';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [userRole, setuserRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    signUpRequest(email, password)
      .then(() => {
        navigate('/todoapp');
      }).catch(err => {
        setError(err.message);
      });
  }

  return (
    <div className="flex items-center justify-between">
      <div style={{color: 'red'}}>{error}</div>
        <form onSubmit={handleSignUp}>
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
          <button>Sign Up</button>
        </form>
    </div>
  )
}