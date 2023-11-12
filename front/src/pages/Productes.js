import React from 'react'

import Header from '../components/header/Header.js'
import RandomProducts from '../components/products/RandomProducts.js'
import Footer from '../components/footer/Footer.js'


function Productes() {
  return (
    <div>
      <Header page="products"/>
      <RandomProducts />
      <Footer />
    </div>
  )
}

export default Productes