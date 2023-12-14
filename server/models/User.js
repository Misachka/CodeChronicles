const { Schema, model } = require('mongoose'); //creates database in mongoDB
const bcrypt = require('bcrypt'); //hashes password

//database structure for users
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
                type: Schema.Types.ObjectId, //references post id located in the Post model
                ref: 'Post',
                
            }
        ],
        
    },

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