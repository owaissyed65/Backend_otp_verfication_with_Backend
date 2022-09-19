import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [info, setInfo] = useState({ name: '', email: '', country: '' });
  const host = "http://localhost:5000";
  const navigate = useNavigate()
  useEffect(() => {
    fetch(`${host}/auth/getdata`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem('token')
      },

    }).then(res => {
      return res.json()
    }).then(data => {
      const { getdata } = data
      setInfo({ name: getdata.name, email: getdata.email, country: getdata.country })

    }).catch((err) => {
      console.log(err)
    })
  }, []);
  useEffect(() => {
    if (!localStorage.getItem('token') ) {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className='containers'>
      <div className='Homepage'>
        <p className='wel'>Welcome {info.name}</p>
        <h1 className='home'>We are the Mern Developer</h1>
        <span className='home' style={{ fontSize: '1.5rem' }}>Your Country: <h2 className='d-inline'>{info.country} </h2></span>
        <span className='home' style={{ fontSize: '1.5rem' }}>Your Country: <h2 className='d-inline mx-2'>{info.email} </h2></span>
      </div>
    </div>
  )
}

export default Home
