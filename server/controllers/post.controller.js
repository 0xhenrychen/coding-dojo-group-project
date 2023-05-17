// 05-15 - Henry - All CRUD functions for a post are working (tested them out in Postman).

const Post = require('../models/post.model')

module.exports = {
    findAllPosts: (req, res) => {
        Post.find()
        .then((allPosts) => {
            res.status(200).json(allPosts)
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    },

    createPost: (req, res) => {
        Post.create(req.body)
        .then((newPost) => {
            res.status(200).json(newPost)
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    },

    findOnePost: (req, res) => {
        Post.findOne({_id: req.params.id})
            .then((onePost) => {
                res.status(200).json(onePost)
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },

    updatePost: (req, res) => {
        Post.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
            .then((updatedPost) => {
                res.json({post: updatedPost})
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },

    deletePost: (req, res) => {
        Post.deleteOne({_id: req.params.id})
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    }
}