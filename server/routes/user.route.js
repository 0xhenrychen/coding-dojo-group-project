const userController = require('../controllers/user.controller');

module.exports = (app) => {
    app.get('/api/allusers', userController.findAllUsers);
    app.get('/api/user/:user_id', userController.findOneUser);
    app.post('/api/register', userController.registerUser);
    app.post('/api/login', userController.loginUser);
    app.post('/api/logout', userController.logoutUser);
    app.get('/api/loggedInUser', userController.findLoggedInUser);
}