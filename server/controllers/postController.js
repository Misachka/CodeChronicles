const { User, Post } = require('../models');

module.exports = {
    async allPosts(req, res) {
        try {
            const allPosts = await Post.find();
            res.json(allPosts);

        } catch (err) {
            res.status(500).json(err);
        }
    }, 

    async singlePost(req, res) {
        try {
            const singlePost = await Post.findOne({ _id: req.params.postId });
            return res.json(singlePost);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create post logic

    //update post logic

    //delete post logic
}