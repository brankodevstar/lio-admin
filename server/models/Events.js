const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    photos: {
        type: [String],
        default: []
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    createdDt: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;