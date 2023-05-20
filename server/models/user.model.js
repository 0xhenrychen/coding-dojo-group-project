// 5/17 - Henry - User schema has been created with basic fields (first name, last name, email, and password). Confirmed everything is working with the user controller and route files.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const UserSchema = new mongoose.Schema(
    {
        // firstName: {
        //     type: String,
        //     required: [true, 'First name is required.']
        // },
        firstName: {
            type: String,
            required: [true, 'First name is required.']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required.']
        },
        username: {
            type: String,
            required: [true, 'Username is required.']
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            validate: [isEmail, 'Invalid email.']
        },
        password: {
            type: String,
            required: [ true, 'Email is required.'],
            minLength: [8, 'Password must be at least 8 characters.']
        },
        image: {
            type: String
        },
        posts: {
            type: Array
        }
    },
    {
        timestamps: true
    })

UserSchema.virtual('confirmPassword')
    .get(() => this.confirmPassword)
    .set((value) => this.confirmPassword = value)

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', `Passwords don't match.`)
    }
    next();
})

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
})

module.exports = mongoose.model('User', UserSchema)