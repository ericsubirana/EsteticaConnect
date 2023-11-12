import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import './randomproducts.css'
import axios from 'axios';

function RandomProducts() {

  const [clickCol, setClickCol] = useState(false);
  const [clickCat, setClickCat] = useState(false);
  const [iconCol, setIconCol] = useState(<IoIosArrowDown />);
  const [iconCat, setIconCat] = useState(<IoIosArrowDown />);

  const [randomProductes, setRandomProductes] = useState('');

  const clicked = (m) => {
    if(m === "col"){
      if(!clickCol){
        setIconCol(<IoIosArrowUp />);
        setClickCol(true);
      }
      else{
        setIconCol(<IoIosArrowDown />);
        setClickCol(false);
      }
    }
    else{
      if(!clickCat){
        setIconCat(<IoIosArrowUp />);
        setClickCat(true);
      }
      else{
        setIconCat(<IoIosArrowDown />);
        setClickCat(false);
      }
    }
  }

  useEffect(() =>{
    const takeRandomProducts = async () => {
      //const productes = axios.get('/productesRandom');
      const productes = 'm';
      if(productes){
        setRandomProductes(productes)
      }
    }
    takeRandomProducts();
  }, [])


  return (
    <div>
      <div className='titleProducts'>
        <div className='titleProductsText'>
          <h1>PRODUCTES</h1>
          <div className='lineProducts'></div>
          <h3>Coneix els productes que oferim</h3>
        </div>
      </div>
      <div className='prodcutsC'>
        <div className='coAndca'>
          <h2 onClick={() => clicked("col")}>COL.LECCIONS {iconCol} </h2>
          <h2 onClick={() => clicked("cat")}>CATEGORIES {iconCat} </h2>
        </div>
        <div className='inputHalf'>
          <input type="text" placeholder='BUSCAR PRODUCTE' className='inputC' />
        </div>
      </div>
    </div>
  )
}

export default RandomProducts
