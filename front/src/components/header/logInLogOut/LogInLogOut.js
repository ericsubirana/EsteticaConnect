import React from 'react';
import { Link } from 'react-router-dom';
import "./loginlogout.css"

function LogInLogOut(props) {

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
                        <Link className={page === 'products' ? 'productesNow' : 'productes'} to={"/productes"}>Productes</Link>
                        <Link className={page === 'services' ? 'servicesNow' : 'services'} to={"/serveis"}>Serveis</Link>
                    </div>
                    <div className="line"></div>
                    <div className='rightside'>
                        <Link className='loginbutton' to={"/login"}>LOG IN</Link>
                        <Link className='registerbutton' to={"/register"}>SIGN UP</Link>
                    </div>
                </>
            )}
            {user && (
                <>
                    <div className='leftsideLoggedIn'>
                        <Link className={page === 'home' ? 'homeNow' : 'home'} to={"/home"}>Home</Link>
                        <Link className={page === 'products' ? 'productesNow' : 'productes'} to={"/productes"}>Productes</Link>
                        <Link className={page === 'services' ? 'servicesNow' : 'services'} to={"/serveis"}>Serveis</Link>
                        <Link className={page === 'profile' ? 'profileNow' : 'profile'} to={"/profile"}>Perfil</Link>
                        <Link className={page === 'cart' ? 'carretNow' : 'carret'} to={"/cart"}>Carret</Link>
                        {user.admin && (
                            <Link className={page === 'calendar' ? 'calendarNow' : 'calendar'} to={"/calendar"}>Calendario</Link>
                        )}
                    </div>
                    <div className="lineLoggedIn"></div>
                    <div className='rightside'>
                        <Link className='logout' onClick={logoutPage} to={"/home"}>LOG OUT</Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default LogInLogOut