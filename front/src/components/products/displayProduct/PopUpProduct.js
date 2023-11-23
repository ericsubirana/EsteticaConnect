import React from 'react'

import './displayProduct.css'

function PopUpProduct(props) {
  console.log('PopUpProduct is rendering');
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <button className='close-btn' onClick={() => props.setTrigger()}>CLOSE</button>
        {console.log(props.trigger)}
        {console.log(props.setTrigger)}
      </div>
    </div>
  ) : null;
   
}

export default PopUpProduct