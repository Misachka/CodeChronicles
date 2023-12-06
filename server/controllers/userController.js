const bcrypt = require('bcrypt');
const { User, Post } = require('../models');

module.exports = {

    async allUsers(req, res) {
        try {
            const allUsers = await User.find();
            return res.json(allUsers);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async singleUser(req, res) {
        try {
            const singleUser = await User.findOne({ _id: req.params.userId });
            return res.json(singleUser);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async registerUser(req, res) {
        try {
            const { username, email, password } = req.body;

            // Validation: Ensure required fields are provided
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Please provide all required fields' });
            }

            // Check if the user with the provided email already exists
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: 'Email is already registered' });
            }

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 12); // Increased cost factor for security

            // Create a new user in the database
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });

            await newUser.save();

            return res.status(201).json({ message: 'User registered successfully' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // Validation: Ensure required fields are provided
            if (!email || !password) {
                return res.status(400).json({ message: 'Please provide email and password' });
            }

            // Check if the user with the provided email exists
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Compare the provided password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // User is authenticated, you can generate and send a token, set a session, etc.

            return res.status(200).json({ message: 'Login successful', user: user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async updateUser(req, res) {
        try {
            const userUpdate = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true }
            );
            res.json(userUpdate);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Invalid request' });
        }
    },

    async deleteUser(req, res) {
        try {

            const dltUserPost = await Post.deleteMany(
                { user: req.params.userId }
            );
            res.json(dltUserPost);

            const deleteUser = await User.findByIdAndDelete(
                req.params.userId
            );
            res.json(deleteUser);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
