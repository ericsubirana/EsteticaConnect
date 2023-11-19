import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import './randomproducts.css'
import axios from 'axios';
import ChooseColAndCat from './ChooseColAndCat'

function RandomProducts() {

  const [randomProductes, setRandomProductes] = useState('');


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
        <div className='centerTitleProducts'>
          <div className='titleProductsText'>
            <h1>PRODUCTES</h1>
            <div className='lineProducts'></div>
            <h3>Coneix els productes que oferim</h3>
          </div>
        </div>

      </div>

      <div className='centerProductes'>
        <div className='widthProductes'>
          <ChooseColAndCat />
          <div className='totalWidth'>
            {randomProductes && (
              <div className='sixProductes'>
                {randomProductes.map((randomProductes) => (
                  <div key={randomProductes._id} className='producte'>
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ layout: { duration: 1, type: "spring" } }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
      </div>

    </div>
  )
}

export default RandomProducts
