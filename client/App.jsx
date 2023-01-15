import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Login } from './pages/Login.jsx';
import { SignUp } from './pages/SignUp.jsx';
import { TodoApp } from './pages/TodoApp.jsx';

const App = () => {
  const flexBetween = "flex items-center justify-between";
  return (
    <div>
      <div className={`${flexBetween}`}>
        <div className={`${flexBetween}`}>
          <Link to="/">
            Home
          </Link>
          <Link to="/todoapp">
            Dashboard
          </Link>
        </div>
        <div className={`${flexBetween}`}>
          <Link to="/login">
            Login
          </Link>
          <Link to="/signup">
            Signup
          </Link>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todoapp' element={<TodoApp/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </div>
  )
}

export default App;
