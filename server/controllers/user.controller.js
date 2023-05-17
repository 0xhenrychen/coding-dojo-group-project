// 5/17 - Henry - Functions to create a new user, log in, and log out are working (tested them out in Postman).

const User = require('../models/user.model');
// ! Still need to create this.
const secret = process.env.SECRET_KEY;
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    findAllUsers: (req, res) => {
        User.find()
        .then((allUsers) => {
            res.status(200).json(allUsers)
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    },
    
    registerUser: async (req, res) => {
        try{
            const potentialUser = await User.findOne({email: req.body.email})

            if(potentialUser){
                res.status(400).json({message: 'That email already exists. Please log in.'})
            }

            else{
                const newUser = await User.create(req.body)
                const userToken = jsonWebToken.sign(
                    {
                        _id: newUser._id,
                        email: newUser.email
                    },
                    secret,
                    {
                        expiresIn: '2h'
                    }
                )
                console.log(userToken)
                res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 2*60*60*1000}).json(newUser)
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

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({email: req.body.email})

            if(user){
                const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
                
                if(passwordsMatch){
                    const userToken = jsonWebToken.sign(
                        {
                            _id: user._id,
                            email: user.email
                        },
                        secret,
                        {
                            expiresIn: '2h'
                        }
                    )
                    res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge: 2*60*60*1000}).json(user);
                }

                else{
                    res.status(400).json(
                        {
                            message: 'Invalid email/password.'
                        }
                    )
                }
            }

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