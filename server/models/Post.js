const { Schema, model } = require('mongoose');

const postSchema = new Schema(
    {

        title: {
            type: String,
            required: true,
        },

        username: {
            type: Schema.Types.ObjectId,
            ref: 'User',  // Reference the 'User' model
            required: true,
          
        },

        content: {
            type: String,
            minlength: 5,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now(),
            get: function (date) {
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const year = date.getFullYear();
              return `${month}/${day}/${year}`;
            },
          },

    },

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },

        id: false,
    }
);

const Post = model('Post', postSchema);
module.exports = Post;