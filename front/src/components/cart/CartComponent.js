import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './cartcomponent.css'
import imgEmptyCart from '../../assets/empty-cart.png'

function CartComponent() {

  const navigation = useNavigate();

  const [products, setProducts] = useState(null);
  const [price, setPrice] = useState(null);

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
                <p>Envío</p>
                <p>Se calculará en el siguiente paso</p>
              </div>
              <div className='totalCart'>
                <p>Total</p>
                <p>IVA incl.</p>
              </div>
              <button>Comenzar pedido</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CartComponent