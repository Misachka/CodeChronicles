const { Profile, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return User.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
  },

  Mutation: {
    addProfile: async (parent, { name , email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(profile);
      return { token, profile };
    },
// not sure about this part? Post is not defiend for some reason
    addPost: async (parent, { profileId, Post }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { posts: post },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
    removePost: async (parent, { profileId, Post }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { $pull: { posts: Post } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
