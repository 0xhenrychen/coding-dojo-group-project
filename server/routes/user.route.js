// 5/17 - Henry - All login and registration routes are working (tested them out in Postman).

const userController = require('../controllers/user.controller');

module.exports = (app) => {
    app.get('/api/allusers', userController.findAllUsers);
    app.get('/api/user/:id', userController.findAllUsers);
    app.post('/api/register', userController.registerUser);
    app.post('/api/login', userController.loginUser);
    app.post('/api/logout', userController.logoutUser);
}