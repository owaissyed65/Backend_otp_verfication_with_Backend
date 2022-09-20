import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import context from '../../context/context';
const Signup = () => {
    const Context = useContext(context);
    const { handleOnChange, handleOnSubmit, credentials, changeVisibility, changeVis } = Context
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.alert('Please Logout to Return in signup ')
            navigate('/')
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div className='container d-flex align-items-center justify-content-center' style={{ height: '500px', marginTop: "30px" }}>
            <div className="shadow p-3 mb-5 bg-body rounded p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end  " >
                <div style={{ marginLeft: '80px', marginRight: '80px', marginBottom: '50px' }} >
                    <h1 className='my-3'>Create An Account</h1>
                    <div className=" flex-column mb-3 w-100 " >
                        <input type="text" placeholder='Name' name='name' onChange={handleOnChange} value={credentials.name} required />
                    </div>
                    <div className=" flex-column mb-3 ">
                        <input type="email" placeholder='Email' name='email' onChange={handleOnChange} value={credentials.email} required />
                    </div>
                    <div className="flex-column mb-3">
                        <input type={changeVis} placeholder='Password' name='password' onChange={handleOnChange} value={credentials.password} required />
                    </div>
                    <div>
                        <input type='checkbox' className='' id='myinput' onClick={changeVisibility} /> Check Password
                    </div>
                    <div className="flex-column mb-3 my-2">
                        <input type="text" placeholder='Country' name='country' onChange={handleOnChange} value={credentials.country} required />
                    </div>
                    <form onSubmit={handleOnSubmit}>
                        <button className="btn btn-primary" >
                            Signup
                        </button>
                    </form>

                </div>
                <Link to='/login'>Already Have An Account?</Link>
            </div>
        </div>
    )
}

export default Signup
