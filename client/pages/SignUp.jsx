import React, { useState } from 'react';
import signUpRequest from '../api/signUpRequest';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

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
  const handleSignUp = async (e) => {
    e.preventDefault();
    // signUpRequest(email, password, firstName, lastName, userRole)
    //   .then(() => {
    //     navigate('/dashboard');
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //   });
    try {
      const response = await axios.post('/api/users', { firstName, lastName, password, userRole, email })
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center'>
      {/* display error message if error */}
      <div>{error}</div> 
      {/* useState to track the data in each input field */}
        <form className='flex flex-col justify-items-center items-center' onSubmit={handleSignUp}>
          <input
            type='email'
            placeholder='Email:'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password:'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='text'
            placeholder='First Name:'
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          /> 
          <input
            type='text'
            placeholder='Last Name:'
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
          <input
            type='text'
            placeholder='User Role:'
            value={userRole}
            onChange={(e) => setuserRole(e.target.value)}
          />
          <button>Sign Up</button>
        </form>
        <div>
          Have an account already? <br />
          <Link to="/login" className='text-tertiary-500 underline'>
            Login right here!
          </Link>
        </div>
    </div>
  );
};
