import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Collections from '../components/products/collection/CollectionComponent';
import axios from 'axios';

function Category() {

    const {category} = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const takeProductsFromCollection = async (category) => {
            try {
                const response = await axios.post('/api/category', { category }); //fer crida a la carpeta api
                const fetchedProducts = response.data;
                setProducts(fetchedProducts);
              } catch (error) {
                console.error('Error fetching products:', error);
              }
        }
        takeProductsFromCollection(category);
    }, [category])

    
    return (
        <div>
            <Header page="products"/>
            <Collections products={products} whereWeComeFrom='category' title={category}/>
            <Footer/>
        </div>
    )
}

export default Category

