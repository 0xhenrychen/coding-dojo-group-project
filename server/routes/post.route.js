const postController = require('../controllers/post.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/allposts', postController.findAllPosts);
    app.get('/api/myposts', authenticate, postController.findAllPostsByLoggedInUser);
    app.get('/api/postsbyuserid/:user_id', postController.findAllPostsByUserId);
    app.post('/api/newpost', authenticate, postController.createPost);
    app.get('/api/onepost/:post_id', postController.findOnePost);
    app.put('/api/updatepost/:post_id', postController.updatePost);
    app.delete('/api/deletepost/:id', postController.deletePost);
}