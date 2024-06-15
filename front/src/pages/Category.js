import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Categories from '../components/products/collectionAndCategory/CaCoComponent';
import axios from '../api/axios';

function Category() {

    const {category} = useParams();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const takeProductsFromCollection = async (category) => {
            try {
                const response = await axios.post('/category', { category }); //fer crida a la carpeta api
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
            <Categories products={products} whereWeComeFrom='category' title={category}/>
            <Footer/>
        </div>
    )
}

export default Category

