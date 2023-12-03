import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi"
import { useAuth } from '../../../context/AuthContext';

import { LiaHomeSolid } from "react-icons/lia";
import './sidebar.css'

function Sidebar(props) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  function clicked() {
    setOpen(!open);
  }

  function logoutPage() {
    logout()
  }

  return (
    <>
      <FiMenu scale={90} className='menu' onClick={clicked} />
      <div className='sidebarright'>
        <nav className={`Cabecera-nav ${open ? 'isActive' : ''}`}>
          {!user && (
            <ul className='Cabecera-ul'>
              <li><Link className='Cabecera-li' to='/home'>Home</Link> <LiaHomeSolid /> </li>
              <li><Link className='Cabecera-li' to='/productes'>Productes</Link> <LiaHomeSolid size={20} className='lia' /></li>
              <li><Link className='Cabecera-li' to='/serveis'>Serveis</Link><LiaHomeSolid size={20} className='lia' /></li>
              <li><Link className='Cabecera-li' to='/login'>LOG IN</Link> <LiaHomeSolid size={20} className='lia' /> </li>
              <li><Link className='Cabecera-li' to='/register'>SIGN UP</Link> <LiaHomeSolid size={20} className='lia' /> </li>

            </ul>

          )}

          {user && (
            <ul className='Cabecera-ul'>
              <li><Link className='Cabecera-li' to='/home'>Home</Link> <LiaHomeSolid size={20} className='lia' /> </li>
              <li><Link className='Cabecera-li' to='/productes'>Productes</Link> <LiaHomeSolid size={20} className='lia' /></li>
              <li><Link className='Cabecera-li' to='/serveis'>Serveis</Link><LiaHomeSolid size={20} className='lia' /> </li>
              <li><Link className='Cabecera-li' to='/perfil'>Perfil</Link> <LiaHomeSolid size={20} className='lia' /> </li>
              <li><Link className='Cabecera-li' to='/cart'>Carret</Link> <LiaHomeSolid size={20} className='lia' /> </li>
              <li><Link className='logout' onClick={logoutPage} to={"/home"}>LOG OUT</Link></li>
            </ul>
          )}

        </nav>
      </div>
    </>
  )
}
export default Sidebar

