import axios from 'axios';

export const registerReq = user => axios.post('http://localhost:5000/api/register', user);

export const loginReq = user => axios.post('http://localhost:5000/api/login', user);