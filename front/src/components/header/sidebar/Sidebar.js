import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {FiMenu} from "react-icons/fi"
import img from '../../../assets/f.png';

import './sidebar.css'

function Sidebar(props) {
    const [open, setOpen] = useState(false);

    const logged = props.logged;

    function clicked(){
      setOpen(!open);
    }
    
    return (
      <>
        <FiMenu scale={90} className='menu'  onClick={clicked}/>
        <div className={open? 'sidebarOpen' : 'sidebarClosed'}>
            <img className='logoSidebar' src={img}></img>
            <div className='routes'>
              <Link id='noDecoration' to='/home'>Home</Link>
              <Link id='noDecoration' to='/productes'>Productes</Link>
              <Link id='noDecoration' to='/serveis'>Serveis</Link>
              {!logged && (
                <Link id='noDecoration' to='/login'>Log In</Link>
              )}
              {logged && (
                <div className='routesIn'>
                  <Link id='noDecoration' to='/perfil'>Perfil</Link>
                  <Link id='noDecoration' to='/carret'>Carret</Link>
                </div>
              )}
              <Link id='noDecoration' to='/horaris'>Horaris</Link>
            </div>
            <div className='where'>
              <h1>GOOGLE MAPS</h1>
            </div>
        </div>
      </>
  )
}
export default Sidebar

