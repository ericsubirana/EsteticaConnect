import axios from './axios.js'

export const registerReq = user => axios.post('/register', user);

export const loginReq = user => axios.post('/login', user);

export const verifyTokenReq = () => axios.get('/auth/verify');

export const logoutReq = () => axios.get('/logout');