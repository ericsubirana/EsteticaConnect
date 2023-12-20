import axios from './axios.js'

export const registerReq = user => axios.post('/register', user);

export const loginReq = user => axios.post('/login', user);

export const verifyTokenReq = () => axios.get('/auth/verify');

export const logoutReq = () => axios.get('/logout');

export const forgotPassowrd = ({ recipient_email, OTP }) => axios.post('/forgotPassword', {recipient_email, OTP});

export const changePassword = ({password, email}) => axios.post('/changePassword', {password, email});

export const changeImage = file => axios.post('/changeImage', file);

export const getProfile = () => axios.post('/getProfile');

export const updateProfile = ({values, id}) => axios.post('/updateProfile', {values, id});




