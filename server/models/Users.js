const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  createdDt: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
