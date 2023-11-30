import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './cartcomponent.css'
import imgEmptyCart from '../../assets/empty-cart.png'

function CartComponent() {

  const navigation = useNavigate();

  const [products, setProducts] = useState(null);
  const [price, setPrice] = useState(null);
  const [totalPrice, settotalPrice] = useState(null);


  const goToProducts = () => {
    navigation('/productes');
  }

  return (
    <div className='cartcomponent'>
      <div className='begin-cart-component'>
        <div className='my-cart'>
          <h2 className='titleCart'>Mi cesta</h2>
          <div className='cartWhiteBack'>
            {!products && (
              <div className='empty-cart'>
                <img src={imgEmptyCart} alt="imgEmptyCart" height={180} width={180} />
                <p>Tu cesta de la compra está vacía</p>
                <button className="button-4" onClick={() => goToProducts()}>Continuar comprando</button>
              </div>
            )}
            {products && (
              <div>
              </div>
            )}
          </div>
        </div>
        <div className='resume'>
          <h2 className='title-resume'>Resumen del pedido</h2>
          <div className='resumeWhiteBack'>
            <div className='resume-cart'>
              <div className='subtotal'>
                <p>Subtotal</p>
                {products && (
                  <div>
                    <p>( {products.length} articulos )</p>
                    <p> {price} </p>
                  </div>
                )}
                {!products && (
                  <div className='nothing'>
                    -
                  </div>
                )}
              </div>
              <div className='sendingProducts'>
                <p className='send'>Envío</p>
                <p className='calculateSend'>Se calculará en el siguiente paso</p>
              </div>
              <div className='totalCart'>
                <p className='total'>Total</p>
                <p className='iva'>IVA incl.</p>
                {products && (
                  <div>
                    <p>( {products.length} articulos )</p>
                    <p> {totalPrice} </p>
                  </div>
                )}
                {!products && (
                  <div className='nothingTotal'>
                    -
                  </div>
                )}
              </div>
              <div className='buttonSummary'>
                {products && (
                    <button className='button-5'>Comenzar pedido</button>
                )}
                {!products && (
                    <button className='button-6'>Comenzar pedido</button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CartComponent