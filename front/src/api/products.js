import axios from "./axios.js";

export const addProductToCart = (user, product) => axios.post('/addProduct', {user, product});

export const editProduct = (product) => axios.post('/editProduct', {product});

export const deleteProduct = (productId) => axios.post('/deleteProduct', {productId});

