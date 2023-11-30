const express = require('express');
const { adddProduct } = require('../controllers/cart.controller.js');

const router = express.Router()

router.post('/addProduct', adddProduct);

module.exports = router;