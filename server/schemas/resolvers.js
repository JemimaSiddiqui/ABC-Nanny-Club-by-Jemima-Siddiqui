const { AuthenticationError } = require('apollo-server-express');
const { User, Babysitter, } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('babysitters');
    },
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('babysitters');
    },
    babysitters: async (parent, { email }) => {
      const params = email ? { email } : {};
      return Babysitter.find(params).sort({ createdAt: -1 });
    },
    babysitter: async (parent, { babysitterId }) => {
      return Babysitter.findOne({ _id: babysitterId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('babysitters').populate('savedBabysitters');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addBabysitter: async (parent, { babysitterAbout, babysitterLoc, babysitterCert, babysitterPic, babysitterPh }, context) => {
      if (context.user) {
        const babysitter = await Babysitter.create({
          babysitterAbout,
          babysitterLoc,
          babysitterCert,
          babysitterPic,
          babysitterPh,
          babysitterAuthor: context.user.firstName,
          babysitterFirst: context.user.firstName,
          babysitterLast: context.user.lastName,
          babysitterEmail: context.user.email,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { babysitters: babysitter._id } }
        );

        return babysitter;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateBabysitter: async (parent, { babysitterId, babysitterAbout, babysitterLoc, babysitterCert, babysitterPic, babysitterPh }, context) => {
			if (context.user) {
				return await Babysitter.findOneAndUpdate(
					{_id: babysitterId},
					{babysitterAbout, babysitterLoc, babysitterCert, babysitterPic, babysitterPh },
					{
						new: true,
					}
				);
			}
			throw new AuthenticationError('Must be logged in!');
		},
    addRating: async (parent, { babysitterId, ratingText }, context) => {
      if (context.user) {
        return Babysitter.findOneAndUpdate(
          { _id: babysitterId },
          {
            $addToSet: {
              ratings: { ratingText, ratingAuthor: context.user.email },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBabysitter: async (parent, { babysitterId }, context) => {
      if (context.user) {
        const babysitter = await Babysitter.findOneAndDelete({
          _id: babysitterId,
          babysitterAuthor: context.user.firstName,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { babysitters: babysitter._id } }
        );

        return babysitter;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeRating: async (parent, { babysitterId, ratingId }, context) => {
      if (context.user) {
        return Babysitter.findOneAndUpdate(
          { _id: babysitterId },
          {
            $pull: {
              ratings: {
                _id: ratingId,
                ratingAuthor: context.user.email,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    saveBabysitter: async (parent, { babysitterId }, context) => {
      if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $push: { savedBabysitters: babysitterId } },
              { new: true, runValidators: true}
          );
          return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeSavedBabysitter: async (parent, { babysitterId }, context) => {
      if (context.user) {
        console.log(babysitterId);
          const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBabysitters: babysitterId } },
              { new: true }
              
          );
          return updatedUser;
          
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
