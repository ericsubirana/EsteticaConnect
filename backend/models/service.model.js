const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: false,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Serveis', serviceSchema);