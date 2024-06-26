const express = require('express');
const { randomProducts, findCollections, findCategory, searchProducts, editProduct, deleteProduct, addProduct } = require('../controllers/products.controller.js');


const router = express.Router()

router.get('/randomProducts', randomProducts);

router.post('/collection', findCollections);

router.post('/category', findCategory);

router.post('/searchProducts', searchProducts);

router.post('/editProduct', editProduct);

router.post('/deleteProduct', deleteProduct);

router.post('/addProduct', addProduct);

module.exports = router;