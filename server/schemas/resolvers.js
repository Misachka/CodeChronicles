const { User, Post } = require("../models"); //models to be able to retrieve and manage databases
const { signToken } = require("../utils/auth"); //auth for users

//Resolvers handle operations deined in typeDefs
const resolvers = {
  Query: {
    getAllUsers: async () => {
      return User.find().populate('posts');; //gets all users and populates the posts field
    },

    getUserById: async (parent, args, context) => {
      return User.findOne({ _id: context.user._id }).populate('posts'); //find user in context (loggedin) by id
    },

    getAllPosts: async () => {
      return Post.find().populate('username'); //gets all posts made and populated usernames
    },

    getPostById: async (parent, { postId }) => {
      return Post.findOne({ _id: postId }).populate('username'); // gets posts by id
    },

    getUserPosts: async (_, __, context) => {
      if (!context.user) {
        throw new Error("User not authenticated");
      }

      try {
        const user = await User.findById(context.user._id); //find user's in context id

        if (!user) {
          throw new Error("User not found");
        }

        // Use .populate() to include user details in the retrieved posts
        return Post.find({ 'username': user._id }).populate('username'); //after auth and user, gets user's post
      } catch (error) {
        console.error(error);
        throw new Error("Error fetching user posts");
      }
    },
  },


  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ //create new user
        username,
        email,
        password
      });
      const token = signToken(user); //token auth for signing up

      return { token, user }; //returns token and user
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }); //find email

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const correctPw = await user.isCorrectPassword(password); //check if passsword is correct

      if (!correctPw) {
        throw new Error("Incorrect password");
      }

      const token = signToken(user); //aunt for user, able to log in
      return { token, user };
    },

    addPost: async (parent, { title, content }, context) => {
      try {

        console.log("Context:", context);
        console.log("User:", context.user);

        const newPost = (await Post.create({ title, content, username: context.user._id })); //created posts, uses context to user id to pupulate username


        const user = await User.findById(context.user._id); //find user in context by id

        if (!user) {
          throw new Error("User not found");
        }

        console.log(user);


        //saves the post in the user posts field
        user.posts.push(newPost._id);
        await user.save();

        return newPost; //returns created post
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

        const post = await Post.findById(id); //finds post y id

        if (!post) {
          throw new Error('Post not found');
        }

        if (post.username.toString() !== context.user._id.toString()) {
          throw new Error('Unauthorized: User is not the owner of the post'); //checks if user in context is the owner of the post
        }

        post.title = title;  //update title
        post.content = content; //update content
        await post.save(); //save post

        return post; //return updated post
      } catch (error) {
        console.error(error);
        throw new Error('Error updating post');
      }
    },


    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId }); //deletes user by id, mostly for data managers, could be used for users to delete their accounts
    },

    removePost: async (parent, { postId }) => {
      const deletedPost = await Post.findByIdAndDelete(postId); //finds and deletes post by id in the post database

      if (!deletedPost) {
        throw new Error("Post not found");
      }

      const user = await User.findById(deletedPost.username); //deletes post from user's database

      if (!user) {
        throw new Error("Internal Server Error");
      }

      user.posts.pull(postId); //pulls out post by id
      await user.save(); //updates user's database

      return deletedPost;
    },
  },
};

module.exports = resolvers;