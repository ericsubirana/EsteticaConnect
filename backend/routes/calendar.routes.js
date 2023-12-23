const express = require('express');
const { insertEvent, takeEvents, takeSpecificEvent } = require('../controllers/calendar.controller');

const router = express.Router()

router.post('/insertEvent', insertEvent);

router.get('/getEvents', takeEvents);

router.get('/getSpecificEvent/:id', takeSpecificEvent);


module.exports = router;