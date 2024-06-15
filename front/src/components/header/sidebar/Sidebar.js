import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi"
import { useAuth } from '../../../context/AuthContext';

import { LiaHomeSolid, LiaUserSolid, LiaShoppingCartSolid  } from "react-icons/lia";
import { CiCalendar } from "react-icons/ci";
import { PiPackageThin } from "react-icons/pi";
import { TbMassage } from "react-icons/tb";
import { IoLogOutOutline, IoPersonAddOutline  } from "react-icons/io5";
import './sidebar.css'

function Sidebar(props) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const backgraundRef = useRef(null);
  const whereWeComeFrom = props.page;

  function clicked() {
    setOpen(!open);
  }

  function logoutPage() {
    logout()
  }

  useEffect(()=>{
    if(whereWeComeFrom != "home"){
      const background = backgraundRef.current;
      background.style.backgroundColor = '#ffffffea';
    }
  }, [])

  return (
    <>
      <FiMenu scale={90} className='menu' onClick={clicked} />
      <div className='sidebarright'>
        <nav ref={backgraundRef} className={`Cabecera-nav ${open ? 'isActive' : ''}`}>
          {!user && (
            <ul className='Cabecera-ul'>
              <Link className='Cabecera-li' to='/home'> <li>Home < LiaHomeSolid className='lia' /> </li> </Link>
              <Link className='Cabecera-li' to='/productes'> <li>Productos <PiPackageThin  size={20} className='lia' /></li></Link>
              <Link className='Cabecera-li' to='/serveis'> <li>Servicios<TbMassage  size={20} className='lia' /></li></Link>
              <Link className='Cabecera-li' to='/login'> <li>LOG IN<IoLogOutOutline size={20} className='lia' /> </li></Link>
              <Link className='Cabecera-li' to='/register'> <li>SIGN UP <IoPersonAddOutline  size={20} className='lia' /> </li></Link>

            </ul>

          )}

          {user && (
            <ul className='Cabecera-ul'>
              <Link className='Cabecera-li' to='/home'> <li>Home <LiaHomeSolid size={20} className='lia' /> </li></Link>
              <Link className='Cabecera-li' to='/productes'>  <li> Productos<PiPackageThin  size={20} className='lia' /></li></Link>
              <Link className='Cabecera-li' to='/serveis'> <li>Servicios<TbMassage  size={20} className='lia' /> </li></Link>
              <Link className='Cabecera-li' to='/profile'> <li>Perfil <LiaUserSolid size={20} className='lia' /> </li></Link>
              <Link className='Cabecera-li' to='/cart'> <li>Carrete<LiaShoppingCartSolid  size={20} className='lia' /> </li></Link>
              {user.admin && (
                <Link className='Cabecera-li' to='/calendar'><li>Calendario <CiCalendar  size={20} className='lia' /> </li></Link>
              )}
              <Link className='logout' onClick={logoutPage} to={"/home"}><li>LOG OUT <IoLogOutOutline  size={20} className='lia' /></li></Link>
            </ul>
          )}

        </nav>
      </div>
    </>
  )
}
export default Sidebar