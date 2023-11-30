import React, { useRef, useEffect } from 'react';
import './popupproduct.css';
import { useAuth } from '../../../context/AuthContext.js'
import {addProductToCart as apiAddProductToCart } from '../../../api/products.js'

import { PiShoppingCart } from "react-icons/pi";
import { IoClose } from 'react-icons/io5';

function PopUpProduct(props) {

  const { isAuthenticated, user } = useAuth();
  const result = props.result;
  const descriptionRef = useRef(null);

  useEffect(() => {
    const func = () => {

      if (descriptionRef.current) {
        const description = descriptionRef.current;
        const hasOverflow = description.clientHeight > 250;
        if (hasOverflow) {
          description.style.height = '250px';
          description.style.overflowY = 'scroll';

        } else {
          description.style.overflowY = 'hidden';
        }
      }
    }
    func();
  });

  const addProductToCart = async () => {
    const response = await apiAddProductToCart(user, result);
    console.log(response)
  }

  return props.trigger ? (
    <div className='popup'>
      <div className='popup-inner'>
        <h1>{result.title}</h1>
        <div className='product-info'>
          <div className='product-description'>
            <div ref={descriptionRef} className='scroll-product'>
              <p dangerouslySetInnerHTML={{ __html: result.description.replace(/\n/g, '<br>') }}></p>
            </div>
            {result.price && <h4>Precio: {result.price}</h4>}
          </div>
          <img src={result['img-src']} alt='' height={300} width={300} />
        </div>
        {isAuthenticated && result.price &&(
          <button className='addCart' onClick={() => addProductToCart(result)}>
              <p>Añadir al carrito</p>
              <PiShoppingCart size={30}/>
          </button>
        )}
        <IoClose size={30} className='close-btn' onClick={props.setTrigger} />
      </div>
    </div>
  ) : null;
}

export default PopUpProduct;
