import { useState, useEffect } from "react"

function ProductToolBar (props) {

    const editProduct = () => {
        props.triggerPopUp('EDITAR', props)
    }
    
    const removeProduct = () => {
        props.triggerPopUp('BORRAR', props)
    }

    return(
        <div>
            <button onClick={editProduct}>?</button>
            <button onClick={removeProduct}>-</button>
        </div>
    )
}


export default ProductToolBar