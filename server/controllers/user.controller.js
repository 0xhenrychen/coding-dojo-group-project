const User = require('../models/user.model');
// ! Still need to create this.
const secret = process.env.SECRET_KEY;
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 2 ways to use promises (promises with .then and .catch and with async/await - try and catch. The code is cleaner especially with a lot of it).
module.exports = {
    registerUser: async (req, res) => {
        try{
            // Check if the email that was entered in the registration form is already in the DB.
            const potentialUser = await User.findOne(
                {
                    email: req.body.email
                }
            )
            if(potentialUser){
                res.status(400).json(
                    {
                        message: 'That email already exists. Please login.'
                    }
                )
            }
            else{
                // Create user.
                const newUser = await User.create(req.body);

                // Create a JSON user web token and store encoded, sensitive information (ID and email). .sign is a function to generate a JSON web token string. It takes in the data that you want to encode (into the payload). Can only be decoded in the controller using the .env file (backend).
                const userToken = jsonWebToken.sign(
                    {
                        _id: newUser._id,
                        email: newUser.email
                    },
                    // The only way to decode the token is by applying a secret key, which is stored inside the .env file (never share this anywhere).
                    secret,
                    // The token expires in 2 hours.
                    {
                        expiresIn: '2h'
                    }
                )
                console.log(userToken)
                // Generate a cookie and call is userToken. The value is from above. The token expires in 2 hours or write it as 2*60*60*1000.
                res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 2*60*60*1000}).json(newUser);
            }
        }
        catch(err){
            res.status(400).json(
                {
                    error: err
                }
            )
        }
    },

    // Login user controller.
    loginUser: async (req, res) => {
        try {
            // Check if the user already exists.
            const user = await User.findOne(
                {
                    email: req.body.email
                }
            )
            if(user){
                // Check to see if the password entered matches the password in the DB for that email.
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                if(passwordsMatch){
                    // Generate userToken and log the user in (take the userToken code from above and edit it).
                    const userToken = jsonWebToken.sign(
                        {
                            _id: user._id,
                            email: user.email
                        },
                        // The only way to decode the token is by applying a secret key, which is stored inside the .env file (never share this anywhere).
                        secret,
                        // The token expires in 2 hours.
                        {
                            expiresIn: '2h'
                        }
                    )
                    // Generate a cookie and call is userToken. The value is from above. The token expires in 2 hours or write it as 2*60*60*1000.
                    res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 2*60*60*1000}).json(user);
                }
                // This is if the email does exist but the passwords don't match.
                else{
                    res.status(400).json(
                        {
                            message: 'Invalid email/password.'
                        }
                    )
                }
            }
            // If the user doesn't exist.
            else{
                res.status(400).json(
                    {
                        message: 'Invalid email/password.'
                    }
                )
            }
        }
        catch(err){
            res.status(400).json(
                {
                    error: err
                }
            )
        }
    },

    logoutUser: (req, res) => {
        res.clearCookie('userToken').json(
            {
                message: `You've logged out.`
            }
        )
    }
}