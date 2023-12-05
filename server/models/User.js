const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        email: {
            trype: String,
            unique: true,
            required: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address'], //validate email
        },

        password: {
            type: String,
            required: [true, 'Please enter password'],
            minlength: [8]
        },

        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
                required: true,
            }
        ],
    }
)
const User = model('User', userSchema);
module.exports = User;