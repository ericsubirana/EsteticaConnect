const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, //treu els espais en blanc
    },
    measures: {
        type: String,
        required: false,
        trim: true,
        unique: true,
    },
    category: {
        type: [String],
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    collections: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: true,
    },
    'img-src': {
        type: String,
        required: true,
    }
}, { collection: 'products' });

module.exports = mongoose.model('Product', productSchema);