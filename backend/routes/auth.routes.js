const express = require('express');
const {login, register, logout, profile} = require('../controllers/auth.controller.js');
const {authRequired} = require('../middlewares/validateToken.js');

const router = express.Router()

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.get('/profile', authRequired, profile);

module.exports = router;