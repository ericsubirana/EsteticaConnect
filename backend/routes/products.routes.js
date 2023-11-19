const express = require('express');
const { randomProducts, findCollections, findCategory } = require('../controllers/products.controller.js');


const router = express.Router()

router.get('/randomProducts', randomProducts);

router.post('/collection', findCollections);

router.post('/category', findCategory);

module.exports = router;