import React from 'react'
import Header from '../components/header/Header'

import "./home.css";
import Carrousel from '../components/carrousel/Carrousel';

function Home() {
  return (
    <>
      <div className='homePage'>
        <Header page="home" />
        <div className='text'>
          <p className='paragraph'>Lorem ipsum dolor sit amet consectetur adipiscing, elit sociis quis auctor tempus, in lobortis sollicitudin  primis accumsan.</p>
          <div className='titleHome'>
            <h2>Centre d'Estètica</h2>
            <h1>Fina García</h1>
          </div>
        </div>
      </div>
      <Carrousel />
    </>
  )
}

export default Home