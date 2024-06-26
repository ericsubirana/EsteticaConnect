const express = require('express');
const { adddProduct, hasProduct, removeProduct, getProducts } = require('../controllers/cart.controller.js');

const router = express.Router()

router.post('/addProductCart', adddProduct);

router.post('/hasProduct', hasProduct);

router.post('/removeProduct', removeProduct);

router.post('/getProducts', getProducts);


module.exports = router;