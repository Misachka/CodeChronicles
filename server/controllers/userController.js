//const { ObjectId } = require('mongoose').Types;
const { User, Post } = require('../models');

module.exports = {

    async allUsers(req, res) {
        try {
            const allUsers = await User.find();
            return res.json(allUsers);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async singleUser(req, res) {
        try{
            const singleUser = await User.findOne({ _id: req.params.userId });
            return res.json(singleUser);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //register user logic

    //login user logic

    //update user logic

    //delete user and user's posts logic

}