import axios from "./axios.js";

export const hasProduct = (user, product) => axios.post('/hasProduct', {user, product});

export const RemoveProductToCart = (user, product) => axios.post('/removeProduct', {user, product});

export const addProductToCart = (user, product) => axios.post('/addProduct', {user, product});

export const getProducts = user => axios.post('/getProducts', user);
