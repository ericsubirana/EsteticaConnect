import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import {motion} from 'framer-motion'

import './randomproducts.css'
import axios from 'axios';

function RandomProducts() {

  const [clickCol, setClickCol] = useState(false);
  const [clickCat, setClickCat] = useState(false);
  const [iconCol, setIconCol] = useState(<IoIosArrowDown />);
  const [iconCat, setIconCat] = useState(<IoIosArrowDown />);

  const [randomProductes, setRandomProductes] = useState('');

  const clicked = (m) => {
    if (m === "col") {
      if (!clickCol) {
        setIconCol(<IoIosArrowUp />);
        setClickCol(true);
      }
      else {
        setIconCol(<IoIosArrowDown />);
        setClickCol(false);
      }
    }
    else {
      if (!clickCat) {
        setIconCat(<IoIosArrowUp />);
        setClickCat(true);
      }
      else {
        setIconCat(<IoIosArrowDown />);
        setClickCat(false);
      }
    }
  }

  useEffect(() => {
    const takeRandomProducts = async () => {
      const response = await axios.get('/api/randomProducts');
      const products = response.data;
      if (products) {
        setRandomProductes(products)
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
      <div className='productMid'>
        <div className='prodcutsC'>
          <div className='coAndca'>
            <div className='colections'>
              <h2 onClick={() => clicked("col")}>COL.LECCIONS {iconCol} </h2>
              {clickCol && (
                <div className='colectionsOpened'>
                  Shine Stop
                  Antioxidant
                  Pure Oxygen
                  Sensations
                  Q10 RESCUE
                  Hydra Lifting
                  RGnerin
                  INFINITY
                  Urban Protect
                  Age Defense
                  Lightening
                  Sheet Mask Collection
                  Mask Kits Collection
                </div>
              )}
            </div>
            <h2 onClick={() => clicked("cat")}>CATEGORIES {iconCat} </h2>
          </div>
          <div className='inputHalf'>
            <input type="text" placeholder='BUSCAR PRODUCTE' className='inputC' />
          </div>
        </div>
      </div>
      <div className='totalWidth'>
        {randomProductes && (
          <div className='sixProductes'>
            {randomProductes.map((randomProductes) => (
              <div key={randomProductes._id} className='producte'>
                <motion.div whileHover={{scale: 1.1}} transition={{layout: {duration: 1, type: "spring"}}} style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                  <img src={randomProductes['img-src']} alt="" height={200} width={200} />
                  <h3>{randomProductes.title}</h3>
                </motion.div>
                
              </div>
            ))}
          </div>
        )}
        {!randomProductes && (
          <div>
            Loading.....
          </div>
        )}
      </div>

    </div>
  )
}

export default RandomProducts
