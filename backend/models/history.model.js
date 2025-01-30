const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
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

const HistoryCalendar = mongoose.model('HistoryCalendar', historySchema);

module.exports = HistoryCalendar;