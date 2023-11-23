import React from 'react'

import './popupproduct.css'

function PopUpProduct(props) {
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <button className='close-btn' onClick={props.setTrigger}>CLOSE</button>
      </div>
    </div>
  ) : null;

}

export default PopUpProduct