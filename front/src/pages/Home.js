import React from 'react'
import Header from '../components/header/Header'

import "../components/homeComponents/home.css";
import Carrousel from '../components/homeComponents/carrousel/Carrousel';
import Cabines from '../components/homeComponents/cabines/Cabines';
import Footer from '../components/footer/Footer'

function Home() {
  return (
    <>
      <div className='homePage'>
        <Header page="home" />
        <div className='text'>
          <p className='paragraph'>Más de 25 años cuidándote y asesorándote. Una gran familia que ha ido creciendo año tras año, siempre con la intención de crecer tanto profesional como personalmente, y con la misma ilusión del primer día.</p>
          <div className='titleHome'>
            <h2>Centre d'Estètica</h2>
            <h1>Fina García</h1>
          </div>
        </div>
      </div>
      <Carrousel />
      <Cabines />
      <Footer />
    </>
  )
}

export default Home