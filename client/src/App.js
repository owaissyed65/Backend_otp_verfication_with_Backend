// import React, { useContext } from 'react'
import React from 'react';
import Navbar from './Components/Navbar'
// import context from './context/context'
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Otp from './Components/Otp';
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
        <Route exact path="/otp" element={<Otp/>} />
      </Routes>
    </div>
  )
}

export default App
