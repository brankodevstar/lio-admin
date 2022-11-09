const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const investmentSchema = new Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    funded: {
        type: Number,
        required: true,
    },
    investors: {
        type: Number,
        required: true,
    },
    roundClose: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    closeDay: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
    overview: {
        shortSummary: {
            type: String,
        },
        highlights: {
            type: [String],
            default: [],
        },
        investmentDetails: {
            target: {
                type: Number,
            },
            minimum: {
                type: Number,
            },
            investmentRaised: {
                type: Number,
            },
            previousRound: {
                type: Number,
            },
            stage: {
                type: String,
            },
        },
    },
    pitchDetails: {
        type: [
            {
                title: {
                    type: String,
                },
                description: {
                    type: String,
                },
            },
        ],
        default: [],
    },
    team: {
        type: [
            {
                avatarUrl: {
                    type: String,
                },
                name: {
                    type: String,
                },
                roleName: {
                    type: String,
                },
                description: {
                    type: String,
                },
            },
        ],
        default: [],
    },
    documents: {
        type: [
            {
                documentUrl: {
                    type: String,
                },
                documentName: {
                    type: String,
                },
            },
        ],
        default: [],
    },
});

const Announcement = mongoose.model("Investment", investmentSchema);

module.exports = Announcement;
