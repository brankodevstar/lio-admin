const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Float = require('mongoose-float').loadType(mongoose);

const postSchema = new Schema({
    posterFirstName: {
        type: String,
        required: true
    },
    posterLastName: {
        type: String,
        required: true
    },
    posterAvatarUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true
    },
    heartRate: {
        type: Float,
        required: true
    },
    articleNumber: {
        type: Number,
        required: true
    },
    comments: [
        {
            commenterFirstName: {
                type: String,
                required: true
            },
            commenterLastName: {
                type: String,
                required: true
            },
            commenterEmailAddress: {
                type: String,
                required: true
            },
            commenterAvatarUrl: {
                type: String,
                required: true
            },
            commentDescription: {
                type: String,
                required: true
            }
        }
    ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;