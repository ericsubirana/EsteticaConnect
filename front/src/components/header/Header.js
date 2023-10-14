import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Searchbar from './searchbar/Searchbar';
import LogInLogOut from './logInLogOut/LogInLogOut';
import { useAuth } from '../../context/AuthContext';

import "./header.css";

function Header() {

  const {user, logout} = useAuth();

  return (
    <div className='header'>
        <Sidebar user={user} />
        <Searchbar />
        <LogInLogOut user={user} logout={logout}/>
    </div>
  )
}

export default Header