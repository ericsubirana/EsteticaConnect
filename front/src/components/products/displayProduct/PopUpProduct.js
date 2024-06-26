import React, { useRef, useEffect, useState } from 'react';
import './popupproduct.css';
import { useAuth } from '../../../context/AuthContext.js'
import { addProductToCart as apiAddProductToCart } from '../../../api/cart.js'
import { RemoveProductToCart as apiRemoveProductToCart } from '../../../api/cart.js'
import { editProduct as apiEditProduct } from '../../../api/products.js'; 
import { deleteProduct as apiDeleteProduct } from '../../../api/products.js';
import MultiplesImages from '../../saveImages/MultiplesImages.js';

import { ToastContainer, toast } from 'react-toastify';
import { hasProduct } from '../../../api/cart.js';

import { PiShoppingCart } from "react-icons/pi";
import { IoClose } from 'react-icons/io5';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import imgCasmara from '../../../assets/casmara.jpg'

function PopUpProduct(props) { //fer que en cas de que l'usuari ja tingui el producte no surti afegir producte sino la quantitat que ja te al carret
  //L'ELEMNT CLAU PER FER EL QUE ESTA COMENTAT HA SIGUT LA VARIABLE TRIGGER
  const { isAuthenticated, user } = useAuth();
  const result = props.result;
  const descriptionRef = useRef(null);
  const [quantitat, setQuantitat] = useState(0);
  const menuRef = useRef(null);
  const [operationResult, setOperationResult] = useState(null);
  //CAS EDIT 
  const [title, setTitle] = useState(result.title);
  const [description, setDescription] = useState(result.description);
  const [price, setPrice] = useState(result.price? result.price : '');
  const [image, setImage] = useState(result['img-src']);
  const [category, setCategory] = useState(result.category ?? '');
  const [collection, setCollection] = useState(result.collection ?? '');
  const [isHovered, setIsHovered] = useState(false);

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
    setOperationResult(props.operationResult)
  }, [props.trigger])

  useEffect(() => {
    const hasAlreadyProduct = async () => {
      if (user) {
        const response = await hasProduct(user, result);
        setQuantitat(response.data.quantity);
      }
    }

    if (props.trigger) {
      hasAlreadyProduct();
    }

  }, [props.trigger]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        props.setTrigger();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const updateQuantity = async () => {
    const response = await hasProduct(user, result);
    setQuantitat(response.data.quantity);
  }

  const addProductToCart = async () => {
    const response = await apiAddProductToCart(user, result);
    if (response.data = 'Product added successfully') {
      toast.success('Product added successfully', { autoClose: 1500, closeOnClick: true });
      toast.clearWaitingQueue();
    }
    else {
      toast.error('An error ocurred while trying to add Product', { autoClose: 1500, closeOnClick: true });
      toast.clearWaitingQueue();
    }
  }

  const RemoveProductToCart = async () => {
    const response = await apiRemoveProductToCart(user, result);
    if (response.data = 'Product removed successfully', { autoClose: 1500, closeOnClick: true }) {
      toast.success('Product removed successfully', { autoClose: 1500, closeOnClick: true });
      toast.clearWaitingQueue();
    }
    else {
      toast.error('An error ocurred while trying to remove Product');
      toast.clearWaitingQueue();
    }
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  
  const editProduct = async () => {
    //console.log(title, description, price, image)
    const id = result._id;
    const product = {productId: id, productTitle: title, productDescription: description, productPrice: price, productImage: image, productCategory: category, productCollecion: collection}
    const response = await apiEditProduct(product);
    if (response.data = 'Product edited successfully', { autoClose: 1500, closeOnClick: true }) {
      toast.success('Product edited successfully', { autoClose: 1500, closeOnClick: true });
      toast.clearWaitingQueue();
    }
    else {
      toast.error('An error ocurred while trying to edit Product');
      toast.clearWaitingQueue();
    }
    props.setTrigger()
  }
 
  const borrarProducte = async () => {
    const response = await apiDeleteProduct(result._id);
    if (response.data = 'Product removed successfully', { autoClose: 1500, closeOnClick: true }) {
      toast.success('Product removed successfully', { autoClose: 1500, closeOnClick: true });
      toast.clearWaitingQueue();
    }
    else {
      toast.error('An error ocurred while trying to edit Product');
      toast.clearWaitingQueue();
    }
  }
  
  const changeImage = (file) => {
    setImage(file);
    result['img-src'] = file;
  }

  return props.trigger ? (
    <div className='popup'>
      {operationResult == 'EDITAR' ? (
        <div>
          <div className='popup-inner' ref={menuRef}>
            <div className='product-image-info-row'>
              <div className='product-info'>
                <textarea onChange={handleTitleChange} className='textAreaTitle' style={{ marginBottom: '15px' }} value={title}></textarea >
                <div className='product-description'>
                  <div ref={descriptionRef} className='scroll-product'>
                    <textarea className='textAreaDesc' onChange={handleDescriptionChange} value={description.replace(/\n/g, '<br>')}></textarea>
                  </div>
                  <h4>Precio: <input onChange={handlePriceChange} value={price}></input></h4>
                </div>
              </div>
              <div style={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
              {isHovered && (
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{height: '300px',
                      width: '300px', cursor:'pointer', top:'0', position: 'absolute', zIndex: 20, background: 'rgba(128, 128, 128, 0.3)' }}
                >
                    <MultiplesImages changeImage={changeImage} />
                </div>
            )}
                <img className='hoverImg' style={{ marginTop: '-30px' }} src={result['img-src']} alt='' height={300} width={300}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)} />
              </div>
            </div>
            <IoClose size={30} className='close-btn' onClick={props.setTrigger} />
            <button onClick={editProduct} className='addCart' style={{ paddingTop: '15px', paddingBottom: '15px' }}>{operationResult}</button>
          </div>
        </div>
      ) : (
        <div>
          <div className='popup-inner' ref={menuRef}>
            <img src={imgCasmara} className={isAuthenticated ? 'imgCasmaraWhenLooged' : 'imgCasamara'} height={80} width={80} />
            <div className='product-image-info-row'>
              <div className='product-info'>
                <div><h1>{result.title}</h1></div>
                <div className='product-description'>
                  <div ref={descriptionRef} className='scroll-product'>
                    <p dangerouslySetInnerHTML={{ __html: result.description.replace(/\n/g, '<br>') }}></p>
                  </div>
                  {result.price && <h4>Precio: {result.price}</h4>}
                </div>
              </div>
              <div style={{ alignContent: 'center' }}>
                <img src={result['img-src']} alt='' height={300} width={300} />
              </div>
            </div>
            {operationResult == 'BORRAR' ? (
              <div>
                <button className='addCart' onClick={borrarProducte}>
                  <p>BORRAR</p>
                </button>
              </div>
            ) : (
              <div>
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
              </div>
            )}
            <IoClose size={30} className='close-btn' onClick={props.setTrigger} />
          </div>
          <ToastContainer position="top-center" limit={1} />
        </div>
      )
      }
    </div >
  ) : null;
}

export default PopUpProduct;

