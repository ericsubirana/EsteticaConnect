import { useState, useEffect } from "react"
import "./productToolBar.css"

function ProductToolBar (props) {

    const editProduct = () => {
        props.triggerPopUp('EDITAR', props)
    }
    
    const removeProduct = () => {
        props.triggerPopUp('BORRAR', props)
    }

    return(
        <div className="buttonsProductToolBar">
            <button className="buttonProductToolBar" onClick={editProduct}>EDITAR</button>
            <button className="buttonProductToolBar" onClick={removeProduct}>BORRAR</button>
        </div>
    )
}


export default ProductToolBar