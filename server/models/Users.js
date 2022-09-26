const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    cityName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;