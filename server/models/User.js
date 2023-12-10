const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address'], //validate email
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
        },

        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
                
            }
        ],
        
    },

    //set this to use virtual
    {
        toJSON: {
            virtuals: true,
        },
        id: false,

    }
    
);

//hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

//method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
const User = model('User', userSchema);
module.exports = User;