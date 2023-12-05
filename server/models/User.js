const { Schema, model, default: mongoose } = require('mongoose');

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
        },

        blogs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Blog',
                required: true,
            }
        ],
    }
)
export default mongoose.model('User', userSchema);