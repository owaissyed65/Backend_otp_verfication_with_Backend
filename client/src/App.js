// import React, { useContext } from 'react'
import React from 'react';
import Navbar from './Components/Navbar'
// import context from './context/context'
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import Login from './Components/Credentials/Login';
import Signup from './Components/Credentials/Signup';
import Otp from './Components/Otp/Otp';
import Forget from './Components/ForgotPassword/forgotPassword';
import ChangePassword from './Components/ForgotPassword/ChangePassword';

const App = () => {
  // const Context = useContext(context)
  // const { hello } = Context

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/otp" element={<Otp />} />
        <Route exact path="/login/forget" element={<Forget />} />
        <Route exact path="/changepassword" element={<ChangePassword />} />
      </Routes>
    </div>
  )
}

export default App
