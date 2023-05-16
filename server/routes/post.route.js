// 05-15 - Henry - All routes are working (tested them out in Postman).
// 05-15 - Henry - Adding a test comment to test out the git features for a group project.

const postController = require('../controllers/post.controller');

module.exports = (app) => {
    app.get('/api/allposts', postController.findAllPosts);
    app.post('/api/newpost', postController.createPost);
    app.get('/api/onepost/:id', postController.findOnePost);
    app.put('/api/updatepost/:id', postController.updatePost);
    app.delete('/api/deletepost/:id', postController.deletePost);
}