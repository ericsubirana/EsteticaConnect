import React from 'react'
import Header from '../components/header/Header.js'
import Footer from '../components/footer/Footer.js'
import CartComponent from '../components/cart/CartComponent.js'

function Cart() {
  return (
    <div>
      <Header page='cart'/>
      <CartComponent />
      <Footer />
    </div>
  )
}

export default Cart