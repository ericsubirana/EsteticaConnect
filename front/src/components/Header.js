import React from 'react'
import { Link } from 'react-router-dom';
import img from '../assets/f.png'

function Header() {
  return (
    <div>
        <img src={img} alt='logo'></img>
        <input placeholder='Search anything'></input>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
    </div>
  )
}

export default Header