const Post = require('../models/post.model')
const User = require('../models/user.model')
const jsonWebToken = require('jsonwebtoken')

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

    findAllPostsByLoggedInUser: async (req, res) => {
        try{
            const decodedJwt = jsonWebToken.decode(req.cookies.userToken, {complete: true})
            const user_id = decodedJwt.payload._id
            const postsByLoggedInUser = await Post.find({user_id: user_id})
            res.status(200).json(postsByLoggedInUser)
        }
        catch(err){
            res.status(400).json(err)
        }
    },

    findAllPostsByUserId: (req, res) => {
        Post.find({user_id: req.params.user_id})
            .then((allPostsByUserId) => {
                res.status(200).json(allPostsByUserId)
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },

    createPost: async (req, res) => {
        try{
            const decodedJwt = jsonWebToken.decode(req.cookies.userToken, {complete: true})
            console.log('DECODED JWT ID:', decodedJwt.payload._id);
            const post = {...req.body, user_id: decodedJwt.payload._id}
            console.log('FINALIZED POST:', post)
            const newPost = await Post.create(post);
            res.status(201).json(newPost);
        }
        catch(err){
            res.status(400).json(err)
        }
    },

    findOnePost: (req, res) => {
        Post.findOne({_id: req.params.post_id})
            .then((onePost) => {
                res.status(200).json(onePost)
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },

    updatePost: (req, res) => {
        Post.findOneAndUpdate({_id: req.params.post_id}, req.body, {new: true, runValidators: true})
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