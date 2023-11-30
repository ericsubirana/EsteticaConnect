const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        trim: true, 
    },
    products: [{
        product: {
            title: {
                type: String,
                required: true,
                trim: true, //treu els espais en blanc
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
            img: {
                type: String,
                required: true,
            }
        },
    }],
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Cart', cartSchema);
