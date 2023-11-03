import React from 'react'
import Header from '../components/header/Header'

import "./home.css";

function Home() {
  return (
    <div className='homePage'>
        <Header page="home" />
        <div className='text'>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit sociis quis auctor tempus, in lobortis sollicitudin  primis accumsan.</p>
          <h2>Centre d'Estètica</h2>
          <h1>Fina García</h1>
        </div>
    </div>
  )
}

export default Home