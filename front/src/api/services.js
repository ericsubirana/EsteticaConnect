import axios from "./axios.js";

export const getServices = (category) => axios.post('/serveisCategoria', {category});