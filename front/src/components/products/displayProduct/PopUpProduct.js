import React, { useRef, useEffect, useState } from 'react';
import './popupproduct.css';
import { useAuth } from '../../../context/AuthContext.js'
import { addProductToCart as apiAddProductToCart } from '../../../api/cart.js'
import { RemoveProductToCart as apiRemoveProductToCart } from '../../../api/cart.js'

import { ToastContainer, toast } from 'react-toastify';
import { hasProduct } from '../../../api/cart.js';

import { PiShoppingCart } from "react-icons/pi";
import { IoClose } from 'react-icons/io5';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function PopUpProduct(props) { //fer que en cas de que l'usuari ja tingui el producte no surti afegir producte sino la quantitat que ja te al carret
  //L'ELEMNT CLAU PER FER EL QUE ESTA COMENTAT HA SIGUT LA VARIABLE TRIGGER
  const { isAuthenticated, user } = useAuth();
  const result = props.result;
  const descriptionRef = useRef(null);
  const [quantitat, setQuantitat] = useState(0);

  useEffect(() => {
    const func = () => {
      if (descriptionRef.current) {
        const description = descriptionRef.current;
        const hasOverflow = description.clientHeight > 220;
        if (hasOverflow) {
          description.style.height = '220px';
          description.style.overflowY = 'scroll';

        } else {
          description.style.overflowY = 'hidden';
        }
      }
    }

    func();
  });

  useEffect(() => {
    const hasAlreadyProduct = async () => {
      console.log(user)
      if(user){
        const response = await hasProduct(user, result);
        setQuantitat(response.data.quantity);
      }
    }

    if (props.trigger) {
      hasAlreadyProduct();
    }

  }, [props.trigger]);

  const updateQuantity = async () => {
    const response = await hasProduct(user, result);
    setQuantitat(response.data.quantity);
  }

  const addProductToCart = async () => {
    const response = await apiAddProductToCart(user, result);
    if (response.data = 'Product added successfully') {
      toast.success('Product added successfully');
    }
    else {
      toast.error('An error ocurred while trying to add Product');
    }
  }

  const RemoveProductToCart = async () => {
    const response = await apiRemoveProductToCart(user, result);
    if (response.data = 'Product removed successfully') {
      toast.success('Product removed successfully');
    }
    else {
      toast.error('An error ocurred while trying to remove Product');
    }
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
        {isAuthenticated && result.price && quantitat === 0 && (
          <button className='addCart' onClick={async () => { await addProductToCart(); await updateQuantity() }}>
            <p>Añadir al carrito</p>
            <PiShoppingCart size={30} />
          </button>
        )}
        {isAuthenticated && result.price && quantitat > 0 && (
          <div className='moveToCenter'>
            <div className='addOrRemove'>
              <div className='quantityArrows'>
                {quantitat}
                <div className='arrows'>
                  <IoIosArrowUp className='up' onClick={async () => { await addProductToCart(); await updateQuantity() }} />
                  <IoIosArrowDown onClick={async () => { await RemoveProductToCart(); await updateQuantity() }} />
                </div>
              </div>
              <PiShoppingCart size={30} className='shoppingCart' />
            </div>
          </div>
        )}
        <IoClose size={30} className='close-btn' onClick={props.setTrigger} />
      </div>
      <ToastContainer position="top-center" />
    </div>
  ) : null;
}

export default PopUpProduct;
