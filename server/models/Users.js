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
        required: false,
    },
    company: {
        type: String,
    },
    createdDt: {
        type: String,
    },
    investmentCompany: {
        type: [
            {
                companyName: {
                    type: String,
                },
                companyAvatarUrl: {
                    type: String,
                },
                investedValue: {
                    type: Number,
                },
                currentValue: {
                    type: Number,
                },
            },
        ],
        default: [],
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
