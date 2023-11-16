const express = require('express');
const { randomProducts } = require('../controllers/products.controller.js');


const router = express.Router()

router.get('/randomProducts', randomProducts);

module.exports = router;