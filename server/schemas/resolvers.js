const { User, Post } = require("../models");
const { signToken } = require("../utils/auth");


const resolvers = {
  Query: {
    getAllUsers: async () => {
      return User.find().populate('posts');;
    },

    getUserById: async (parent, args, context) => {
      return User.findOne({ _id: context.user._id }).populate('posts');;
    },

    getAllPosts: async () => {
      return Post.find().populate('username');
    },

    getPostById: async (parent, { postId }) => {
      return Post.findOne({ _id: postId }).populate('username');
    },

    getUserPosts: async (_, __, context) => {
      if (!context.user) {
        throw new Error("User not authenticated");
      }

      try {
        
        const user = await User.findById(context.user._id);

        if (!user) {
          throw new Error("User not found");
        }

        return Post.find({ 'username._id': user._id });
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching user posts");
      }
    },
  },


  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // Hash the password before saving it to the database
      // Increased cost factor for security
      const user = await User.create({
      username,
      email,
      password
    });
const token = signToken(user);

return { token, user };
    },

login: async (parent, { email, password }) => {
  const user = await User.findOne({ email });
  // console.log(user);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const correctPw = await user.isCorrectPassword(password);

  if (!correctPw) {
    throw new Error("Incorrect password");
  }

  const token = signToken(user);
  return { token, user };
},

  addPost: async (parent, { title, content }, context) => {
    try {

      console.log("Context:", context);
      console.log("User:", context.user);

      const newPost = (await Post.create({ title, content, username: context.user._id }));


      const user = await User.findById(context.user._id);

      if (!user) {
        throw new Error("User not found");
      }

      console.log(user);



      user.posts.push(newPost._id);
      await user.save();

      return newPost;
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  },

  updatePost: async (_, { id, title, content }, context) => {
    try {
  
      if (!context.user) {
        throw new Error('User not authenticated');
      }

      const post = await Post.findById(id);

      if (!post) {
        throw new Error('Post not found');
      }

      if (post.username !== context.user._id.toString()) {
        throw new Error('Unauthorized: User is not the owner of the post');
      }

      post.title = title;
      post.content = content;
      await post.save();

      return post;
    } catch (error) {
      console.error(error);
      throw new Error('Error updating post');
    }
  },


    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

      removePost: async (parent, { postId }) => {
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
          throw new Error("Post not found");
        }

        const user = await User.findById(deletedPost.user);

        if (!user) {
          throw new Error("Internal Server Error");
        }

        user.posts.pull(postId);
        await user.save();

        return deletedPost;
      },
  },
};

module.exports = resolvers;