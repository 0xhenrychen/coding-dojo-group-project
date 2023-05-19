// 5/15 - Henry - Post schema has been created with just 3 basic inputs (postCaption, postType, and an optional postRecommend that I added). Still need to incorporate postImage (uploading an image) and possibly other inputs/fields.

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        postCaption: {
            type: String,
            required: [true, 'Post caption is required.'],
            minLength: [8, 'Post caption must be at least 10 characters.']
        },
        postType: {
            type: String,
            required: [true, 'Type of post is required.']
        },
        postRecommend: {
            type: Boolean
        },
        image: {
            type: String,
        },
        userId: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Post', PostSchema)