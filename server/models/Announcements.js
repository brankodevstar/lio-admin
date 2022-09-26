const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose, 3);
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    imgUr: {
        type: String,
        required: true
    },
    heartRate: {
        type: Float,
        required: true
    },
    articleCount: {
        type: Number,
        required: true
    }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;