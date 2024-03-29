const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
            
            return userData;
            }
      
            throw new AuthenticationError('Not logged in');
          }
        },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
            
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
          },
          addUser: async (parent, args) => {
            console.log(args)
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },
          saveBook: async (parent, { input }, context) =>{
              if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true }
                  );
                    return updatedUser;
                }
          }
    },
  };
  
  module.exports = resolvers;