import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi"
import { useAuth } from '../../../context/AuthContext';

import { LiaHomeSolid, LiaUserSolid, LiaShoppingCartSolid  } from "react-icons/lia";
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
              <li><Link className='Cabecera-li' to='/home'>Home</Link> < LiaHomeSolid className='lia' /> </li>
              <li><Link className='Cabecera-li' to='/productes'>Productes</Link> <PiPackageThin  size={20} className='lia' /></li>
              <li><Link className='Cabecera-li' to='/serveis'>Serveis</Link><TbMassage  size={20} className='lia' /></li>
              <li><Link className='Cabecera-li' to='/login'>LOG IN</Link> <IoLogOutOutline size={20} className='lia' /> </li>
              <li><Link className='Cabecera-li' to='/register'>SIGN UP</Link> <IoPersonAddOutline  size={20} className='lia' /> </li>

            </ul>

          )}

          {user && (
            <ul className='Cabecera-ul'>
              <li><Link className='Cabecera-li' to='/home'>Home</Link> <LiaHomeSolid size={20} className='lia' /> </li>
              <li><Link className='Cabecera-li' to='/productes'>Productes</Link> <PiPackageThin  size={20} className='lia' /></li>
              <li><Link className='Cabecera-li' to='/serveis'>Serveis</Link><TbMassage  size={20} className='lia' /> </li>
              <li><Link className='Cabecera-li' to='/perfil'>Perfil</Link> <LiaUserSolid size={20} className='lia' /> </li>
              <li><Link className='Cabecera-li' to='/cart'>Carret</Link> <LiaShoppingCartSolid  size={20} className='lia' /> </li>
              <li><Link className='logout' onClick={logoutPage} to={"/home"}>LOG OUT</Link> <IoLogOutOutline  size={20} className='lia' /></li>
            </ul>
          )}

        </nav>
      </div>
    </>
  )
}
export default Sidebar

