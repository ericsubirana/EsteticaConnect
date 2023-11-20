import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Collections from '../components/products/collection/CollectionComponent';
import axios from 'axios';

function Collection() {

    const {collection} = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const takeProductsFromCollection = async (collection) => {
            try {
                const response = await axios.post('/api/collection', { collection }); //fer crida a la carpeta api
                const fetchedProducts = response.data;
                setProducts(fetchedProducts);
              } catch (error) {
                console.error('Error fetching products:', error);
              }
        }
        takeProductsFromCollection(collection);
    }, [collection])

    
    return (
        <div>
            <Header page="products"/>
            <Collections products={products} whereWeComeFrom='collection' title={collection}/>
            <Footer/>
        </div>
    )
}

export default Collection