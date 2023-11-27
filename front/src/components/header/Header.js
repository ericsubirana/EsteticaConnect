import React, { useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import Searchbar from './searchbar/Searchbar';
import LogInLogOut from './logInLogOut/LogInLogOut';
import { useAuth } from '../../context/AuthContext';

import "./header.css";
import img from '../../assets/f.png';

function Header(props) {

  const { user, logout } = useAuth();
  //<Sidebar user={user} />
  //<Searchbar />
  const page = props.page;
  return (
    <div className={page !== 'home' ? 'headerNoHome' : 'header'}>
      {console.log(page !== 'home')}
      <div className='name'>
        <img src={img} alt='logo' className='logo' />
        <p className='title'>CE FINA</p>
      </div>
      <LogInLogOut user={user} logout={logout} page={page} />
    </div>
  )
}

export default Header