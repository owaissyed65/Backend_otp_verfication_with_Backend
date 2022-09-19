import React from 'react'

const Login = () => {
    return (
        <>
            <div className='container d-flex align-items-center justify-content-center' style={{ height: '500px', marginTop: "30px" }}>
                <div className="shadow p-3 mb-5 bg-body rounded p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end  " >
                    <div style={{ marginLeft: '80px', marginRight: '80px', marginBottom: '50px' }}>
                        <h1 className='my-3'>Login</h1>

                        <div className=" flex-column mb-3 ">
                            <input type="email" placeholder='Email' />
                        </div>
                        <div className="flex-column mb-3">
                            <input type="password" placeholder='Password' />
                        </div>
                        <button className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
