const express = require('express');
const { getCategory } = require('../controllers/services.controller.js');


const router = express.Router()

router.post('/serveisCategoria', getCategory);

module.exports = router;