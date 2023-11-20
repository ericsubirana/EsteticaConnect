const express = require('express');
const { randomProducts, findCollections, findCategory, searchProducts } = require('../controllers/products.controller.js');


const router = express.Router()

router.get('/randomProducts', randomProducts);

router.post('/collection', findCollections);

router.post('/category', findCategory);

router.post('/searchProducts', searchProducts);

module.exports = router;