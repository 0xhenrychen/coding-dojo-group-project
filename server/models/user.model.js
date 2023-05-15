const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required.']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required.']
        },
        email: {
            type: String,
            validate: [isEmail, 'Invalid email.']
        },
        password: {
            type: String,
            required: [ true, 'Email is required.'],
            minLength: [8, 'Password must be at least 8 characters.']
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

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
}
)

module.exports = mongoose.model('User', UserSchema)