import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'

import './collections.css';
import pink from '../../../assets/collectionBack.jpg'
import red from '../../../assets/collectionBackRed.png'
import blue from '../../../assets/collectionBackBlue.png'
import brown from '../../../assets/collectionBackBrown.png'
import green from '../../../assets/collectionBackGreen.png'
import grey from '../../../assets/collectionBackGrey.png'
import orange from '../../../assets/collectionBackOrange.jpg'
import purple from '../../../assets/collectionBackPurple.png'

import ChooseColAndCat from '../ChooseColAndCat/ChooseColAndCat';

function CollectionComponent(props) {

    const { products, whereWeComeFrom, title } = props;
    const [backgroundImage, setBackgroundImage] = useState(`url(${pink})`);
    const [searchResults, setSearchResults] = useState(''); // aquesta varaible s'ompla quan fem búsqueda

    useEffect(() => {
        const changeBackground = () => {

            var currentCollection = null;

            if (whereWeComeFrom === 'collection')
                currentCollection = products.length > 0 ? products[0].collection.toLowerCase() : null;

            let background;

            switch (currentCollection) {
                case 'antioxidant':
                    background = red;
                    break;
                case 'hydra lifting':
                    background = blue;
                    break;
                case 'urban project':
                case 'age defense':
                    background = brown;
                    break;
                case 'pure oxygen':
                    background = green;
                    break;
                case 'shine stop':
                case 'rgnerin':
                    background = grey;
                    break;
                case 'sensations':
                case 'q10 rescue':
                    background = orange;
                    break;
                case 'infinity':
                    background = purple;
                    break;
                default:
                    background = pink;
            }

            setBackgroundImage(`url(${background})`);
        }

        changeBackground();
    }, [products])

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <div className='collectionComponent'>
            <div className='imgCollection' style={{ backgroundImage }} />
            {!products ? (
                <div>
                    {searchResults ? (
                        searchResults === 'NO PRODUCTS FOUND' ? (
                            <div>No products found</div>
                        ) : (
                            <div className='sixProductes'>
                                {searchResults.map((result) => (
                                    <div key={result._id} className='producte'>
                                        <motion.div whileHover={{ scale: 1.1 }} transition={{ layout: { duration: 1, type: 'spring' } }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={result['img-src']} alt='' height={200} width={200} />
                                            <h3>{result.title}</h3>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className='collectionProductWrap'>
                            ....Loading
                        </div>
                    )}
                </div>
            ) : (
                <div className='witdhOfCollction'>
                    {products.length > 0 ? (
                        <div className='titleAndCollection'>
                            <div>
                                {whereWeComeFrom === 'collection' && (
                                    <h1>{title.toUpperCase()}</h1>
                                )}
                                {whereWeComeFrom === 'category' && (
                                    <h1>{title.toUpperCase()}</h1>
                                )}
                            </div>
                            <ChooseColAndCat onSearchResults={handleSearchResults} />
                            {searchResults ? (
                                searchResults === 'NO PRODUCTS FOUND' ? (
                                    <div>No products found</div>
                                ) : (
                                    <div className='sixProductes'>
                                        {searchResults.map((result) => (
                                            <div key={result._id} className='producte'>
                                                <motion.div whileHover={{ scale: 1.1 }} transition={{ layout: { duration: 1, type: 'spring' } }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    <img src={result['img-src']} alt='' height={200} width={200} />
                                                    <h3>{result.title}</h3>
                                                </motion.div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                <div className='collectionProductWrap'>
                                    {products.map((product, index) => (
                                        <motion.div className='collectionProduct' key={index} whileHover={{ scale: 1.1 }} transition={{ layout: { duration: 1, type: "spring" } }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={product['img-src']} alt="" height={280} width={280} />
                                            <h3>{product.title}</h3>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            No products in this collection.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CollectionComponent;
