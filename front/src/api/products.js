import axios from "./axios.js";

export const addProductToCart = (user, product) => axios.post('/addProduct', {user, product});