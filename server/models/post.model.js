const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        postCaption: {
            type: String,
            required: [true, 'Post caption is required.']
        },
        postType: {
            type: String,
            required: [true, 'Type of post is required.']
        },
        postRecommend: {
            type: Boolean
        },
        user_id:
        {
            type: mongoose.Types.ObjectId
        },
        image: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Post', PostSchema)