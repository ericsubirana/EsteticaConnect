const express = require('express');
const { randomProducts, findCollections } = require('../controllers/products.controller.js');


const router = express.Router()

router.get('/randomProducts', randomProducts);

router.post('/collection', findCollections);

module.exports = router;