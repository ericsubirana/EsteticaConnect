import axios from "./axios.js";

export const addProductToCart = (user, product) => axios.post('/addProductCart', {user, product});

export const editProduct = (product) => axios.post('/editProduct', {product});

export const deleteProduct = (productId) => axios.post('/deleteProduct', {productId});

export const addProduct = (product) => axios.post('/addProduct', {product});


