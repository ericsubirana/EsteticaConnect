import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import './randomproducts.css'
import axios from '../../../api/axios';
import ChooseColAndCat from '../ChooseColAndCat/ChooseColAndCat'
import PopUpProduct from '../displayProduct/PopUpProduct'
import ProductToolBar from '../productToolBar/ProductToolBar'

function RandomProducts() { //pasem desde ChooseColAndCat si estem fent una busqueda

  const [randomProductes, setRandomProductes] = useState('');
  const [searchResults, setSearchResults] = useState(''); // aquesta varaible s'ompla quan fem búsqueda
  const [selectedResult, setSelectedResult] = useState(null);
  const [operationResult, setOperationResult] = useState(null);

  useEffect(() => {
    const takeRandomProducts = async () => {
      const response = await axios.get('/randomProducts'); //aqui al server va /api/randomProducts
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
    if (selectedResult !== result) {
      setSelectedResult(result);
      setOperationResult(null);
    }
  }

  const popUpAddProduct = (e) => {
    console.log(e)
  }

  const triggerPopUpEditRemove = (action, product) => {
    if (selectedResult !== product) {
      setSelectedResult(product.idProducte);
      setOperationResult(action);
    }
  } 

  return (
    <div>
      <div className='titleProducts'>
        <div className='centerTitleProducts'>
          <div className='titleProductsText'>
            <h1>PRODUCTOS</h1>
            <div className='lineProducts'></div>
            <h3>Conoce los productos que ofrecemos</h3>
          </div>
        </div>

      </div>

      <div className='centerProductes'>
        <div className='widthProductes'>
          <ChooseColAndCat onSearchResults={handleSearchResults} onAddProduct={popUpAddProduct} />
          <div className='totalWidth'>
            {searchResults ? (
              searchResults === 'NO PRODUCTS FOUND' ? (
                <div className='no-products-text'>No se encontró ningún producto</div>
              ) : (
                <div className='sixProductes'>
                  {searchResults.map((result) => (
                    <div key={result._id} className='producte' onClick={() => popUp(result)}>
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ layout: { duration: 1, type: 'spring' } }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={result['img-src']} alt='' height={200} width={200} />
                        <h3>{result.title}</h3>
                      </motion.div>
                      <PopUpProduct trigger={selectedResult === result} result={result} setTrigger={() => setSelectedResult(null)} />
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
                        <div onClick={() => popUp(randomProduct)}>
                          <motion.div whileHover={{ scale: 1.1 }} transition={{ layout: { duration: 1, type: 'spring' } }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <img src={randomProduct['img-src']} alt='' height={200} width={200} />
                            <h3>{randomProduct.title}</h3>
                          </motion.div>
                          <PopUpProduct trigger={selectedResult === randomProduct} operationResult={operationResult} result={randomProduct} setTrigger={() => setSelectedResult(null)} />
                        </div>
                        {/*basicament quan clickem alguna opcio de la toolbar posem un selectedresult i afegim quina opracio volem i fem que el popup product de dalt es cridi */}
                        <ProductToolBar triggerPopUp={triggerPopUpEditRemove} idProducte={randomProduct} /> 
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
