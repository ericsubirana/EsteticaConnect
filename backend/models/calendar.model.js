const mongoose = require('mongoose');

const calendarSchema = mongoose.Schema({
    clientName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    clientPhoneNumber: {
        type: String,
        required: true,
    },
    day: {
        type: Date,
        required: true,
    },
    startHour: {
        type: String,
        required: true,
    },
    endHour: {
        type: String,
        required: true,
    }
})

const CalendarEvent = mongoose.model('CalendarEvent', calendarSchema);

module.exports = CalendarEvent;