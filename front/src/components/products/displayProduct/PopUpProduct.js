import React, { useRef, useEffect } from 'react';
import './popupproduct.css';
import { IoClose } from 'react-icons/io5';

function PopUpProduct(props) {
  const result = props.result;
  const descriptionRef = useRef(null);

  useEffect(() => {
    const func = () => {
      
      if (descriptionRef.current) {
        const description = descriptionRef.current;
        const hasOverflow = description.clientHeight > 250;
        console.log(hasOverflow, description.clientHeight)
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
        <IoClose size={30} className='close-btn' onClick={props.setTrigger} />
      </div>
    </div>
  ) : null;
}

export default PopUpProduct;
