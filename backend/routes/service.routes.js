const express = require('express');
const { getCategory, getCategories, addService, updateService, removeService } = require('../controllers/services.controller.js');


const router = express.Router()

router.post('/serveisCategoria', getCategory);
router.get('/allServeiCategories', getCategories);
router.post('/addService', addService);
router.post('/updateService', updateService);
router.get('/removeService', removeService);

module.exports = router;