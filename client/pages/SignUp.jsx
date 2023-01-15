import React, { useState } from 'react'
import signUpRequest from '../api/signUpRequest';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  // useState to update and track the input fields from the signup page
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [userRole, setuserRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // handle form submission 
  const handleSignUp = (e) => {
    e.preventDefault();
    signUpRequest(email, password)
      .then(() => {
        // navigate to todoapp page if signup was successful
        navigate('/todoapp');
      }).catch(err => {
        setError(err.message);
      });
  }

  return (
    <div className = 'flex flex-column'>
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
          First Name: 
          <input
            type='text'
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
          Last Name: 
          <input
            type='text'
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
          User Role: 
          <input
            type='text'
            value={userRole}
            onChange={(e) => setuserRole(e.target.value)}
          />
          <button>Sign Up</button>
        </form>
    </div>
  )
}