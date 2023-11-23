import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import './randomproducts.css'
import axios from 'axios';
import ChooseColAndCat from '../ChooseColAndCat/ChooseColAndCat'
import PopUpProduct from '../displayProduct/PopUpProduct'

function RandomProducts() { //pasem desde ChooseColAndCat si estem fent una busqueda

  const [randomProductes, setRandomProductes] = useState('');
  const [searchResults, setSearchResults] = useState(''); // aquesta varaible s'ompla quan fem búsqueda
  const [selectedResult, setSelectedResult] = useState(null);

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

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const popUp = (result) => {
    setSelectedResult(result);
  }

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
          <ChooseColAndCat onSearchResults={handleSearchResults} />
          <div className='totalWidth'>
            {searchResults ? (
              searchResults === 'NO PRODUCTS FOUND' ? (
                <div>No products found</div>
              ) : (
                <div className='sixProductes'>
                  {searchResults.map((result) => (
                    <div key={result._id} className='producte' onClick={() => popUp(result)}>
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ layout: { duration: 1, type: 'spring' } }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={result['img-src']} alt='' height={200} width={200} />
                        <h3>{result.title}</h3>
                      </motion.div>
                      <PopUpProduct trigger={selectedResult === result} setTrigger={() => popUp(null)}>
                        <h1>Popup content for result: {result.title}</h1>
                      </PopUpProduct>

                    </div>
                  ))}
                </div>
              )
            ) : (
              <div>
                {randomProductes ? (
                  <div className='sixProductes'>
                    {randomProductes.map((randomProduct) => (
                      <div key={randomProduct._id} className='producte'>
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ layout: { duration: 1, type: 'spring' } }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <img src={randomProduct['img-src']} alt='' height={200} width={200} />
                          <h3>{randomProduct.title}</h3>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>Loading.....</div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  )
}

export default RandomProducts
