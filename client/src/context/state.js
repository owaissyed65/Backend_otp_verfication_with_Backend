import React from 'react'
import context from './context'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const State = (props) => {
    const host = "http://localhost:5000"
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ name: '', email: "", password: '', country: '' });
    const [changeVis, setchangeVis] = useState('password');
    const [otp, setotp] = useState('');

    const handleOnChangeOtp = (e) => {
        setotp(e.target.value)
    }

    const changeVisibility = (e) => {
        if (changeVis === 'password') {
            setchangeVis('text')
        }
        else {
            setchangeVis('password')
        }
    }

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password, country } = credentials
        let response = await fetch(`${host}/auth/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name, email: email, password: password, country: country })
        });
        let data = await response.json()
        localStorage.removeItem('token')
        if (response.status === 400 || response.status === 500) {
            window.alert('User Already Exist ')
        }
        else {
            localStorage.setItem('token', data.Authorization)
            window.alert('We are provided You a otp Code On Your Email Please Check It out')
            navigate('/otp')
        }
    }
    const handleOnSubmitOtp = async () => {
        const response = await fetch(`${host}/auth/verify`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ otp: otp })
        })
        await response.json()
        if (response.status === 200) {
            navigate('/')
        }
    }
    
    
    return (
        <context.Provider value={{ handleOnSubmit, handleOnChange, credentials, changeVis, handleOnChangeOtp, changeVisibility, otp, handleOnSubmitOtp }}>
            {props.children}
        </context.Provider>
    )
}

export default State
