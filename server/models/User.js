const { Schema, model } = require('mongoose');

const userSchema = newSchema(
    {
        username: {
            type: String,
            unique: true,
            requires: true,
            trim: true,
        },

        email: {
            trype: String,
            unique: true,
            required: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address'], //validate email
        },

        pasword: {
            type: String,
            required: [true, 'Please enter password'],
            minlength: [8]
        }
    }
)