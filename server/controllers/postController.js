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

    async newPost(req, res) {
        try {

            const { title, content, userId } = req.body;
            if (!title || !content || !userId) {
                return res.status(400).json({ message: 'Title, content, and userId are required fields' });
            }


            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Create a new post
            const newPost = await Post.create({
                title,
                content,
                user: userId,
            });

            // Update the user's posts array
            user.posts.push(newPost._id);
            await user.save();

            return res.status(201).json(newPost);

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    //update post logic

    async updatePost(req, res) {
        try {
            const postId = req.params.postId;

            const existingPost = await Post.findById(postId);
            if (!existingPost) {
                return res.status(404).json({ message: 'Post not found' });
            }

            // Could add additional authorization logic by comparing the user ID in the request with the user ID associated with the post
            const userIdInRequest = req.body.userId;
            if (existingPost.user.toString() !== userIdInRequest) {
                return res.status(403).json({ message: 'You do not have permission to update this post' });
            }

            // Update the post
            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                { $set: req.body },
                { new: true }
            );

            return res.json(updatedPost);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    //delete post logic
    async deletePost(req, res) {
        try {
            const postId = req.params.postId;

            const deletedPost = await Post.findById(postId);
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const user = await User.findById(deletedPost.user);
            if (!user) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            user.posts.pull(postId);
            await user.save();

            const result = await Post.findByIdAndDelete(postId);

            return res.json(result);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

};