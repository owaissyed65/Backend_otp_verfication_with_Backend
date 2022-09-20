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
    const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
    const [forgotState, setForgotState] = useState({ email: '', newPassword: '' });
    // this is for otp onChange
    const handleOnChangeOtp = (e) => {
        setotp(e.target.value)
    }
    // this is for check password
    const changeVisibility = (e) => {
        if (changeVis === 'password') {
            setchangeVis('text')
        }
        else {
            setchangeVis('password')
        }
    }
    // this is for onchange email
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    // this is for submit create button
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
        if (response.status === 400 || response.status === 500) {
            window.alert('User Already Exist ')
        }
        else {
            localStorage.setItem('token', data.Authorization)
            window.alert('We are provided You a otp Code On Your Email Please Check It out')
            navigate('/otp')
        }
    }
    // this is for submit otp code to verify
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
    // this is for onChnage login 
    const handleChangeLogin = (e) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })
    }
    const handleClickLogin = async () => {
        const response = await fetch(`${host}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: loginCredentials.email, password: loginCredentials.password })
        })
        const data = await response.json();
        if (response.status === 400 || response.status === 500) {
            window.alert("Please Use Correct Password or email")
        }
        else {
            localStorage.setItem('token', data.Authorization)
            window.alert('Successfully Login');
            navigate('/')
        }
    }
    const handleOnChangeForgot = (e) => {
        setForgotState({ ...forgotState, [e.target.name]: e.target.value })
    }
    const handleClickForget = async () => {
        const res = await fetch(`${host}/auth/login/forgetpassword`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: forgotState.email })
        })
        await res.json();
        if (res.status === 201) {
            window.alert('We are Providing you an otp Code Please Verify By Yourself')
            navigate('/otp')
        }
        else {
            window.alert('Please Provide Valid Email')
        }
    }
    const handleonSubmitOtpforget = async () => {
        const res = await fetch(`${host}/auth/password/otp`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp: otp })
        })
        await res.json()
        if (res.status === 200) {
            window.alert('You are Verified Now You Can Change Password')
            navigate('/changepassword')
        }
        else {
            navigate('/login')
        }
    }
    const handleClickNewPassword = async () => {
        const res = await fetch(`${host}/auth/changepassword`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword: forgotState.newPassword })
        })
        await res.json()
        if (res.status === 201) {
            window.alert('successfully Change Password')
            navigate('/login')
        }
        else {
            window.alert('Sorry Some Mistake Occur In Filling With Fields')
        }
    }

    return (
        <context.Provider value={{ handleOnSubmit, handleOnChange, credentials, changeVis, handleOnChangeOtp, changeVisibility, otp, handleOnSubmitOtp, handleClickLogin, loginCredentials, handleChangeLogin, handleClickForget, handleOnChangeForgot, forgotState, handleonSubmitOtpforget, handleClickNewPassword }}>
            {props.children}
        </context.Provider>
    )
}

export default State
