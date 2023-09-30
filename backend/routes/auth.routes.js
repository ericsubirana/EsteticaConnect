const express = require('express');
const {login, register} = require('../controllers/auth.controller.js');

const router = express.Router()

router.post('/register', register);

router.post('/login', login);

module.exports = router;