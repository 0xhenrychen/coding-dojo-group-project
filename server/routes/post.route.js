const postController = require('../controllers/post.controller');

module.exports = (app) => {
    app.get('/api/allshows', postController.findAllPosts);
    app.post('/api/newshow', postController.createPost);
    app.get('/api/oneshow/:id', postController.findOnePost);
    app.put('/api/updateshow/:id', postController.updatePost);
    app.delete('/api/deleteshow/:id', postController.deletePost);
}