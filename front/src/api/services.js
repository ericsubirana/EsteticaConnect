import axios from "./axios.js";

export const getServices = (category) => axios.post('/serveisCategoria', {category});

export const addService = (service) => axios.post('/addService', {service});

export const updateService = (service) => axios.post('/updateService', {service});

export const removeService = (serviceId) => axios.post('/removeService', {serviceId});

