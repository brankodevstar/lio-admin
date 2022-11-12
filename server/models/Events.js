const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    photos: {
        type: [String],
        default: [],
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
    activeTime: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    locationName: {
        type: String,
        requiired: true
    },
    description: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
