const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  clickCount: {
    type: Number,
    required: true,
  },
  commentCount: {
    type: Number,
    required: true,
  },
  createdDt: {
    type: String,
    required: true,
  },
});

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
