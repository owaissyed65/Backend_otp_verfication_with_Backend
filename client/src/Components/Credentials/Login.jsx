import React, { useContext } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import context from '../../context/context';

const Login = () => {
    const Context = useContext(context);
    const { handleClickLogin, loginCredentials, handleChangeLogin, changeVisibility, changeVis } = Context
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.alert('Please Logout to Return in Login')
            navigate('/')
        }
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <div className='container d-flex align-items-center justify-content-center' style={{ height: '500px', marginTop: "30px" }}>
                <div className="shadow p-3 mb-5 bg-body rounded p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end  " >
                    <div style={{ marginLeft: '80px', marginRight: '80px', marginBottom: '50px' }}>
                        <h1 className='my-3'>Login</h1>

                        <div className=" flex-column mb-3 ">
                            <input type="email" placeholder='Email' value={loginCredentials.name} onChange={handleChangeLogin} name='email' />
                        </div>
                        <div className="flex-column mb-3">
                            <input type={changeVis} placeholder='Password' value={loginCredentials.password} onChange={handleChangeLogin} name='password' />
                        </div>
                        <div>
                            <input type='checkbox' className='' id='myinput' onClick={changeVisibility} /> Check Password
                        </div>
                        <div>
                            <Link to='/signup'>Not Have Account?</Link>
                        </div>
                        <button className="btn btn-primary" onClick={handleClickLogin}>
                            Login
                        </button>
                    </div>
                    <Link to='forget'>Forget Password?</Link>
                </div>
            </div>
        </>
    )
}

export default Login
