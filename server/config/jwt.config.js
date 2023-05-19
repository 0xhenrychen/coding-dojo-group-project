const jsonWebToken = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports.authenticate = (req, res, next) => {
    // console.log('**********', req.headers);
    // ! req.cookies.userToken

    jsonWebToken.verify(req.cookies.userToken, SECRET, (err, payload) => {
        console.log(req.cookies);
        if(err) {
            res.status(401).json({verified: false})
        }
        else {
            console.log('Authenticated')
            // req.user = payload._id
            console.log('PAYLOAD:', payload);
            next()
        }
    })
}