import axios from "./axios.js";

export const hasProduct = (user, product) => axios.post('/hasProduct', {user, product});