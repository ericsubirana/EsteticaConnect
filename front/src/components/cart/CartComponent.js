import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.js'
import { getProducts } from '../../api/cart.js'
import { addProductToCart as apiAddProductToCart } from '../../api/cart.js'
import { RemoveProductToCart as apiRemoveProductToCart } from '../../api/cart.js'
import { ToastContainer, toast } from 'react-toastify';
import { hasProduct } from '../../api/cart.js';

import './cartcomponent.css'
import 'react-toastify/dist/ReactToastify.css';
import imgEmptyCart from '../../assets/empty-cart.png'

import { PiShoppingCart } from "react-icons/pi";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

function CartComponent() {

  const navigation = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const heightRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [subPrice, setSubPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [quantitatTotal, setQuantitatTotal] = useState(0);


  const goToProducts = () => {
    navigation('/productes');
  }

  useEffect(() => {
    const getCartproducts = async () => {
      const response = await getProducts(user);
      if (response.data === 'No products in Cart') {
        setProducts([]);
      } else {
        setProducts(response.data.userCartExists.products);
      }
    };
    getCartproducts();
  }, []);

  useEffect(() => {
    const getPrice = () => {
      if (products) {
        setTotalPrice(
          products.reduce((total, item) => {
            const itemPrice = parseFloat(item.product.price.replace('€', ''));
            return total + itemPrice * item.product.quantity;
          }, 0).toFixed(2)
        );
      }
    };
    getPrice();
  }, [products])

  useEffect(() => {
    const func = () => {
      if (heightRef.current) {
        const height = heightRef.current;
        height.style.overflowY = products.length > 3 ? 'auto' : 'hidden';
        height.style.maxHeight = '726px';
      }
    }
    func();
  }, [products]);

  useEffect(() => {
    const calculaQuantitatTotal = async () => {
      if(products){
        setQuantitatTotal(products.reduce((total, item) => {
          return total + item.product.quantity;
        }, 0).toFixed(0))
      }
    }
    calculaQuantitatTotal();
  }, [products])

  const addProductToCart = async (result) => {
    const response = await apiAddProductToCart(user, result);
    if (response.data = 'Product added successfully') {
      toast.success('Product added successfully');
      const response = await getProducts(user);
      if (response.data === 'No products in Cart') {
        setProducts([]);
      } else {
        setProducts(response.data.userCartExists.products);
      }
    }
    else {
      toast.error('An error ocurred while trying to add Product');
    }
  }

  const RemoveProductToCart = async (result) => {
    const response = await apiRemoveProductToCart(user, result);
    if (response.data = 'Product removed successfully') {
      toast.success('Product removed successfully');
      const response = await getProducts(user);
      if (response.data === 'No products in Cart') {
        setProducts([]);
      } else {
        setProducts(response.data.userCartExists.products);
      }
    }
    else {
      toast.error('An error ocurred while trying to remove Product');
    }
  }

  return (
    <div className='cartcomponent'>
      <div className='begin-cart-component'>
        <div className='my-cart'>
          <h2 className='titleCart'>Mi cesta</h2>
          {products.length === 0 && (
            <div className='cartWhiteBack'>
              <div className='empty-cart'>
                <img src={imgEmptyCart} alt="imgEmptyCart" height={180} width={180} />
                <p>Tu cesta de la compra está vacía</p>
                <button className="button-4" onClick={() => goToProducts()}>Continuar comprando</button>
              </div>
            </div>
          )}
          {products.length > 0 && (
            <div ref={heightRef} className='listCart'>
              {products.map((item, key) => (
                <div key={key} >
                  <div className='backgraundProduct'>
                    <div className='productInCart'>
                      <img className='imageCart' src={item.product.img} alt="product" height={160} width={160} />
                      <div className='infoProductCart'>
                        <h2>{item.product.title}</h2>
                        <div className='priceAndCart'>
                          <p>{item.product.price}</p>
                          <div className='addOrRemoveCart'>
                            <div className='plusminus'>
                              <CiSquareMinus size={30} onClick={async () => { await RemoveProductToCart(item.product)}} />
                              <p>{item.product.quantity}</p>
                              <CiSquarePlus size={30} onClick={async () => { await addProductToCart(item.product)}} />
                            </div>
                          </div>
                          <p>{parseFloat((item.product.price.replace('€', '')) * item.product.quantity).toFixed(2)}€</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
        <div className='resume'>
          <h2 className='title-resume'>Resumen del pedido</h2>
          <div className='resumeWhiteBack'>
            <div className='resume-cart'>
              <div className='subtotal'>
                <p>Subtotal</p>
                {products.length > 0 && (
                  <div className='subtotalArticles'>
                    <p className='spaceBetweeen'>({quantitatTotal} articulos)</p>
                    <p> {totalPrice}€ </p>
                  </div>
                )}
                {products.length === 0 && (
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
                {products.length > 0 && (
                  <div className='totalPriceTotal'>
                    <p> {totalPrice}€ </p>
                  </div>
                )}
                {products.length === 0 && (
                  <div className='nothingTotal'>
                    -
                  </div>
                )}
              </div>
              <div className='buttonSummary'>
                {products.length > 0 && (
                  <button className='button-5'>Comenzar pedido</button>
                )}
                {products.length === 0 && (
                  <button className='button-6'>Comenzar pedido</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  )
}

export default CartComponent