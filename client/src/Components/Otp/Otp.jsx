import React from 'react'
import { useContext } from 'react';

import context from '../../context/context';

const Otp = () => {
    const Context = useContext(context);
    const { changeVis, handleOnChangeOtp, changeVisibility, otp, handleOnSubmitOtp, handleonSubmitOtpforget } = Context


    return (
        <div className='container'>
            <div className='container d-flex align-items-center justify-content-center' style={{ height: '500px', marginTop: "30px" }}>
                <div className="shadow p-3 mb-5 bg-body rounded p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end  " >
                    <div style={{ marginLeft: '80px', marginRight: '80px', marginBottom: '50px' }}>
                        <h1 className='my-3'>Enter Otp Code</h1>
                        <label htmlFor="otp" className='my-2'>
                            Enter OTP Code:
                            <input type={changeVis} className='d-block my-2' value={otp} onChange={handleOnChangeOtp} />
                        </label>
                        <div>
                            <input type='checkbox' className='my-2' id='myinput' onClick={changeVisibility} /> checkotp
                        </div>
                        {
                            localStorage.getItem('token') === null ? <button className="btn btn-primary" onClick={handleonSubmitOtpforget}> Submit</button> : <button className="btn btn-primary d-block my-2" onClick={handleOnSubmitOtp}>
                                Submit
                            </button>
                        }
                    </div>
                    <h6 className='text-danger'>Please Don't Share With Anyone</h6>
                </div>
            </div>
        </div>
    )
}

export default Otp
