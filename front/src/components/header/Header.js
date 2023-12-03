import React, { useState } from 'react'
import Sidebar from './sidebar/Sidebar'
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
      <div className='name'>
        <img src={img} alt='logo' className='logo' />
        <p className='title'>CE FINA</p>
      </div>
      <div className='loglnlogOutShow'>
        <LogInLogOut user={user} logout={logout} page={page} />
      </div>
      <div className='sidebarShow'>
        <Sidebar/>
      </div>
    </div>
  )
}

export default Header