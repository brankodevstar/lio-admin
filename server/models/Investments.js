const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    type: {
        type: Number,
        required: true,
    },
    imgUrl: {
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
        required: true
    },
    closeDay: {
        type: String,
        required: true,
    },
    overview: {
        shortSummary: {
            type: String,
            required: true,
        },
        highlights: {
            type: [String],
            default: []
        },
        investmentDetails: {
            target: {
                type: Number,
                required: true,
            },
            minimum: {
                type: Number,
                required: true,
            },
            investmentRaised: {
                type: Number,
                required: true,
            },
            previousRound: {
                type: Number,
                required: true,
            },
            stage: {
                type: String,
                required: true,
            },
        }
    },
    pitchDetails: {
        type: [{
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        }],
        default: [],
    },
    team: {
        avatarUrl: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        roleName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    documents: {
        type: [{
            documentUrl: {
                type: String,
                required: true,
            },
            documentName: {
                type: String,
                required: true,
            }
        }],
        default: [],
    },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;