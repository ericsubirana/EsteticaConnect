const express = require('express');
const { adddProduct, hasProduct } = require('../controllers/cart.controller.js');

const router = express.Router()

router.post('/addProduct', adddProduct);

router.post('/hasProduct', hasProduct);

module.exports = router;