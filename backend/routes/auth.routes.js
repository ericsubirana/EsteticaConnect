const express = require('express');
const {login, register, logout, profile, verifyToken} = require('../controllers/auth.controller.js');
const {authRequired} = require('../middlewares/validateToken.js');
const {loginSchema, registerSchema} = require('../schemas/auth.schema.js');
const {validateSchema} = require('../middlewares/validator.middleware.js');
const { randomProducts } = require('../controllers/products.controller.js');

const router = express.Router()

router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.get('/logout', logout);

router.get('/profile', authRequired, profile);

router.get('/auth/verify', verifyToken);

router.get('/randomProducts', randomProducts);


module.exports = router;