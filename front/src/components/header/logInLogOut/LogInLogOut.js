import React from 'react'
import { Link } from 'react-router-dom';
import "./loginlogout.css"
import { logoutReq } from '../../../api/auth';
import { useAuth } from '../../../context/AuthContext';

function logInLogOut(props) {
    const {user, logout} = props;

    function logoutPage() {
        logout()
    }

    return (
        <div className='loginlogout'>
            {!user && (
                <div>
                    <Link className='login' to={"/login"}>LOGIN</Link>
                    <Link className='register' to={"/register"}>SIGN UP</Link>
                </div>
            )}
            {user && (
                <div>
                    <Link className='profile' to={"/profile"}>PROFILE</Link>
                    <Link className='logout' onClick={logoutPage} to={"/home"}>LOGOUT</Link>
                </div>
            )}
        </div>
    )
}

export default logInLogOut