const Post = require('../Models/post.model')
const { check, validationResult } = require("express-validator")

exports.addPost = async (req, res) => {
    try {
        let foundPost = await Post.findOne({ 'postName': req.body.title })
        if (foundPost) {
            return res.status(400).json({
                msg: "Post already exists !"
            })
        }
        let post = new Post(req.body)
        await post.save()
        return res.status(200).json({
            post
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            msg: "Error in saving",
            err: err.message
        })
    }
}

exports.getPosts = async (req, res) => {
    try {
        let posts = await Post.find({})
        res.send(posts)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.editPostViews = async (req, res) => {
    let post = await Post.findById(req.params.id)
    if (!post) {
        return res.status(404).json({
            msg: "Post does not exist !"
        })
    }
    try {
        post.views++
        await post.save()
        return res.status(200).json({
            post,
            msg: "Post views edited"
        })
    } catch (err) {
        return res.status(400).json({
            msg: "Error in editing",
            err: err.message
        })
    }
}

exports.deletePost = async (req, res) => {
    let post = await Post.findById(req.params.id)
    if (!post) {
        return res.status(404).json({
            msg: "Post does not exist !"
        })
    }
    try {
        await post.delete()
        return res.status(200).json({
            msg: "Post deleted !"
        })
    } catch(err) {
        return res.status(400).json({
            msg: "Error in deleting !",
            err: err.message
        })
    }
}