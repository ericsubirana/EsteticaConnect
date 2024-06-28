const express = require('express');

const { getCatCol } = require('../controllers/productsCatCol.controller.js');


const router = express.Router()

router.get('/productCatCol', getCatCol);

module.exports = router;