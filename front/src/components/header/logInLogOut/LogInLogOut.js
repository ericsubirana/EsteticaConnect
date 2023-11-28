import React from 'react'
import { Link } from 'react-router-dom';
import "./loginlogout.css"

function logInLogOut(props) {
    const { user, logout, page } = props;

    function logoutPage() {
        logout()
    }

    return (
        
        <div className = 'loginlogout'>
            {console.log(page)}
            {!user && (
                <>
                    <div className='leftside'>
                        <Link className={page === 'home' ? 'homeNow' : 'home'} to={"/home"}>Home</Link>
                        <Link className={page === 'products' ? 'productesNow' : 'productes'} to={"/productes"}>Productes</Link>
                        <Link className='serveis' to={"/serveis"}>Serveis</Link>
                    </div>
                    <div className="line"></div>
                    <div className='rightside'>
                        <Link className='registerbutton' to={"/register"}>SIGN UP</Link>
                    </div>
                </>
            )}
            {user && (
                <>
                    <div className='leftside'>
                        <Link className={page === 'home' ? 'homeNow' : 'home'} to={"/home"}>Home</Link>
                        <Link className={page === 'products' ? 'productesNow' : 'productes'} to={"/productes"}>Productes</Link>
                        <Link className='serveis' to={"/serveis"}>Serveis</Link>
                        <Link className='profile' to={"/profile"}>Perfil</Link>
                        <Link className={page === 'cart' ? 'carretNow' : 'carret'} to={"/cart"}>Carret</Link>
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