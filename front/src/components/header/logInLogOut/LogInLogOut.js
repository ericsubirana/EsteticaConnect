import React from 'react'
import { Link } from 'react-router-dom';
import "./loginlogout.css"

function logInLogOut(props) {
    const { user, logout, page } = props;

    function logoutPage() {
        logout()
    }

    return (
        <div className='loginlogout'>
            {!user && (
                <>
                    <div className='leftside'>
                        <Link className={page === 'home' ? 'homeNow' : 'home'} to={"/home"}>Home</Link>
                        <Link className='productes' to={"/productes"}>Productes</Link>
                        <Link className='serveis' to={"/serveis"}>Serveis</Link>
                        <Link className='horaris' to={"/horaris"}>Horaris</Link>
                    </div>
                    <div className="line"></div>
                    <div className='rightside'>
                        <Link className='register' to={"/register"}>SIGN UP</Link>
                    </div>
                </>
            )}
            {user && (
                <>
                    <div className='leftside'>
                        <Link className={page === 'home' ? 'homeNow' : 'home'} to={"/home"}>Home</Link>
                        <Link className='productes' to={"/productes"}>Productes</Link>
                        <Link className='serveis' to={"/serveis"}>Serveis</Link>
                        <Link className='horaris' to={"/horaris"}>Horaris</Link>
                        <Link className='profile' to={"/profile"}>Perfil</Link>
                        <Link className='carret' to={"/carret"}>Carret</Link>
                    </div>
                    <div className="line"></div>
                    <div className='rightside'>
                        <Link className='logout' onClick={logoutPage} to={"/home"}>LOG OUT</Link>   
                    </div>
                </> //LOGOUT!!!!!!!!!

            )}
        </div>
    )
}

export default logInLogOut