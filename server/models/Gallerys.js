const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
        default: [],
    },
    createdDt: {
        type: String,
        required: false,
    }
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
