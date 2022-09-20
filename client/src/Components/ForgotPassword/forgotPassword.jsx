import React from 'react'
import { useContext } from 'react'
import context from '../../context/context';

const Forget = () => {
    const Context = useContext(context);
    const { handleClickForget, forgotState, handleOnChangeForgot } = Context;

    return (
        <>
            <div className='container d-flex align-items-center justify-content-center' style={{ height: '500px', marginTop: "30px" }}>
                <div className="shadow p-3 mb-5 bg-body rounded p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end  " >
                    <div style={{ marginLeft: '80px', marginRight: '80px', marginBottom: '50px' }}>
                        <h1 className='my-3'>Forget Password</h1>
                        <div className=" flex-column mb-3 ">
                            <input type="email" placeholder='Email' name='email' value={forgotState.email} onChange={handleOnChangeForgot} />
                        </div>
                        <button className="btn btn-primary" onClick={handleClickForget}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forget
