const userController = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/register', userController.registerUser);
    app.post('/api/login', userController.loginUser);
    app.post('/api/logout', userController.logoutUser);
    // app.get('/api/one/:id', authorController.findOneAuthor);
    // app.put('/api/edit/:id', authorController.updateAuthor);
    // app.delete('/api/delete/:id', authorController.deleteAuthor);
}