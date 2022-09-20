import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Email Verification</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/'>{'Home'.toUpperCase()}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/login'>{'Login'.toUpperCase()}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/signup'>{'Signup'.toUpperCase()}</Link>
                            </li>
                            <li className="nav-item">
                                {
                                    localStorage.getItem('token') === null ? '' : <button className='btn btn-primary' onClick={logout}>{'Logout'.toUpperCase()}</button>
                                }
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
