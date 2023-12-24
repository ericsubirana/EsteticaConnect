const express = require('express');
const { insertEvent, takeEvents, takeSpecificEvent, updateEvent, deleteEvent } = require('../controllers/calendar.controller');

const router = express.Router()

router.post('/insertEvent', insertEvent);

router.get('/getEvents', takeEvents);

router.get('/getSpecificEvent/:id', takeSpecificEvent);

router.post('/updateEvent', updateEvent);

router.get('/deleteEvent/:id', deleteEvent)


module.exports = router;