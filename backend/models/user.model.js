const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, //treu els espais en blanc
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    direction: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    surname: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    admin: {
        type: Boolean,
        required: false,
    }
},
    {
        timestamps: true,
})

module.exports = mongoose.model('User', userSchema);