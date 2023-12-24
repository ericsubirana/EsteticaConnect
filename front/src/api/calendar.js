import axios from  "./axios.js";

export const insertEvent = values => axios.post('/insertEvent', values);

export const getEvents = () => axios.get('/getEvents');

export const getSpecificEvent = (id) => axios.get(`/getSpecificEvent/${id}`);

export const updateEvent = ({id, values}) => axios.post('/updateEvent', {id, values});

export const deleteEvent = (id) => axios.get(`/deleteEvent/${id}`);
