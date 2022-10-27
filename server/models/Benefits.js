const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Float = require("mongoose-float").loadType(mongoose);

const benefitSchema = new Schema({
    imgUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    discountText: {
        type: String,
        required: false,
    },
    locationName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    distance: {
        type: Float,
        required: false,
    },
    rating: {
        type: Float,
        required: false,
    },
    createdDt: {
        type: String,
        required: false,
    },
});

const Benefit = mongoose.model("Benefit", benefitSchema);

module.exports = Benefit;
