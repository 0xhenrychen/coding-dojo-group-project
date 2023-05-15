const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

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
        postImage: {
            type: String,
            validate: [isEmail, 'Invalid email.']
        }
    },
    {
        timestamps: true
    }
)

// Middleware. Temporarily adds a field, i.e. confirm password, to the schema when the user is registering (not stored in the database).
UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set((value) => this.confirmPassword = value)

    // Pre function runs before data is saved to the database.
UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', `Passwords don't match.`)
    }
    // If the previous if statement is true, then run the "next" function, which is usually entering the data into the database.
    next();
}
)

// PostSchema.pre('save', function(next){
//     bcrypt.hash(this.password, 10)
//         .then(hash => {
//             this.password = hash;
//             next();
//         });
// }
// )

module.exports = mongoose.model('Post', PostSchema)